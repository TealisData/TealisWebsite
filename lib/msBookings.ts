// Server-only helpers for the in-site booking page, backed by Microsoft Bookings via Microsoft Graph.
// Credentials come from an Entra app registration (application permissions Bookings.Read.All +
// Bookings.ReadWrite.All). Rules (hours, lead time, booking window, staff) stay managed in Bookings.

const BUSINESS_ID = "Tealisdatabookingpage@tealisdata.com";
// The service hours set in Bookings are expressed in this time zone
export const BUSINESS_TZ = "Europe/Tallinn";
const SERVICE_NAME = "Discovery call";
const GRAPH = `https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/${encodeURIComponent(BUSINESS_ID)}`;
const DAY_MS = 86_400_000;
const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

type TimeSlot = { startTime: string; endTime: string };
type BookingService = {
  id: string;
  displayName: string;
  defaultDuration: string;
  staffMemberIds: string[];
  schedulingPolicy: {
    timeSlotInterval: string;
    minimumLeadTime: string;
    maximumAdvance: string;
    generalAvailability?: { availabilityType: string; businessHours: { day: string; timeSlots: TimeSlot[] }[] };
  } | null;
};

export class BookingError extends Error {
  constructor(message: string, readonly status = 500) {
    super(message);
  }
}

// ── Graph access ────────────────────────────────────────────────────────────

let token: { value: string; expires: number } | null = null;

