import { cn } from "@nextui-org/react";

const stepData = [
  "Vehicul Selection",
  "Review Booking",
  "Confirm Booking",
  "Payment",
];

const ReservationSteps = ({ step = 1 }: { step?: number }) => {
  return (
    <div className="border-y-1 border-solid border-black/20">
      <div className="container grid w-full grid-cols-12 flex-wrap justify-center gap-4 py-10 xl:w-2/3">
        {stepData.map((label, index) => (
          <div
            key={index}
            className={cn(
              "col-span-12 flex items-center justify-center rounded-lg border-1 border-black/40 px-4 py-1 text-center sm:col-span-6 lg:col-span-3",
              step >= index + 1 && "border-tranparent bg-primary text-white",
            )}
          >{`${index + 1} ${label}`}</div>
        ))}
      </div>
    </div>
  );
};

export default ReservationSteps;
