import CarCard from "~/components/common/car-card";
import { api } from "~/trpc/server";

export default async function OurFleet() {
  const cars = await api.cars.getAll({ per_page: 3 });

  return (
    <div className="bg-[#DBDBDB] py-10">
      <div className="container my-14 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold">Our Fleet</h2>
        <div className="mt-10 grid w-full grid-cols-12 gap-x-0 gap-y-10 sm:gap-x-10 lg:w-3/4">
          {cars?.data.map((car, key) => (
            <div key={key} className="col-span-12 sm:col-span-6 2xl:col-span-4">
              <CarCard
                id={car.id}
                daily_price={car.daily_price}
                monthly_price={car.monthly_price!}
                transmission={car.transmission}
                name={car.name}
                availability={car.availability}
                luggages={car.luggages}
                engine={car.engine}
                seats={car.seats}
                images={car.images}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
