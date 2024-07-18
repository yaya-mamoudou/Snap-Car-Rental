import { BookOpenCheck, MapPin, Settings } from "lucide-react";
import React from "react";

const data = [
  {
    text: "1. Choose the location date and time when you would like to rent the car to when you would like to drop it off.",
    icon: <MapPin />,
  },
  {
    text: "2. Select the car model and features of the vehicle type you desire",
    icon: <Settings />,
  },
  {
    text: "3. Make a reservation",
    icon: <BookOpenCheck />,
  },
];

export default function HowItWorks() {
  return (
    <div className="container my-24 flex justify-center">
      <div className="sm:w-3/4">
        <h2 className="text-center text-2xl font-semibold">How It Works</h2>
        <div className="mt-6 grid grid-cols-12 gap-4">
          {data.map((item, key) => (
            <div key={key} className="col-span-12 lg:col-span-6 xl:col-span-4">
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
    <div className="flex h-full items-center gap-4 rounded-2xl p-2 shadow-2xl">
      <div className="flex !size-[60px] items-center justify-center rounded-2xl bg-primary-01 text-white">
        {props.icon}
      </div>
      <div className="flex-1 text-small">
        <p>{props.text}</p>
      </div>
    </div>
  );
};
