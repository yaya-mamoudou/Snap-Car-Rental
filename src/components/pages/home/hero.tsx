"use client";
import Image from "next/image";
import Button from "~/components/common/button";
import DatePicker from "~/components/common/date-picker";
import Select from "~/components/common/select";
import { locations } from "~/data/mock";

export default function Hero() {
  return (
    <div className="md:container">
      <div className="relative flex min-h-[60vh] flex-col items-center justify-end bg-gradient-to-t from-[#8A8A8A80] to-[#F0F0F080] p-6 !pt-10 sm:p-10 md:mt-10 md:rounded-3xl xl:pb-32">
        <div className="left-0 top-20 mb-10 flex justify-center xl:absolute xl:justify-self-start">
          <Image
            width={200}
            height={300}
            className="relative z-20 w-2/3 sm:w-[300px] lg:w-[400px]"
            src="/images/hero-car.webp"
            alt="hero car"
          />
          <div className="absolute left-0 top-0 z-10 hidden h-[200px] rounded-r-full bg-primary xl:block xl:w-4/5"></div>
        </div>
        <div className="flex w-full flex-col items-center justify-center space-y-6 text-center sm:w-2/3 xl:w-2/6">
          <h1 className="text-4xl font-medium">
            Rent a Great <br /> Car in a Snap
          </h1>

          <p>
            A fleet of elegant cars to suit all your needs. A trusted service
            dedicated to understanding and fulfilling client needs in snap. We
            help you save time.
          </p>
          <div className="space-x-4 *:bg-black *:text-white">
            <Button>My Booking</Button>
            <Button link href="/cars">
              See All Cars
            </Button>
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-12 items-center gap-4 rounded-2xl bg-white p-5 lg:w-3/4">
          <div className="col-span-12 md:col-span-6 xl:col-span-4">
            <Select
              placeholder="Select location"
              labelPlacement="inside"
              label="Pick-up Location"
              data={locations}
              selectedKeys={[locations[0]?.value ?? ""]}
              defaultSelectedKeys={[locations[0]?.value ?? ""]}
            />
          </div>

          <div className="col-span-12 md:col-span-6 xl:col-span-4">
            <DatePicker
              variant="bordered"
              label="Pick-up Date"
              minToday
              withTime
            />
          </div>

          <div className="col-span-12 xl:col-span-4">
            <Button className="h-[56px] w-full bg-primary text-white">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
