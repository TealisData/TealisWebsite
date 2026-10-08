import type { NextConfig } from "next";
import { BOOKING_URL } from "./lib/booking";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old training page, removed in favour of /training
      { source: "/learning", destination: "/training", permanent: true },
      // Booking moved from an embedded Cal.com page to Microsoft Bookings (cannot be embedded)
      { source: "/contact/meet", destination: BOOKING_URL, permanent: false },
    ];
  },
};

export default nextConfig;
