import Image from "next/image";
import React from "react";

const data = [
  '"We needed a reliable car for our family vacation to the mountains. Snap Car rental had the perfect minivan, clean and spacious for all our gear. Booking online was a breeze, and picking up and dropping off the car was super smooth. We\'ll definitely be renting from you again for our next adventure!"  - Sarah M., Teacher',
  '"My flight got cancelled, and I needed a rental car ASAP to get to an important client meeting in another city. Snap Car rental saved the day! They had a great selection of cars available, and the staff helped me find the perfect one quickly. They even offered me a GPS rental to make sure I didn\'t get lost.  Thanks for the amazing service!" - David L., Marketing Manager',
  '"Got a fantastic deal on a fuel-efficient car, which was perfect for our get away road trip with my friends. The car was clean and comfortable, and the price was unbeatable. We had a blast exploring new places, and we\'ll definitely recommend your company to anyone looking for an affordable rental car." -  Emily C., Student',
];

export default function TrustedBy() {
  return (
    <div className="relative mb-20 py-20">
      <Image
        alt="car_texture"
        src="/images/car_texture_black.webp"
        width={500}
        height={300}
        className="absolute -bottom-20 -right-0 w-2/4 opacity-50"
      />
      <div className="container mt-20">
        <h2 className="text-center text-2xl font-semibold">
          Trusted By Thousands{" "}
        </h2>
        <div className="mt-[50px] grid grid-cols-12 gap-x-0 gap-y-20 md:gap-x-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 xl:col-span-4"
            >
              <Card text={item} number={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = (props: { text: string; number: number }) => {
  return (
    <div className="relative flex h-full flex-col items-center rounded-2xl border-1 border-black/20 bg-white p-10 text-center">
      <div className="absolute -bottom-[40px] flex size-[80px] items-center justify-center rounded-full bg-gray-400 text-white">
        {props.number}
      </div>
      <p className="mb-10">{props.text}</p>
    </div>
  );
};
