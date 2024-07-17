import Footer from "../ui/footer";
import Navbar from "../ui/navbar";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="h-screen">{children}</main>
      <Footer />
    </>
  );
}
