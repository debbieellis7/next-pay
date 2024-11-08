// External dependencies
import Link from "next/link";
import Image from "next/image";
import { PersonIcon } from "@radix-ui/react-icons";

// Assets
import logo from "@/assets/logo.svg";

const Hero = () => (
  <main className="flex-grow">
    <div className="max-w-screen-xl bg-white dark:bg-gray-900 px-4 py-16 mx-auto text-center">
      <div className="mb-8">
        <Image
          src={logo}
          width={56}
          height={56}
          className="mx-auto sm:w-10 sm:h-10 lg:w-14 lg:h-14"
          alt="NextPay logo"
        />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
        NextPay
      </h1>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl dark:text-white">
        Effortless Invoicing, Seamless Payments
      </h2>
      <p className="mb-6 font-light text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">
        Create and send invoices with ease, track payments, and stay on top of
        your finances in one powerful tool. NextPay simplifies your billing
        process so you can focus on growing your business.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <PersonIcon className="mr-2" />
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <PersonIcon className="mr-2" />
          Sign Up
        </Link>
      </div>
    </div>
  </main>
);

export default Hero;
