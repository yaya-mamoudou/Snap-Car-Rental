import { Carousel } from "flowbite-react";
import { BriefcaseBusiness, Settings2, User } from "lucide-react";
import Image from "next/image";
import Button from "~/components/common/button";

const cars = Array.from({ length: 3 }, () => ({
  images: [
    "/images/cars/car3.jpg",
    "/images/cars/car1.webp",
    "/images/cars/car2.jpg",
  ],
  name: "Toyota Camry, 2022",
  price: { daily: "$35", month: "$960" },
  seats: "5",
  gear: "Auto",
  bags: "4",
  engine: "Disel",
}));

export default function OurFleet() {
  return (
    <div className="bg-[#DBDBDB] py-10">
      <div className="container my-14 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold">Our Fleet</h2>
        <div className="mt-10 grid w-full grid-cols-12 gap-10 lg:w-3/4">
          {cars.map((item, key) => (
            <div key={key} className="col-span-12 sm:col-span-6 2xl:col-span-4">
              <CarCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CarCard = ({ ...props }: (typeof cars)[0]) => {
  return (
    <div className="rounded-xl bg-white p-2">
      <div className="aspect-3/2 rounded-lg">
        <Carousel
          slide={false}
          rightControl={<div></div>}
          leftControl={<div></div>}
        >
          {props.images.map((img, key) => (
            <Image
              key={key}
              alt={props.name}
              src={img}
              width={200}
              height={200}
              className="size-full object-cover"
            />
          ))}
        </Carousel>
      </div>
      <div className="mt-5 pl-2">
        <h2 className="text-lg font-semibold">{props.name}</h2>
        <div className="mt-2 text-tiny font-semibold text-gray-500">
          <div>
            <span>
              {props.price.daily}/<span className="text-[0.6rem]">Day</span>
            </span>
            <span className="mx-2">|</span>
            <span>
              {props.price.month}/ <span className="text-[0.6rem]">Month</span>
            </span>
          </div>
          <div className="mt-2">{props.engine} Engine</div>
          <div className="mt-2 flex gap-4 *:flex *:items-center *:gap-2">
            <div>
              <Settings2 size={16} /> {props.gear}
            </div>
            <div>
              <User size={16} /> {props.seats}
            </div>

            <div>
              <BriefcaseBusiness size={16} /> {props.bags}
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-6 w-full">Rent Now</Button>
    </div>
  );
};
