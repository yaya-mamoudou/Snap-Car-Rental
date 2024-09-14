"use client";
import { Avatar, cn, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { BookCheck } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Select from "~/components/common/select";
import { allCars, bookings, cars, stats, users } from "~/data/mock";
import { BookingStatus } from "~/types";

type ContainerType = {
  title: string;
  children: React.ReactNode;
  className?: string;
  seeAllLink?: string;
};

export default function DashboardPage() {
  const [availability, setAvailability] = useState<null | object>(null);
  const [isVailabilityLoading, setIsVailabilityLoading] = useState(false);

  const handleAvailabilityCheck = () => {
    setIsVailabilityLoading(true);
    setTimeout(() => {
      setAvailability({
        status: "Not available: only available by 12 Sep 2024",
      });
      setIsVailabilityLoading(false);
    }, 2000);
  };
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Dashboard</h1>

      <div className="mt-4 grid grid-cols-12 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="col-span-6 md:col-span-4">
            <div className="flex gap-4 rounded-lg border-[1px] border-solid bg-white p-6">
              <div className="flex size-[50px] items-center justify-center rounded-full bg-primary p-2 text-white">
                <stat.icon size={20} strokeWidth={2} />
              </div>
              <div>
                <div className="text-black/50">{stat.name}</div>
                <div className="text-lg font-semibold text-black">
                  {stat.amount}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-12 gap-4">
        <Container className="col-span-12" title="Check Car Availability">
          <Select
            placeholder="Select"
            label="Select Car"
            labelPlacement="inside"
            className="mt-4 max-w-[400px]"
            data={allCars}
            onChange={handleAvailabilityCheck}
          />
        </Container>
        <Container
          seeAllLink="/dashboard/booking"
          className="col-span-12 md:col-span-6 xl:col-span-8"
          title="Recent Bookings"
        >
          {bookings.map((booking, index) => (
            <div key={index} className="mt-4 flex gap-3">
              <div className="flex size-[40px] items-center justify-center rounded-full bg-gray-300 p-2 text-white">
                <BookCheck size={20} strokeWidth={2} />
              </div>
              <div className="w-full">
                <div className="w-full">
                  {booking.car} -{" "}
                  <span className="font-medium">({booking.user})</span>
                </div>
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
        </Container>
        <Container
          seeAllLink="/dashboard/users"
          className="col-span-12 md:col-span-6 xl:col-span-4"
          title="Recent Users"
        >
          {users.map((user, index) => (
            <div key={index} className="mt-4 flex gap-3">
              <div className="h-fit rounded-full bg-slate-100">
                <Avatar src={user.profile} fallback={user.name} size="sm" />
              </div>
              <div>
                <div className="">{user.name}</div>
                <div className="text-sm text-black/50">
                  {format(user.createdAt, "dd MMM yyyy")}
                </div>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
}

const Container = (props: ContainerType) => {
  return (
    <div className={`rounded-lg bg-white p-4 ${props.className}`}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{props.title}</div>
        {props.seeAllLink && (
          <Link
            href={props.seeAllLink}
            className="text-sm text-primary underline"
          >
            See All
          </Link>
        )}
      </div>
      <Divider className="mt-3 bg-slate-100" />

      {props.children}
    </div>
  );
};
