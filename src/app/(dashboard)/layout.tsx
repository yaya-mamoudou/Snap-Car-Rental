import Navbar from "~/components/common/navigation/navbar";
import SidebarComponent from "~/components/common/navigation/sidebar";
import DashboardLayout from "~/components/layouts/dashboard-layout";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DashboardLayout
      topComponent={<Navbar />}
      bodyClassName="px-6 2xl:px-16"
      className="bg-[#f2f2f2]"
      sideComponent={<SidebarComponent />}
    >
      <main>
        <div className="relative min-h-[100vh]">
          <div className="size-full overflow-hidden">
            {/* <Image
              alt="car_texture"
              src="/images/car_texture_black.webp"
              width={500}
              height={300}
              className="pointer-events-none absolute -left-20 bottom-0 h-[80%] w-2/3 object-contain object-left opacity-50"
            /> */}
          </div>
          <div className="min-h-[inherit]">{children}</div>
        </div>
      </main>
    </DashboardLayout>
  );
}
