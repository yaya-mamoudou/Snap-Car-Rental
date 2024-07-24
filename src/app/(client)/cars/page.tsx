import { cn, Pagination } from "@nextui-org/react";
import CarCard from "~/components/common/car-card";
import { cars } from "~/components/pages/home/data/mock";
const carsList = cars(9);
export default function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <div className="border-y-1 border-solid border-black/20">
        <Steps active={3} />
      </div>

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

const stepData = [
  "Vehicul Selection",
  "Review Booking",
  "Confirm Booking",
  "Payment",
];

const Steps = ({ active = 1 }: { active: number }) => {
  return (
    <div className="container grid w-full grid-cols-12 flex-wrap justify-center gap-4 py-10 xl:w-2/3">
      {stepData.map((label, index) => (
        <div
          key={index}
          className={cn(
            "col-span-12 flex items-center justify-center rounded-2xl border-1 border-black/40 px-4 py-1 text-center sm:col-span-6 lg:col-span-3",
            active >= index + 1 && "border-tranparent bg-primary text-white",
          )}
        >{`${index + 1} ${label}`}</div>
      ))}
    </div>
  );
};
