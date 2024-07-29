import Image from "next/image";
import Button from "~/components/common/button";
import CarCard from "~/components/common/car-card";
import Map from "~/components/common/map";
import { cars } from "~/data/mock";
import ReservationSteps from "~/components/ui/reservation-steps";
const car = cars(1)[0];

const pickupLocation = { lat: 34.1184, lng: -118.3004 }; // Griffith Observatory
const dropoffLocation = { lat: 34.01, lng: -118.4963 };

export default function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps step={3} />
      <div className="flex-1 bg-black/5 py-20">
        <div className="container">
          <h1 className="mb-10 text-2xl font-semibold">Confirm Booking</h1>

          <div className="grid grid-cols-12 md:gap-x-10 gap-y-10">
            <div className="col-span-12 md:col-span-8">
              <CarCard horizontal {...car} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="rounded-xl bg-white py-4">
                <h2 className="px-4 text-lg font-semibold lg:px-10">
                  Pricing Details
                </h2>
                <div>
                  {data.map((item) => (
                    <div
                      className="flex justify-between px-4 py-2 text-sm odd:bg-gray-100 lg:px-10"
                      key={item.label}
                    >
                      <span className="text-black/40">{item.label}</span>
                      <span className="font-semibold">{item.amount}</span>
                    </div>
                  ))}
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

          <Button link href="./success" className="mt-10 w-full">
            Confirm
          </Button>

          <div className="mt-20">
            <Map dropOff={dropoffLocation} pickup={pickupLocation} />
          </div>
        </div>
      </div>
    </div>
  );
}

const data = [
  { label: "Rental Fee/Day", amount: "$12" },
  { label: "Insurance", amount: "$12" },
  { label: "Tax", amount: "$6" },
  { label: "Total Cost", amount: "$28" },
];

const paymentData = [
  "/images/payment/Cash App.webp",
  "/images/payment/Paypal.webp",
  "/images/payment/Square.webp",
  "/images/payment/Stripe.webp",
  "/images/payment/Venmo.webp",
  "/images/payment/zelle.png",
];
