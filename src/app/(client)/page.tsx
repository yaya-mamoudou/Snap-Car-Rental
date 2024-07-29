import InsuranceActionBanner from "~/components/common/insurance-action-banner";
import CarCollection from "~/components/pages/home/car-collection";
import Deals from "~/components/pages/home/deals";
import FrequentlyAskedQuestions from "~/components/pages/home/frequently-asked-questions";
import Hero from "~/components/pages/home/hero";
import HowItWorks from "~/components/pages/home/how-it-works";
import Insurance from "~/components/pages/home/insurance";
import OurFleet from "~/components/pages/home/our-fleet";
import Promotions from "~/components/pages/home/promotions";
import TrustedBy from "~/components/pages/home/trusted-by";
import WhyChooseUs from "~/components/pages/home/why-choose-us";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Hero />
      <InsuranceActionBanner />
      <HowItWorks />
      <OurFleet />
      <WhyChooseUs />
      <TrustedBy />
      {/* <Promotions /> */}
      {/* <Insurance /> */}
      <FrequentlyAskedQuestions />
      <Deals />
      {/* <CarCollection /> */}
    </HydrateClient>
  );
}
