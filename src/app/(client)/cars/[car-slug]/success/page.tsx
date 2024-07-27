import { Input } from "@nextui-org/react";
import { Check, CircleCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "~/components/common/button";
import ReservationSteps from "~/components/ui/reservation-steps";

export default function Page() {
  return (
    <div className="flex min-h-[inherit] flex-col">
      <ReservationSteps step={4} />
      <div className="flex-1 bg-black/5 pt-20">
        <div className="relative top-[200px] min-h-[50vh]">
          <div className="size-full overflow-hidden">
            <Image
              alt="car_texture"
              src="/images/car_texture_black.webp"
              width={500}
              height={300}
              className="absolute -left-20 bottom-0 h-[80%] w-2/3 object-contain object-left opacity-50"
            />
          </div>
          <div className="min-h-[inherit] bg-primary/90">
            <div className="container">
              <div className="relative top-[-200px] flex flex-col items-center">
                <div className="md:w-2/3">
                  <h1 className="mb-10 text-2xl font-semibold">Payment</h1>
                  <div className="rounded-2xl bg-white p-10">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary p-2">
                        <Check className="text-white" size={20} />
                      </div>
                      <h2 className="text-xl font-medium text-primary">
                        Booking Confirmed
                      </h2>
                    </div>

                    <p className="mt-4">
                      Leonard!, thank you for choosing our service. Your car
                      will be automatically activated for you at pickup time.{" "}
                      <strong>
                        Provide the confirmation code below at pick up.
                      </strong>
                    </p>

                    <Input
                      disabled
                      value="129384920394930"
                      className="mt-10"
                      variant="bordered"
                      classNames={{
                        input:
                          "border-transparent focus:border-transparent outline-transparent",
                        inputWrapper: "pr-0",
                      }}
                      endContent={
                        <Button className="!m-0 h-[100%] min-w-[150px]">
                          Save Code
                        </Button>
                      }
                    />

                    <div className="mt-5 text-sm font-semibold">
                      10:30 am, Fri, 23rd June
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-10">
                    <span className="text-sm font-semibold text-white">
                      Need us to clarify anything for you? Call us on
                    </span>
                    <Button className="bg-white font-semibold text-primary">
                      +1 (202) 215-0731
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
