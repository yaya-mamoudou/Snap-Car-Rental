import Image from "next/image";
import React from "react";

const data = [
  {
    img: "/images/cars/car7.webp",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, culpa sunt. Temporibus eius alias quaerat, neque totam nisi asperiores, velit nesciunt nam sequi tempora nulla.",
  },
  {
    img: "/images/cars/car7.webp",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, culpa sunt. Temporibus eius alias quaerat, neque totam nisi asperiores, velit nesciunt nam sequi tempora nulla.",
  },
  {
    img: "/images/cars/car7.webp",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, culpa sunt. Temporibus eius alias quaerat, neque totam nisi asperiores, velit nesciunt nam sequi tempora nulla.",
  },
];

export default function CarCollection() {
  return (
    <div className="relative py-20">
      <div className="absolute -top-[20px] left-0 h-[40px] w-[150px] rounded-br-full rounded-tr-full bg-primary-01 md:w-[300px]"></div>
      <div className="absolute -bottom-[20px] right-0 h-[40px] w-[150px] rounded-bl-full rounded-tl-full bg-primary-01 md:w-[300px]"></div>

      <div className="container">
        <h2 className="text-center text-2xl font-semibold">
          Check out our supercar collection
        </h2>

        <div className="mt-20 grid grid-cols-12 gap-x-0 gap-y-20 md:gap-x-10 xl:gap-x-20">
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

const Card = ({ ...props }) => {
  return (
    <div className="">
      <div className="mb-4 flex flex-col items-center xl:items-end">
        <div className="relative md:w-[60%] xl:w-[85%]">
          <div className="absolute z-10 min-h-full w-[100%] rounded-3xl bg-primary-01"></div>
          <Image
            alt="car image"
            width={300}
            height={300}
            className="relative -left-[25%] top-0 z-20"
            src={props.img}
          />
        </div>
      </div>
      <p>{props.text}</p>
    </div>
  );
};
