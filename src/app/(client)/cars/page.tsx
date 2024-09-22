import CarList from "~/components/pages/cars";
import ReservationSteps from "~/components/ui/reservation-steps";

export default async function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps />
      <CarList />
    </div>
  );
}
