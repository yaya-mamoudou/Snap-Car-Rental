"use client";
import { cn } from "@nextui-org/react";
import { BookingStatus } from "@prisma/client";
import { format } from "date-fns";
import { BookCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  car: { name: string };
  user: { fullname: string; [key: string]: string };
  start_date: string;
  end_date: string;
  status: BookingStatus;
};
export default function BookingCard(props: Props) {
  return (
    <div className="mt-4 flex gap-3 px-4 py-3 hover:bg-gray-100">
      <div className="flex size-[40px] items-center justify-center rounded-full bg-gray-300 p-2 text-white">
        <BookCheck size={20} strokeWidth={2} />
      </div>
      <div className="w-full">
        <Link
          href={`/dashboard/booking/${props?.id}`}
          className="w-full hover:underline"
        >
          {props?.car?.name} -{" "}
          <span className="font-medium">({props?.user?.fullname})</span>
        </Link>
        {props?.start_date && props?.start_date && (
          <div className="text-sm text-black/50">
            {format(props.start_date, "dd MMM yyyy")} -{" "}
            {format(props.end_date, "dd MMM yyyy")}
          </div>
        )}
        <div
          className={cn(
            [BookingStatus.PAID, BookingStatus.PAID_AND_ONGOING].includes(
              props.status as "PAID" | "PAID_AND_ONGOING",
            ) && "text-sm text-green-400",
            props?.status === BookingStatus.PENDIND_PAYMENT &&
              "text-yellow-400",
            props?.status === BookingStatus.EXPIRED && "text-red-500",
          )}
        >
          Status: {props?.status}
        </div>
      </div>
    </div>
  );
}