async function getToken() {
  if (token && token.expires > Date.now() + 60_000) return token.value;
  // Trim: values pasted into a dashboard often carry a stray space or newline
  const [MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET] = ["MS_TENANT_ID", "MS_CLIENT_ID", "MS_CLIENT_SECRET"].map((k) => process.env[k]?.trim());
  if (!MS_TENANT_ID || !MS_CLIENT_ID || !MS_CLIENT_SECRET) throw new BookingError("Booking is not configured");
  const res = await fetch(`https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    body: new URLSearchParams({
      client_id: MS_CLIENT_ID,
      client_secret: MS_CLIENT_SECRET,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    // Keep only Microsoft's error code (e.g. AADSTS7000215 = invalid secret), never the request
    const detail = await res.json().catch(() => ({}));
    const code = /AADSTS\d+/.exec(detail.error_description ?? "")?.[0] ?? detail.error ?? "";
    throw new BookingError(`Token request failed (${res.status} ${code})`);
  }
  const data = await res.json();
  token = { value: data.access_token, expires: Date.now() + data.expires_in * 1000 };
  return token.value;
}

async function graph<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`${GRAPH}${path}`, {
    method: init?.method ?? "GET",
    headers: { Authorization: `Bearer ${await getToken()}`, "Content-Type": "application/json" },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new BookingError(`Graph ${path} failed (${res.status}): ${detail.slice(0, 300)}`);
  }
  return res.json();
}

// The service changes rarely: cache it briefly so each visit costs one availability call
let serviceCache: { value: BookingService; expires: number } | null = null;

async function getService() {
  if (serviceCache && serviceCache.expires > Date.now()) return serviceCache.value;
  const { value } = await graph<{ value: BookingService[] }>("/services");
  const service = value.find((s) => s.displayName === SERVICE_NAME) ?? value[0];
  if (!service) throw new BookingError("No booking service found");
  serviceCache = { value: service, expires: Date.now() + 5 * 60_000 };
  return service;
}

// ── Time helpers ────────────────────────────────────────────────────────────

/** ISO 8601 duration (PT30M, PT6H, P60D, P1DT2H) → milliseconds */
function durationMs(iso: string) {
  const m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(iso);
  if (!m) return 0;
  const [, d, h, min, s] = m;
  return ((Number(d ?? 0) * 24 + Number(h ?? 0)) * 60 + Number(min ?? 0)) * 60_000 + Number(s ?? 0) * 1000;
}

/** Offset of a time zone from UTC at a given instant, in ms */
function tzOffset(at: number, tz: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(at).map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(at / 1000) * 1000;
}

/** Wall-clock time in a time zone → UTC instant (ms) */
function zonedToUtc(y: number, mo: number, d: number, time: string, tz: string) {
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo, d, h, mi);
  const first = guess - tzOffset(guess, tz);
  return guess - tzOffset(first, tz);
}

/** Calendar date (y, m, d) of an instant in a time zone */
function zonedDate(at: number, tz: string) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(at).split("-").map(Number);
  return { y, m: m - 1, d };
}

// ── Public API ──────────────────────────────────────────────────────────────

export type Slots = { slots: string[]; durationMinutes: number; serviceName: string };

/** Free start times (UTC ISO) for the discovery call, following the rules set in Bookings */
export async function getSlots(): Promise<Slots> {
  const service = await getService();
  const policy = service.schedulingPolicy;
  const duration = durationMs(service.defaultDuration) || 30 * 60_000;
  const step = durationMs(policy?.timeSlotInterval ?? "") || duration;
  const now = Date.now();
  const earliest = now + durationMs(policy?.minimumLeadTime ?? "PT6H");
  const latest = now + Math.min(durationMs(policy?.maximumAdvance ?? "P60D") || 60 * DAY_MS, 90 * DAY_MS);
  const hours = policy?.generalAvailability?.availabilityType === "customWeeklyHours"
    ? policy.generalAvailability.businessHours
    : null;

  // Free time per staff member (business hours + Outlook calendars + existing bookings)
  const fmt = (t: number) => ({ dateTime: new Date(t).toISOString().slice(0, 19), timeZone: "UTC" });
  const { value } = await graph<{
    value: { staffId: string; availabilityItems: { status: string; startDateTime: { dateTime: string }; endDateTime: { dateTime: string } }[] }[];
  }>("/getStaffAvailability", {
    method: "POST",
    body: { staffIds: service.staffMemberIds, startDateTime: fmt(earliest), endDateTime: fmt(latest + duration) },
  });
  const free = value.map((staff) =>
    staff.availabilityItems
      .filter((i) => i.status === "available")
      .map((i) => [Date.parse(i.startDateTime.dateTime + "Z"), Date.parse(i.endDateTime.dateTime + "Z")] as const),
  );
  const isFree = (s: number, e: number) => free.some((ranges) => ranges.some(([a, b]) => a <= s && e <= b));

  const slots: string[] = [];
  const first = zonedDate(earliest, BUSINESS_TZ);
  const days = Math.ceil((latest - earliest) / DAY_MS) + 1;
  for (let i = 0; i <= days; i++) {
    // Walk calendar days (not 24h steps) so DST changes never skip a date
    const date = new Date(Date.UTC(first.y, first.m, first.d + i));
    const [y, m, d] = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
    const weekday = WEEKDAYS[date.getUTCDay()];
    // Without custom service hours, staff availability alone defines the day
    const ranges = hours
      ? hours.find((h) => h.day === weekday)?.timeSlots ?? []
      : [{ startTime: "00:00", endTime: "24:00" }];
    for (const r of ranges) {
      const start = zonedToUtc(y, m, d, r.startTime, BUSINESS_TZ);
      const end = r.endTime.startsWith("24") ? zonedToUtc(y, m, d + 1, "00:00", BUSINESS_TZ) : zonedToUtc(y, m, d, r.endTime, BUSINESS_TZ);
      for (let t = start; t + duration <= end; t += step) {
        if (t >= earliest && t <= latest && isFree(t, t + duration)) slots.push(new Date(t).toISOString());
      }
    }
  }
  return { slots: [...new Set(slots)].sort(), durationMinutes: duration / 60_000, serviceName: service.displayName };
}

export type BookingRequest = { start: string; name: string; email: string; company?: string; message?: string; timeZone?: string };

/** Creates the appointment in Bookings, which sends the confirmation e-mails with the Teams link */
export async function createBooking(req: BookingRequest) {
  const { slots, durationMinutes } = await getSlots();
  const start = new Date(req.start).toISOString();
  if (!slots.includes(start)) throw new BookingError("This time is no longer available", 409);

  const service = await getService();
  const end = new Date(Date.parse(start) + durationMinutes * 60_000).toISOString();
  const notes = [req.company && `Company: ${req.company}`, req.message].filter(Boolean).join("\n\n");
  const utc = (iso: string) => ({ dateTime: iso.slice(0, 19), timeZone: "UTC" });

  const appointment = await graph<{ id: string; joinWebUrl?: string }>("/appointments", {
    method: "POST",
    body: {
      serviceId: service.id,
      serviceName: service.displayName,
      staffMemberIds: service.staffMemberIds.slice(0, 1),
      startDateTime: utc(start),
      endDateTime: utc(end),
      isLocationOnline: true,
      optOutOfCustomerEmail: false,
      maximumAttendeesCount: 1,
      filledAttendeesCount: 1,
      customerTimeZone: req.timeZone,
      customers: [
        {
          "@odata.type": "#microsoft.graph.bookingCustomerInformation",
          name: req.name,
          emailAddress: req.email,
          notes,
          timeZone: req.timeZone,
        },
      ],
    },
  });
  return { id: appointment.id, start, end };
}
