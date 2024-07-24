import Image from "next/image";
import React from "react";

const data = [
  "our extensive fleet featuring everything from fuel-efficient compacts to spacious SUVs and luxurious convertibles. Find the perfect car to match your adventure, not just your budget.",
  "Transparent Pricing, Zero Surprises: We believe in upfront pricing with no hidden fees. See the total cost before you book, so you can plan with confidence.",
  "Fast & Easy Booking: Skip the lines and long wait times. Our user-friendly website and mobile app allow you to book your dream ride in minutes, from anywhere, anytime.",
];

export default function WhyChooseUs() {
  return (
    <>
      <div className="container flex flex-col py-10">
        <div className="relative z-20 mt-10 w-full self-center text-center md:w-2/3">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Why Choose Us?
          </h2>
          <p>
            Rent Like a Rockstar. Tired of the same old rental car experience?
            Drab sedans, endless paperwork, and hidden fees make rentals feel
            like so much work. At snap car we only aim to give you what you
            really want fast and easy. Here&apos;s how:{" "}
          </p>
        </div>
        <div className="mt-[100px] grid grid-cols-12 gap-x-0 gap-y-20 md:gap-x-10">
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
      <div className="pointer-events-none -mt-32 h-[250px] bg-primary">
        <div className="relative flex h-full justify-center text-white">
          <Image
            alt="car 6"
            src="/images/cars/car6.webp"
            width={500}
            height={300}
            className="absolute -bottom-20 w-2/3 sm:w-2/4 md:w-[400px]"
          />

          {/* <h2
            style={{
              WebkitTextStroke: "3px #2dada150",
              mixBlendMode: "multiply",
            }}
            className="absolute -bottom-16 right-10 hidden text-[5rem] font-black text-transparent 2xl:block"
          >
            Snap Car Rental
          </h2> */}
        </div>
      </div>
      {/* <div
        style={{ mixBlendMode: "color" }}
        className="h-[50px] bg-white"
      ></div> */}
    </>
  );
}

const Card = (props: { text: string; number: number }) => {
  return (
    <div className="relative flex h-full flex-col items-center rounded-2xl border-1 border-black/20 bg-white p-10 text-center">
      <div className="absolute -top-[40px] flex size-[80px] items-center justify-center rounded-full bg-primary-01 text-white">
        {props.number}
      </div>
      <p className="mt-10">{props.text}</p>
    </div>
  );
};
