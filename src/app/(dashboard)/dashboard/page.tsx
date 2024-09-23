"use client";
import { Avatar, Divider, Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { Car, NotebookPen, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";
import BookingCard from "~/components/common/booking-card";
import Select from "~/components/common/select";
import { api } from "~/trpc/react";

type ContainerType = {
  title: string;
  children: React.ReactNode;
  className?: string;
  seeAllLink?: string;
};

export default function DashboardPage() {
  const { data: cars } = api.cars.getAll.useQuery({});
  const { data: bookings } = api.booking.getAll.useQuery({ per_page: 8 });
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
          <div className="flex w-full items-center gap-x-4">
            <Select
              endContent={isFetchingAvailability && <Spinner size="sm" />}
              placeholder="Select"
              label="Select Car"
              labelPlacement="inside"
              className="mt-4 max-w-[400px] flex-1"
              data={
                cars?.data.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) ?? []
              }
              onChange={(e) => fetchCarAvailability({ id: e.target.value })}
            />
            {data && (
              <div className="capitalize">
                {data?.availability?.toLowerCase()}
              </div>
            )}
          </div>
        </Container>
        <Container
          seeAllLink="/dashboard/booking"
          className="col-span-12 md:col-span-6 xl:col-span-8"
          title="Recent Bookings"
        >
          {bookings?.data?.map((booking) => (
            <BookingCard
              key={booking.id}
              end_date={booking.end_date.toString()}
              start_date={booking.start_date.toString()}
              status={booking.status}
              id={booking.id}
              user={{ fullname: booking.user.fullname! }}
              car={booking.car}
            />
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
                  fallback={user.fullname
                    ?.split(" ")
                    .map((item) => item[0])
                    .join("")}
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
    if (item.type === "cars") icon = Car;
    if (item.type === "booking") icon = NotebookPen;
    if (item.type === "users") icon = UserRound;
    return { ...item, icon };
  });
};
