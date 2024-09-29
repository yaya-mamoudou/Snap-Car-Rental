"use client";
import { Divider, Spinner } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import BookingCard from "~/components/common/booking-card";
import Input from "~/components/common/input";
import { api } from "~/trpc/react";

export default function BookingPage() {
  const { data, isPending, error } = api.booking.getAll.useQuery({
    per_page: 2,
  });

  console.log(data);

  useEffect(() => {
    error?.message && toast.error(error.message);
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
        </div>
      </div>
    </div>
  );
}
