// External dependencies
import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

// Assets
import logo from "@/assets/logo.svg";

const Header = () => (
  <header className="fixed w-full">
    <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center">
            <Image src={logo} className="h-6 mr-3 sm:h-9" alt="NextPay logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              NextPay
            </span>
          </Link>
          <SignedIn>
            <span className="text-slate-300">/</span>
            <span className="-ml-2">
              <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
            </span>
          </SignedIn>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  </header>
);

export default Header;
