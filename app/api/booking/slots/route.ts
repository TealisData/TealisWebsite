import { getSlots } from "@/lib/msBookings";

// Free discovery-call start times, read live from Microsoft Bookings
export async function GET() {
  try {
    return Response.json(await getSlots(), { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[booking] slots:", err);
    return Response.json({ error: "Availability is temporarily unavailable" }, { status: 502 });
  }
}
