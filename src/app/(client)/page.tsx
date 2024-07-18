import InsuranceActionBanner from "~/components/common/insurance-action-banner";
import Hero from "~/components/pages/home/hero";
import HowItWorks from "~/components/pages/home/how-it-works";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Hero />
      <InsuranceActionBanner />
      <HowItWorks />
    </HydrateClient>
  );
}
