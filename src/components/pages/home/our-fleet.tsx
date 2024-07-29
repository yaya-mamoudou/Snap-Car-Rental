import CarCard from "~/components/common/car-card";
import { cars } from "../../../data/mock";
const carsList = cars();

export default function OurFleet() {
  return (
    <div className="bg-[#DBDBDB] py-10">
      <div className="container my-14 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold">Our Fleet</h2>
        <div className="mt-10 grid w-full grid-cols-12 gap-x-0 gap-y-10 sm:gap-x-10 lg:w-3/4">
          {carsList.map((item, key) => (
            <div key={key} className="col-span-12 sm:col-span-6 2xl:col-span-4">
              <CarCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
