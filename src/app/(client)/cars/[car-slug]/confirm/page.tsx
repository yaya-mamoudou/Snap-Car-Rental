"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import CarCard from "~/components/common/car-card";
import Map from "~/components/common/map";
import ReservationSteps from "~/components/ui/reservation-steps";
import { currencyFormatter, getBookingPrices } from "~/helpers";
import { useGlobalStore } from "~/store/globalStore";
import { api } from "~/trpc/react";

const dropoffLocation = { lat: 34.01, lng: -118.4963 };

export default function Page() {
  const params = useParams();
  const carSlug = params["car-slug"];
  const { data: car } = api.cars.getById.useQuery({ id: carSlug as string });
  const router = useRouter();
  const { mutate, isPending } = api.booking.create.useMutation();
  const { start_date, end_date, dropoff_location_id, pickup_location_id } =
    useGlobalStore((state) => state.state.activeBookingDetails);

  const props = getBookingPrices({
    start_date,
    end_date,
    monthly_price: car?.monthly_price ?? "",
    daily_price: car?.daily_price,
  });

  const handleSubmit = async () => {
    mutate(
      {
        start_date: start_date!,
        end_date: end_date!,
        amount: props.total_price,
        carId: carSlug as string,
        dropoff_location_id: dropoff_location_id!,
        pickup_location_id: pickup_location_id!,
      },
      {
        onSuccess(data) {
          toast.success("Car booked successfully!!!");
          router.push(`./success?ref=${data.ref}`);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps step={3} />
      <div className="flex-1 bg-black/5 py-20">
        <div className="container">
          <h1 className="mb-10 text-2xl font-semibold">Confirm Booking</h1>

          <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
            <div className="col-span-12 md:col-span-8">
              {car && (
                <CarCard
                  horizontal
                  id={car.id}
                  daily_price={car.daily_price}
                  monthly_price={car.monthly_price ?? ""}
                  transmission={car.transmission}
                  name={car.name}
                  availability={car.availability}
                  luggages={car.luggages}
                  engine={car.engine}
                  seats={car.seats}
                />
              )}
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="rounded-xl bg-white py-4">
                <h2 className="px-4 text-lg font-semibold lg:px-10">
                  Pricing Details
                </h2>
                <div>
                  <div className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10">
                    <span className="text-black/40">Rental Fee/Day</span>
                    <span className="font-semibold">
                      {currencyFormatter.format(Number(car?.daily_price))}
                    </span>
                  </div>

                  <div className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10">
                    <span className="text-black/40">Number of Days</span>
                    <span className="font-semibold">{props.numberOfDays}</span>
                  </div>

                  <div className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10">
                    <span className="text-black/40">Insurance</span>
                    <span className="font-semibold"></span>
                  </div>
                  <div className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10">
                    <span className="text-black/40">Tax</span>
                    <span className="font-semibold">
                      {currencyFormatter.format(props.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10">
                    <span className="text-black/40">Total Cost</span>
                    <span className="font-semibold">
                      {currencyFormatter.format(props.total_price)}
                    </span>
                  </div>

                  {/* {data.map((item) => (
                    <div
                      className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10"
                      key={item.label}
                    >
                      <span className="text-black/40">{item.label}</span>
                      <span className="font-semibold">{item.amount}</span>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>

          <h5 className="mt-10 text-lg font-medium">
            We accept the following payment methods:
          </h5>

          <div className="flex flex-wrap gap-10">
            {paymentData.map((item) => (
              <Image
                src={item}
                key={item}
                alt="Payment option"
                width={120}
                height={70}
                className="object-contain"
              />
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            isLoading={isPending}
            isDisabled={car?.availability !== "AVAILABLE"}
            className="mt-10 w-full"
          >
            Confirm
          </Button>

          <div className="mt-20">
            <Map
              dropOff={dropoffLocation}
              pickup={{ lat: 39.08428595199796, lng: -76.94431911690377 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const paymentData = [
  "/images/payment/Cash App.webp",
  "/images/payment/Paypal.webp",
  "/images/payment/Square.webp",
  "/images/payment/Stripe.webp",
  "/images/payment/Venmo.webp",
  "/images/payment/zelle.png",
];
