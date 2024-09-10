import { cn, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { BookCheck, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Input from "~/components/common/input";
import { bookings } from "~/data/mock";
import { BookingStatus } from "~/types";

export default function BookingPage() {
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Booking</h1>

      <div className="mt-4 rounded-lg bg-white py-4">
        <div className="px-4">
          <div className="flex justify-between">
            <Input
              placeholder="Search Booking"
              className="max-w-[300px]"
              endContent={<Search />}
            />
          </div>
          <Divider className="mb-3 mt-3 bg-gray-200" />
        </div>
        <div className="odd:*:bg-gray-50">
          {bookings.map((booking) => (
            <div
              key={booking.car}
              className="mt-4 flex gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <div className="flex size-[40px] items-center justify-center rounded-full bg-gray-300 p-2 text-white">
                <BookCheck size={20} strokeWidth={2} />
              </div>
              <div className="w-full">
                <Link
                  href={`/dashboard/booking/${booking.car}`}
                  className="w-full hover:underline"
                >
                  {booking.car} -{" "}
                  <span className="font-medium">({booking.user})</span>
                </Link>
                <div className="text-sm text-black/50">
                  {format(booking.startDate, "dd MMM yyyy")} -{" "}
                  {format(booking.endDate, "dd MMM yyyy")}
                </div>
                <div
                  className={cn(
                    [
                      BookingStatus.PAID,
                      BookingStatus.PAID_AND_ONGOING,
                    ].includes(booking.status) && "text-sm text-green-400",
                    booking.status === BookingStatus.PENDIND_PAYMENT &&
                      "text-yellow-400",
                    booking.status === BookingStatus.EXPIRED && "text-red-500",
                  )}
                >
                  Status: {booking.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
