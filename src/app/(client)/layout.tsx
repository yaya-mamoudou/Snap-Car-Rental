import ClientLayout from "~/components/layouts/client-layout";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ClientLayout>{children}</ClientLayout>;
}
