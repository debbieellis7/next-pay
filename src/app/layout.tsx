// External dependencies
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

// Internal components
import ConditionalLayout from "@/components/ConditionalLayout";

// Styles
import "./globals.css";

export const metadata: Metadata = {
  title: "NextPay | Secure, Scalable, and Efficient Billing",
  description:
    "Streamline your invoicing process with NextPay, a Next.js application featuring secure login, database reliability, email automation, and easy payment handling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased flex flex-col min-h-screen">
          <ConditionalLayout>{children}</ConditionalLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
