import Image from "next/image";
import React from "react";

export default function Insurance() {
  return (
    <div>
      <div className="relative min-h-[70vh]">
        <Image
          alt="car_texture"
          src="/images/car_texture_black.webp"
          width={500}
          height={300}
          className="absolute -right-0 bottom-10 w-2/3 opacity-50"
        />
        <div className="min-h-[inherit] bg-primary/90">
          <div className="container py-20">
            <div className="grid grid-cols-12 gap-x-0 gap-y-4 text-white md:gap-x-20">
              <div className="col-span-12 md:col-span-4">
                <h2 className="mb-10 text-2xl font-semibold">
                  Our Insurance covers you, your pets and luggage
                </h2>
                <p>
                  {
                    "Got a fantastic deal on a fuel-efficient car, which was perfect for our get away road trip with my friends. The car was clean and comfortable, and the price was unbeatable. We had a blast exploring new places, and we'll definitely recommend your company to anyone looking for an affordable rental car. - Emily C., Student"
                  }
                </p>
              </div>
              <div className="col-span-12 *:mb-4 md:col-span-4">
                <p>
                  {
                    "Included with Every Rental: Liability Coverage (LI): This protects you financially if you injure someone or damage another vehicle or property while driving the rental car. It meets minimum legal requirements but may not cover all damages. Optional Coverage (Add-Ons):"
                  }
                </p>
                <p>
                  {
                    "Collision Damage Waiver (CDW): This covers damage to the rental car itself in the event of a collision. It reduces your financial responsibility in case of an accident, typically coming with a deductible (out-of-pocket expense) you'll need to pay."
                  }
                </p>

                <p>
                  {
                    "Loss Damage Waiver (LDW): Similar to CDW, but also covers theft of the rental car. Additional Coverage Options (Available for Purchase):"
                  }
                </p>
                <p>
                  {
                    "Personal Accident Insurance (PAI): This provides medical and accidental death benefits for the driver and passengers in the rental car. Roadside Assistance (RSA): Provides 24/7 assistance for unexpected situations like flat tires,"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
