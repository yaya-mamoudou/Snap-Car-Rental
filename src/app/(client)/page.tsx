import Button from "~/components/common/button";
import SnapCarLogoIcon from "~/components/icons/snap-car-logo";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen"></main>
    </HydrateClient>
  );
}
