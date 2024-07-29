import { Carousel } from "flowbite-react";
import Image from "next/image";
import React from "react";
import Button from "~/components/common/button";
import DatePicker from "~/components/common/date-picker";
import Select from "~/components/common/select";
import { cars } from "~/data/mock";
import ReservationSteps from "~/components/ui/reservation-steps";

const car = cars(1)[0];
type Props = {
  params: {
    "car-slug": string;
  };
};
export default function Page(props: Props) {
  const carSlug = props.params?.["car-slug"];

  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps step={2} />

      <div className="flex-1 bg-black/5 py-20">
        <div className="container">
          <h1 className="mb-10 text-2xl font-semibold">Review Booking</h1>
        </div>

        <div className="relative">
          <div className="absolute h-[300px] w-[200px] rounded-r-full bg-primary md:w-[400px] 2xl:w-2/5"></div>
          <div className="container relative z-10">
            <div className="grid grid-cols-12 gap-x-0 gap-y-10 md:gap-x-10">
              <div className="col-span-12 xl:col-span-4">
                <div className="my-4 h-full min-h-[300px] rounded-2xl bg-white p-4 md:p-10">
                  <Carousel
                    theme={{
                      control: {
                        base: "border-1 border-black !text-black flex items-center justify-center rounded-full !size-[30px]",
                        icon: "stroke-black",
                      },
                      indicators: {
                        wrapper:
                          "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 ",
                        base: "size-[14px] !bg-black/40 rounded-full bg- relative",
                        active: {
                          off: "opacity-30",
                        },
                      },
                    }}
                  >
                    {car?.images.map((img, key) => (
                      <Image
                        key={key}
                        alt="..."
                        src={img}
                        width={200}
                        height={200}
                        className="size-full object-contain md:size-2/3"
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <div className="my-4 h-full rounded-2xl bg-white p-4 md:p-10">
                  <h2 className="mb-5 text-xl font-semibold">Description</h2>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Officiis id non voluptatibus iusto labore, doloribus ad velit
                  blanditiis sapiente eveniet eos ipsa magnam laborum fugit
                  molestiae rerum adipisci quis pariatur aut! Placeat
                  perspiciatis sed aut expedita aliquam, accusantium saepe et
                  porro magni quisquam dolorem maiores cumque eius iure cum
                  inventore!
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <form className="my-4 flex h-full flex-col gap-y-4 rounded-2xl bg-white p-4 md:p-10">
                  <DatePicker
                    withTime
                    label="Pick-Up Date and Time"
                    labelPlacement="outside"
                    variant="bordered"
                  />
                  <DatePicker
                    withTime
                    label="Pick-Off Date and Time"
                    labelPlacement="outside"
                    variant="bordered"
                  />

                  <Select
                    data={[]}
                    placeholder="Select location"
                    label="Pick-Up Location"
                    labelPlacement="outside"
                  />
                  <Select
                    data={[]}
                    placeholder="Select location"
                    label="Pick-Off Location"
                    labelPlacement="outside"
                  />

                  <div className="flex justify-between font-bold text-primary-01">
                    <span>Total Cost</span>
                    <span>$120</span>
                  </div>

                  <div className="mt-10">
                    <div className="text-xl font-bold uppercase">Insurance</div>
                    <span className="text-sm font-medium text-primary-01">
                      Mains D&apos;anges Insurance
                    </span>
                  </div>

                  <Button link href={`/cars/${carSlug}/confirm`}>
                    Book
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
