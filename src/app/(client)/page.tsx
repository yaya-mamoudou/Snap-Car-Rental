import Button from "~/components/common/button";
import InsuranceActionBanner from "~/components/common/insurance-action-banner";
import SnapCarLogoIcon from "~/components/icons/snap-car-logo";
import Hero from "~/components/pages/home/hero";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Hero />
      <InsuranceActionBanner />
    </HydrateClient>
  );
}
