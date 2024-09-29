"use client";
import { parseDateTime } from "@internationalized/date";
import { add, differenceInDays, format } from "date-fns";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "~/components/common/button";
import DatePicker from "~/components/common/date-picker";
import Select from "~/components/common/select";
import ReservationSteps from "~/components/ui/reservation-steps";
import { formatStr } from "~/data/mock";
import { currencyFormatter } from "~/helpers";
import { useGlobalStore } from "~/store/globalStore";
import { api } from "~/trpc/react";
import type { DropdownItemType } from "~/types";

export default function Page() {
  const setBooking = useGlobalStore((state) => state.setActiveBooking);
  const router = useRouter();
  const params = useParams();
  const carSlug = params["car-slug"] as string;
  const { data: car } = api.cars.getById.useQuery({ id: carSlug });
  const { data } = api.location.getAll.useQuery();
  let locations: DropdownItemType[] = [];

  if (data) {
    locations = data?.map((item) => ({ label: item.name, value: item.id }));
  }

  const [form, setForm] = useState({
    start_date: format(new Date(), formatStr),
    end_date: format(add(new Date(), { hours: 24 }).toString(), formatStr),
  });

  const handleChange = (name: string, value: string) => {
    let end_date: string;
    value = format(value, formatStr);

    if (name === "start_date") {
      end_date = format(add(value, { hours: 24 }).toString(), formatStr);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(end_date && { end_date }),
    }));
  };

  const numberOfDays = differenceInDays(
    new Date(form.end_date),
    new Date(form.start_date),
  );

  const totalDaysPrice = Number(car?.daily_price) * numberOfDays;
  let cost = totalDaysPrice;

  if (numberOfDays % 7 === 0 && car?.weekly_price) {
    const weeklyPrices = Number(car?.weekly_price) * (numberOfDays / 30);
    cost = weeklyPrices;
  }

  const tax = cost * 0.06;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBooking({
      ...form,
      carId: carSlug,
      number_of_days: numberOfDays,
      pickup_location_id: locations[0]?.value ?? "",
      dropoff_location_id: locations[0]?.value ?? "",
    });

    router.push(`/cars/${carSlug}/confirm`);
  };

  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps step={2} />

      <div className="flex-1 bg-black/5 py-20">
        <div className="container">
          <h1 className="mb-10 text-2xl font-semibold">Review Booking</h1>
        </div>

        <div className="relative">
          <div className="absolute h-[300px] w-[200px] rounded-r-full bg-primary md:w-[400px] 2xl:w-2/5"></div>
          <div className="container relative z-10">
            <div className="grid grid-cols-12 gap-x-0 gap-y-10 md:gap-x-10">
              <div className="col-span-12 xl:col-span-8">
                <div className="my-4 h-full min-h-[300px] rounded-2xl bg-white p-4 md:p-10">
                  <Carousel
                    theme={{
                      control: {
                        base: "border-1 border-black !text-black flex items-center justify-center rounded-full !size-[30px]",
                        icon: "stroke-black",
                      },
                      indicators: {
                        wrapper:
                          "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 ",
                        base: "size-[14px] !bg-black/40 rounded-full bg- relative",
                        active: {
                          off: "opacity-30",
                        },
                      },
                    }}
                  >
                    {car?.images.map((img, key) => (
                      <Image
                        key={key}
                        alt="..."
                        src={img}
                        width={200}
                        height={200}
                        className="size-full object-contain md:size-2/3"
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="order-2 col-span-12 md:col-span-6 xl:col-span-4">
                <form
                  onSubmit={handleSubmit}
                  className="my-4 flex h-full flex-col gap-y-4 rounded-2xl bg-white p-4 md:p-10"
                >
                  <DatePicker
                    withTime
                    minToday
                    defaultValue={parseDateTime(form.start_date)}
                    value={parseDateTime(form.start_date)}
                    label="Pick-Up Date and Time"
                    labelPlacement="outside"
                    variant="bordered"
                    name="start_date"
                    onChange={(date) =>
                      handleChange("start_date", date.toString())
                    }
                  />
                  <DatePicker
                    withTime
                    minToday
                    label="Pick-Off Date and Time"
                    labelPlacement="outside"
                    variant="bordered"
                    name="end_date"
                    defaultValue={parseDateTime(form.end_date)}
                    value={parseDateTime(form.end_date)}
                    onChange={(date) =>
                      handleChange("end_date", date.toString())
                    }
                  />

                  <Select
                    data={locations}
                    defaultSelectedKeys={[locations[0]?.value ?? ""]}
                    selectedKeys={[locations[0]?.value ?? ""]}
                    placeholder="Select location"
                    label="Pick-Up Location"
                    labelPlacement="outside"
                  />
                  <Select
                    data={locations}
                    defaultSelectedKeys={[locations[0]?.value ?? ""]}
                    selectedKeys={[locations[0]?.value ?? ""]}
                    placeholder="Select location"
                    label="Pick-Off Location"
                    labelPlacement="outside"
                  />
                  <div className="*:flex *:justify-between *:text-sm *:font-medium *:text-gray-500">
                    <div>
                      <span>Number of days</span>
                      <span>{numberOfDays}</span>
                    </div>
                    <div>
                      <span>Price</span>
                      <span>{currencyFormatter.format(cost)}</span>
                    </div>
                    <div>
                      <span>Tax</span>
                      <span>{currencyFormatter.format(tax)}</span>
                    </div>

                    <div className="!text-primary-01">
                      <span>Total Cost</span>
                      <span>{currencyFormatter.format(cost + tax)}</span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="text-xl font-bold uppercase">Insurance</div>
                    <span className="text-sm font-medium text-primary-01">
                      Mains D&apos;anges Insurance
                    </span>
                  </div>

                  <Button
                    type="submit"
                    isDisabled={car?.availability !== "AVAILABLE"}
                  >
                    Book
                  </Button>
                </form>
              </div>
              <div className="order-2 col-span-12 md:col-span-6 xl:col-span-8">
                <div className="my-4 h-full space-y-3 rounded-2xl bg-white p-4 md:p-10">
                  <Item label="Name" value={car?.name}></Item>
                  <Item label="Type" value={car?.category.name}></Item>
                  <Item
                    label="Daily price"
                    value={`$${car?.daily_price}`}
                  ></Item>
                  <Item
                    label="Weekly price"
                    value={`$${car?.weekly_price}`}
                  ></Item>
                  <Item label="Seats" value={car?.seats}></Item>
                  <Item label="Fuel" value={car?.fuel}></Item>
                  {car?.MPG && <Item label="MPG" value={car?.MPG ?? ""}></Item>}
                  {car?.description && (
                    <Item label="Description" value={car?.description}></Item>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Item = (props: { label: string; value?: string }) => {
  return (
    <div>
      <div className="text-sm font-medium text-gray-400">{props.label}:</div>{" "}
      {props.value}
    </div>
  );
};
