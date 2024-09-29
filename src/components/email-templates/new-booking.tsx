import React from "react";

type Props = {
  carName: string;
  carImg: string;
};

export default function NewBookingTemplate(props: Props) {
  return (
    <div className="bg-white p-6">
      <h1 className="my-10 text-xl">
        <span className="text-primary">{props.carName}</span> has just been
        booked
      </h1>
      {/* <Image
        src={props.carImg}
        width={150}
        height={40}
        alt="logo"
        className="h-[40px] w-full object-contain"
      />
      <Image
        src="/images/logo.png"
        width={70}
        height={40}
        alt="logo"
        className="h-[40px] w-full object-contain"
      /> */}
    </div>
  );
}
