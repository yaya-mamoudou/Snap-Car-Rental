import Button from "~/components/common/button";
import SnapCarLogoIcon from "~/components/icons/snap-car-logo";
import Hero from "~/components/pages/home/hero";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <Hero />
    </HydrateClient>
  );
}
