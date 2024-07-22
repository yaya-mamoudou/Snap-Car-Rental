import Image from "next/image";
import React from "react";

const data = [
  {
    text: "Get 10% off your first rental with us!",
    img: "/images/promotion1.jpg",
  },
  {
    text: "Weekend Getaway Special",
    img: "/images/promotion2.avif",
  },
  {
    text: "15% off your base rental rate! If you book any car for 3 days or more",
    img: "/images/promotion3.avif",
  },
];

export default function Promotions() {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container my-10 flex flex-col items-center">
        <h2 className="text-center text-2xl font-semibold">
          Special Offers & Promotion
        </h2>

        <div className="mt-[50px] grid grid-cols-12 gap-x-0 gap-y-20 md:gap-x-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 xl:col-span-4"
            >
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = (props: (typeof data)[0]) => {
  return (
    <div className="flex h-full flex-col items-center rounded-2xl border-1 border-black/20 bg-white p-2 text-center">
      <div className="aspect-3/2 w-full items-center justify-center rounded-2xl bg-gray-400">
        <Image
          alt="promition image"
          src={props.img}
          width={300}
          height={200}
          className="aspect-3/2 w-full rounded-2xl object-cover"
        />
      </div>
      <p className="my-4">{props.text}</p>
    </div>
  );
};
