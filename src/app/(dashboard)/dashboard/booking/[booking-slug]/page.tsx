"use client";
import { parseDateTime } from "@internationalized/date";
import { Divider, Spinner } from "@nextui-org/react";
import type { BookingStatus } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import DatePicker from "~/components/common/date-picker";
import Select from "~/components/common/select";
import { Bookingstatus, formatStr } from "~/data/mock";
import { api } from "~/trpc/react";

export default function BookingPage() {
  const params = useParams();
  const { mutate: update, isPending } = api.booking.update.useMutation();
  const utils = api.useUtils();
  const { data: booking, isPending: loadingBooking } =
    api.booking.getById.useQuery({
      id: params["booking-slug"] as string,
    });

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    car_id: "",
    status: "" as BookingStatus,
  });

  useEffect(() => {
    if (booking) {
      setForm({
        start_date: format(booking?.start_date.toISOString(), formatStr),
        end_date: format(booking?.end_date.toISOString(), formatStr),
        car_id: booking.car.id,
        status: booking.status,
      });
    }
  }, [booking]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () =>
    update(
      { ...form, id: params["booking-slug"] as string },
      {
        async onSuccess() {
          toast.success("Booking Updated");
          await utils.booking.getAll.invalidate();
          await utils.cars.getAll.invalidate();
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );

  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Booking Details</h1>
      <div className="mt-4 space-y-4 rounded-lg bg-white p-4 *:text-sm">
        <Image
          width={200}
          height={200}
          src={booking?.car.images[0] ?? "/images/cars/car3.jpg"}
          alt={`${""} profile image`}
          className="self-start rounded-sm"
        />
        <Divider className="bg-gray-200" />
        {loadingBooking && (
          <div className="flex w-full items-center justify-center gap-x-2">
            <Spinner size="sm" /> Fetching booking information
          </div>
        )}
        <div className="*:p-2 odd:*:bg-gray-50">
          <div>
            <div className="text-gray-400">Car Name</div>
            <div>{booking?.car.name}</div>
          </div>

          <div>
            <div className="text-gray-400">User</div>
            <Link
              className="text-primary underline"
              href={`/dashboard/users/${booking?.user.id}`}
            >
              {booking?.user.fullname} - {booking?.user.phone_number}
            </Link>
          </div>

          <div>
            <div className="text-gray-400">Start Date</div>
            {form?.start_date && (
              <DatePicker
                aria-label="start_date"
                variant="bordered"
                defaultValue={parseDateTime(form.start_date)}
                onChange={(e) =>
                  handleChange("start_date", format(e.toString(), formatStr))
                }
              />
            )}
          </div>

          <div>
            <div className="text-gray-400">End Date</div>
            {form?.end_date && (
              <DatePicker
                aria-label="end_date"
                variant="bordered"
                defaultValue={parseDateTime(form.end_date)}
                onChange={(e) =>
                  handleChange("end_date", format(e.toString(), formatStr))
                }
              />
            )}
          </div>

          <div>
            <div className="text-gray-400">Status</div>
            {form?.status && (
              <Select
                aria-label="booking status"
                data={Bookingstatus}
                onChange={(e) => handleChange("status", e.target.value)}
                variant="bordered"
                selectedKeys={[form.status]}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button isLoading={isPending} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
