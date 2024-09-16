"use client";
import { Avatar, cn, Divider, Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { BookCheck, Car, NotebookPen, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import Select from "~/components/common/select";
import { bookings } from "~/data/mock";
import { api } from "~/trpc/react";
import { BookingStatus } from "~/types";

type ContainerType = {
  title: string;
  children: React.ReactNode;
  className?: string;
  seeAllLink?: string;
};

export default function DashboardPage() {
  const { data: cars } = api.cars.getAll.useQuery();
  const { data: statsData } = api.global.getStats.useQuery();
  const stats = addIconsToStats(statsData ?? []);
  const { data: users } = api.users.getAllUsers.useQuery();

  const {
    mutate: fetchCarAvailability,
    data,
    isPending: isFetchingAvailability,
  } = api.cars.getCarAvailability.useMutation();

  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Dashboard</h1>

      <div className="mt-4 grid grid-cols-12 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="col-span-6 md:col-span-4">
            <div className="flex gap-4 rounded-lg border-[1px] border-solid bg-white p-6">
              <div className="flex size-[50px] items-center justify-center rounded-full bg-primary p-2 text-white">
                {stat.icon && <stat.icon size={20} strokeWidth={2} />}
              </div>
              <div>
                <div className="text-black/50">{stat.name}</div>
                <div className="text-lg font-semibold text-black">
                  {stat.count}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-12 gap-4">
        <Container className="col-span-12" title="Check Car Availability">
          <Select
            endContent={isFetchingAvailability && <Spinner size="lg" />}
            placeholder="Select"
            label="Select Car"
            labelPlacement="inside"
            className="mt-4 max-w-[400px]"
            data={
              cars?.map((item) => ({ label: item.name, value: item.id })) ?? []
            }
            onChange={(e) => fetchCarAvailability({ id: e.target.value })}
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
          {users?.map((user, index) => (
            <div key={index} className="mt-4 flex gap-3">
              <div className="h-fit rounded-full bg-slate-100">
                <Avatar
                  // src={user?.profile}
                  fallback={user.fullname}
                  size="sm"
                />
              </div>
              <div>
                <div className="">{user.fullname}</div>
                <div className="text-sm text-black/50">
                  {format(user.createdAt?.toString() ?? "", "dd MMM yyyy")}
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

const addIconsToStats = (
  stats: { type: string; name: string; count: number }[],
) => {
  return stats.map((item) => {
    let icon;
    if (item.type === "car") icon = Car;
    if (item.type === "booking") icon = NotebookPen;
    if (item.type === "users") icon = UserRound;
    return { ...item, icon };
  });
};
