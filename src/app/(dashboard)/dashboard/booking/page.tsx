"use client";
import { cn, Divider, Spinner } from "@nextui-org/react";
import { BookingStatus } from "@prisma/client";
import { format } from "date-fns";
import { BookCheck, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Input from "~/components/common/input";
import { api } from "~/trpc/react";

export default function BookingPage() {
  const { data, isPending, error } = api.booking.getAll.useQuery({
    per_page: 2,
  });

  useEffect(() => {
    error?.message && toast.error(error?.message!);
  }, [error?.message]);

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
        {isPending && (
          <div className="flex w-full items-center justify-center gap-x-2">
            <Spinner size="sm" /> Loading Cars
          </div>
        )}
        <div className="odd:*:bg-gray-50">
          {data?.data.map((booking) => (
            <div
              key={booking.id}
              className="mt-4 flex gap-3 px-4 py-3 hover:bg-gray-100"
            >
              <div className="flex size-[40px] items-center justify-center rounded-full bg-gray-300 p-2 text-white">
                <BookCheck size={20} strokeWidth={2} />
              </div>
              <div className="w-full">
                <Link
                  href={`/dashboard/booking/${booking.id}`}
                  className="w-full hover:underline"
                >
                  {booking.car.name} -{" "}
                  <span className="font-medium">({booking.user.fullname})</span>
                </Link>
                <div className="text-sm text-black/50">
                  {format(booking.start_date, "dd MMM yyyy")} -{" "}
                  {format(booking.end_date, "dd MMM yyyy")}
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
