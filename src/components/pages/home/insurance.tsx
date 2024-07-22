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
          className="absolute -right-20 bottom-10 w-2/3 opacity-50"
        />
        <div style={{ minHeight: "inherit" }} className="bg-primary/90">
          <div className="container py-20">
            <div className="grid grid-cols-12 gap-x-0 gap-y-4 text-white md:gap-x-20">
              <div className="col-span-12 md:col-span-4">
                <h2 className="mb-10 text-2xl font-semibold">
                  Our Insurance covers you, your pets and luggage
                </h2>
                <p>
                  Got a fantastic deal on a fuel-efficient car, which was
                  perfect for our get away road trip with my friends. The car
                  was clean and comfortable, and the price was unbeatable. We
                  had a blast exploring new places, and we'll definitely
                  recommend your company to anyone looking for an affordable
                  rental car." - Emily C., Student
                </p>
              </div>
              <div className="col-span-12 *:mb-4 md:col-span-4">
                <p>
                  Included with Every Rental: Liability Coverage (LI): This
                  protects you financially if you injure someone or damage
                  another vehicle or property while driving the rental car. It
                  meets minimum legal requirements but may not cover all
                  damages. Optional Coverage (Add-Ons):
                </p>
                <p>
                  Collision Damage Waiver (CDW): This covers damage to the
                  rental car itself in the event of a collision. It reduces your
                  financial responsibility in case of an accident, typically
                  coming with a deductible (out-of-pocket expense) you'll need
                  to pay.
                </p>

                <p>
                  Loss Damage Waiver (LDW): Similar to CDW, but also covers
                  theft of the rental car. Additional Coverage Options
                  (Available for Purchase):
                </p>
                <p>
                  Personal Accident Insurance (PAI): This provides medical and
                  accidental death benefits for the driver and passengers in the
                  rental car. Roadside Assistance (RSA): Provides 24/7
                  assistance for unexpected situations like flat tires,
                </p>
                {/* lockouts, or dead batteries. Why Choose Snap Car Rental
                Insurance? Transparency: We explain our insurance options
                clearly and simply, so you know exactly what's covered.
                Flexibility: Choose the level of coverage that best suits your
                budget and risk tolerance. Peace of Mind: Drive with confidence
                knowing you're protected in case of an unexpected event. Get a
                Quick Quote: See how affordable protecting your rental can be!
                During the booking process, you can easily view the cost of each
                optional insurance and choose the coverage that best suits your
                needs. Still Have Questions? Our friendly customer service team
                is happy to answer any questions you have about our insurance
                options. Contact us today! Additional Tips: Consider your
                personal auto insurance policy. Does it offer rental car
                coverage? Check your credit card benefits. Some cards offer
                rental car insurance as a perk. Be aware of location-specific
                requirements. Some countries or states may have mandatory
                insurance coverage. By choosing Snap Car Rental insurance, you
                can relax and enjoy the ride, knowing you're covered! */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
