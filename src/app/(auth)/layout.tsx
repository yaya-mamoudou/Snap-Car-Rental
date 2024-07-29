import Image from "next/image";
import ClientLayout from "~/components/layouts/client-layout";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientLayout>
      <div className="relative min-h-[100vh]">
        <div className="size-full overflow-hidden">
          <Image
            alt="car_texture"
            src="/images/car_texture_black.webp"
            width={500}
            height={300}
            className="absolute pointer-events-none -left-20 bottom-0 h-[80%] w-2/3 object-contain object-left opacity-50"
          />
        </div>
        <div className="min-h-[inherit] bg-primary/90">{children}</div>
      </div>
    </ClientLayout>
  );
}
