import CarList from "~/components/pages/cars";
import ReservationSteps from "~/components/ui/reservation-steps";
import { cars } from "~/data/mock";
const carsList = cars(9);

export default async function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps />
      <CarList />
    </div>
  );
}
