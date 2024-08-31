import Footer from "./home/footer";
import Navbar from "./home/navbar";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="h-24"></div> {/* This div acts as a spacer */}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
