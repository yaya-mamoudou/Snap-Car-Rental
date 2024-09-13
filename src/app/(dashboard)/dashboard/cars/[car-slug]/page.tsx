import { Carousel } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { car, cars } from "~/data/mock";

export default function Page() {
  return (
    <div>
      <h1 className="mb-4 mt-10 text-2xl font-bold text-black">Car Details</h1>

      <div className="grid grid-cols-12 gap-x-0 gap-y-10 rounded-2xl bg-white md:gap-x-10">
        <div className="col-span-12">
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
              {car(1)?.images.map((img, key) => (
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

        <div className="col-span-12 md:col-span-6">
          <div className="my-4 h-full p-4 md:p-10">
            <div>
              <h2 className="text-xl font-semibold">Name</h2>
              <p>Toyota Honda</p>
            </div>

            <div>
              <h2 className="mt-6 text-xl font-semibold">Description</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis id non voluptatibus iusto labore, doloribus ad velit
                blanditiis sapiente eveniet eos ipsa magnam laborum fugit
                molestiae rerum adipisci quis pariatur aut! Placeat perspiciatis
                sed aut expedita aliquam, accusantium saepe et porro magni
                quisquam dolorem maiores cumque eius iure cum inventore!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
