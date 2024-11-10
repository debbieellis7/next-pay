"use client";

// External dependencies
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Internal components
import Header from "./Header";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Check if the path is '/' or starts with '/sign-in' or '/sign-up'
  const hideHeaderFooter =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default ConditionalLayout;
