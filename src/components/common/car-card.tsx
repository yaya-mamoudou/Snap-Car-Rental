import { cn } from "@nextui-org/react";
import { Carousel } from "flowbite-react";
import { BriefcaseBusiness, Settings2, User } from "lucide-react";
import { z } from "zod";
import { currencyFormatter } from "~/helpers";
import { createCarSchema } from "~/server/api/routers/car/schema";
import Button from "./button";

type Props = Partial<z.infer<typeof createCarSchema>> & {
  horizontal?: boolean;
  id: string;
  name: string;
  availability: string;
  daily_price: string;
  monthly_price: string;
  engine: string;
  transmission: string;
  seats: string;
  luggages: string;
  // images: string[];
};
const CarCard = (props: Props) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl bg-white p-2",
        props.horizontal && "md:flex-row md:gap-x-4",
      )}
    >
      <div
        className={cn(
          "aspect-3/2 rounded-lg",
          props.horizontal && "md:w-[200px]",
        )}
      >
        <Carousel
          slide={false}
          rightControl={<div></div>}
          leftControl={<div></div>}
          indicators={!props.horizontal}
        >
          {/* {props?.images
            ?.slice(0, props.horizontal ? 1 : undefined)
            ?.map((img, key) => (
              <Image
                key={key}
                alt={props?.name ?? ""}
                src={img}
                width={200}
                height={200}
                className="size-full object-cover"
              />
            ))} */}
        </Carousel>
      </div>
      <div className="mt-5 pl-2">
        <h2 className="text-lg font-semibold">{props?.name}</h2>
        <div className="capitalize text-red-400 line-through">
          {props.availability !== "AVAILABLE" && "Unavailable"}
        </div>
        <div className="mt-2 text-tiny font-semibold text-gray-500">
          <div>
            <span>
              {currencyFormatter.format(Number(props.daily_price))}/
              <span className="text-[0.6rem]">Day</span>
            </span>
            <span className="mx-2">|</span>
            {props.monthly_price && (
              <span>
                {currencyFormatter.format(Number(props?.monthly_price))}/
                <span className="text-[0.6rem]">Month</span>
              </span>
            )}
          </div>
          <div className="mt-2">{props?.engine} Engine</div>
          <div className="mt-2 flex gap-4 *:flex *:items-center *:gap-2">
            <div>
              <Settings2 size={16} /> {props?.transmission}
            </div>
            <div>
              <User size={16} /> {props?.seats}
            </div>

            <div>
              <BriefcaseBusiness size={16} /> {props?.luggages}
            </div>
          </div>
        </div>
      </div>
      {!props.horizontal && (
        <Button link href={`/cars/${props.id}/preview`} className="mt-6 w-full">
          Rent Now
        </Button>
      )}
    </div>
  );
};

export default CarCard;
