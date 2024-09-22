"use client";
import { Pagination, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import CarCard from "~/components/common/car-card";
import { api } from "~/trpc/react";

export default function CarList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending } = api.cars.getAll.useQuery({
    per_page: 8,
    page: currentPage,
  });

  return (
    <div className="flex-1 bg-black/5 py-20">
      <div className="container flex flex-col items-center">
        <h2 className="mb-10 text-center text-2xl font-semibold">
          Choose a Vehicul
        </h2>

        {isPending && (
          <div className="flex w-full items-center justify-center gap-x-2">
            <Spinner size="sm" /> Loading Cars
          </div>
        )}

        <div className="grid w-full grid-cols-12 gap-x-0 gap-y-10 sm:gap-x-10 lg:w-3/4">
          {data?.data?.map((item, key) => (
            <div key={key} className="col-span-12 sm:col-span-6 2xl:col-span-4">
              <CarCard
                id={item.id}
                daily_price={item.daily_price}
                monthly_price={item.monthly_price!}
                transmission={item.transmission}
                name={item.name}
                availability={item.availability}
                luggages={item.luggages}
                engine={item.engine}
                seats={item.seats}
              />
            </div>
          ))}
        </div>
        <Pagination
          onChange={(e) => setCurrentPage(e)}
          className="mt-20 p-0 drop-shadow-2xl"
          isCompact
          showControls
          initialPage={1}
          total={data?.meta.total_pages ?? 1}
          page={data?.meta.current_page}
        />
      </div>
    </div>
  );
}
