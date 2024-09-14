"use client";
import { Divider, Spinner } from "@nextui-org/react";
import { Eye, Pen, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import CreateCarDialog from "./create-car-dialog";
import { api } from "~/trpc/react";

export default function CarsList() {
  const { data: cars, isPending } = api.cars.getAll.useQuery();

  return (
    <div className="mt-4 rounded-lg bg-white py-4">
      <div className="px-4">
        <div className="flex justify-between">
          <Input
            placeholder="Search Car"
            className="max-w-[300px]"
            endContent={<Search />}
          />
          <CreateCarDialog>
            <Button endContent={<Plus size={20} />}> Add Car</Button>
          </CreateCarDialog>
        </div>
        <Divider className="mb-3 mt-3 bg-gray-200" />
      </div>
      {isPending && (
        <div className="flex w-full items-center justify-center gap-x-2">
          <Spinner size="sm" /> Loading Cars
        </div>
      )}
      <div className="odd:*:bg-gray-50">
        {cars?.map((car) => (
          <div
            key={car.id}
            className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
          >
            <div className="size-[150px] h-fit rounded-full bg-slate-100">
              <Image
                src="/images/cars/car3.jpg"
                alt="..."
                width={150}
                height={150}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Link
                href={`/dashboard/cars/${car.id}`}
                className="hover:underline"
              >
                {car.name}
              </Link>
              <div className="flex gap-2">
                <Button
                  link
                  size="sm"
                  variant="bordered"
                  href={`/dashboard/cars/${car.id}/edit`}
                  className="border-[1px]"
                >
                  <Pen size={14} />
                  Edit
                </Button>

                <Button
                  link
                  size="sm"
                  href={`/dashboard/cars/${car.id}`}
                  className="border-[1px]"
                >
                  <Eye size={14} />
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
