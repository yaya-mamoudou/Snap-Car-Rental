"use client";
import Button from "~/components/common/button";
import DatePicker from "~/components/common/date-picker";
import Select from "~/components/common/select";

export default function Hero() {
  return (
    <div className="container">
      <div className="relative mt-10 flex min-h-[70vh] flex-col items-center justify-end rounded-3xl bg-gradient-to-t from-[#8A8A8A80] to-[#F0F0F080] p-2 !pt-10 sm:p-10 xl:pb-32">
        <div className="flex w-full flex-col items-center justify-center space-y-6 text-center sm:w-2/3 lg:w-3/6">
          <h1 className="text-4xl font-medium">
            Rent a Great <br /> Car in a Snap
          </h1>

          <p>
            A fleet of elegant cars to suit all your needs. A trusted service
            dedicated to understanding and fulfilling client needs in snap. We
            help you save time.
          </p>
          <div className="space-x-4 *:bg-black *:text-white">
            <Button>Book Now</Button>
            <Button>See All Cars</Button>
          </div>
        </div>

        <div className="mt-10 grid w-full grid-cols-12 items-center gap-4 rounded-2xl bg-white p-5 lg:w-3/4">
          <div className="col-span-12 md:col-span-6 xl:col-span-4">
            <Select
              placeholder="Select location"
              labelPlacement="inside"
              label="Pick-up Location"
              data={[{ label: "Yaya", value: "yaya" }]}
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
