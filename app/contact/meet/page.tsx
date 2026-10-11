import type { Metadata } from "next";
import BookingWidget from "@/components/booking/BookingWidget";
import Station from "@/components/lines/Station";

export const metadata: Metadata = {
  title: "Book a meeting – Tealis",
  description: "Pick a time for a free 30-minute discovery call on Microsoft Teams.",
};

export default function MeetPage() {
  return (
    <div className="flex flex-col flex-1 pt-14 md:pt-[69px] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <Station
          first
          last
          as="h1"
          title="Pick a time that works for you"
          intro="Choose a day and a time below. You'll receive a confirmation e-mail with the Microsoft Teams link."
          className="band [--band:var(--bg-tint-1)]"
        >
          <BookingWidget />
        </Station>
      </div>
    </div>
  );
}
