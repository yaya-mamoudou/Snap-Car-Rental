import React from "react";

const cars = [
  {
    images: [
      "/images/cars/car1.webp",
      "/images/cars/car2.webp",
      "/images/cars/car3.webp",
    ],
    name: "Toyota Camry, 2022",
    price: { daily: "$35", month: "$960" },
    seats: "5",
    gear: "Auto",
    bags: "4",
  },
];

export default function OurFleet() {
  return (
    <div className="bg-[#DBDBDB] py-10">
      <div className="container">
        <h2 className="text-center text-2xl font-semibold">Our Fleet</h2>
        <div className="grid grid-cols-12 gap-4">
          {cars.map((item, key) => (
            <div key={key} className="col-span-3">
              <CarCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CarCard = ({ ...props }) => {
  return (
    <div className="rounded-lg bg-white">
      <div className="aspect-auto bg-gray-300"></div>
    </div>
  );
};
