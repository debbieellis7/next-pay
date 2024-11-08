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

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  // Check if the path is '/', '/sign-up', or '/sign-in'
  const hideHeaderFooter =
    pathname === "/" || pathname === "/sign-up" || pathname === "/sign-in";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
