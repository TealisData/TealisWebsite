import { BookingError, createBooking } from "@/lib/msBookings";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort throttle per server instance: a few bookings per visitor per hour
const recent = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.set(ip, [...hits, now]);
  return hits.length >= 3;
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });

  // Honeypot: bots fill the hidden field; pretend success
  if (body.website) return Response.json({ ok: true });

  const name = text(body.name, 100);
  const email = text(body.email, 200);
  const start = text(body.start, 40);
  if (!name || !EMAIL.test(email) || Number.isNaN(Date.parse(start))) {
    return Response.json({ error: "Please fill in your name, a valid email and a time" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (throttled(ip)) return Response.json({ error: "Too many requests, please try again later" }, { status: 429 });

  try {
    const booking = await createBooking({
      start,
      name,
      email,
      company: text(body.company, 150),
      message: text(body.message, 2000),
      timeZone: text(body.timeZone, 60) || undefined,
    });
    return Response.json({ ok: true, start: booking.start, end: booking.end });
  } catch (err) {
    if (err instanceof BookingError && err.status === 409) {
      return Response.json({ error: err.message }, { status: 409 });
    }
    console.error("[booking] create:", err);
    return Response.json({ error: "We couldn't complete the booking" }, { status: 502 });
  }
}
