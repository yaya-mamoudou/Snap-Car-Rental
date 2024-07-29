import { Pagination } from "@nextui-org/react";
import CarCard from "~/components/common/car-card";
import { cars } from "~/data/mock";
import ReservationSteps from "~/components/ui/reservation-steps";
const carsList = cars(9);

export default function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps />

      <div className="flex-1 bg-black/5 py-20">
        <div className="container flex flex-col items-center">
          <h2 className="mb-10 text-center text-2xl font-semibold">
            Choose a Vehicul
          </h2>

          <div className="grid w-full grid-cols-12 gap-x-0 gap-y-10 sm:gap-x-10 lg:w-3/4">
            {carsList.map((item, key) => (
              <div
                key={key}
                className="col-span-12 sm:col-span-6 2xl:col-span-4"
              >
                <CarCard {...item} />
              </div>
            ))}
          </div>
          <Pagination
            className="mt-20 p-0 drop-shadow-2xl"
            isCompact
            showControls
            total={5}
            initialPage={1}
          />
        </div>
      </div>
    </div>
  );
}
