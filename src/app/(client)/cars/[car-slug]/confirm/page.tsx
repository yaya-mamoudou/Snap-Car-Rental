import React from "react";
import ReservationSteps from "~/components/ui/reservation-steps";

export default function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps step={3} />
      <div className="flex-1 bg-black/5 py-20">
        <div className="container">
          <h1 className="mb-10 text-2xl font-semibold">Confirm Booking</h1>

          <div></div>
        </div>
      </div>
    </div>
  );
}
