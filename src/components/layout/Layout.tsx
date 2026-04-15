import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

interface LayoutProps {
  showNavbar?: boolean;
}

export default function Layout({ showNavbar = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {showNavbar && <Navbar />}
      <main className="mx-auto w-full max-w-5xl flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}