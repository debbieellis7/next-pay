"use client";

// External dependencies
import { useUser, SignIn } from "@clerk/nextjs";

// Internal components
import AuthSpinner from "@/components/AuthSpinner";

export default function SignInPage() {
  const { isLoaded } = useUser();

  return (
    <main className="flex justify-center items-start mt-16">
      <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-28">
        {!isLoaded && <AuthSpinner />}
        <SignIn />
      </div>
    </main>
  );
}
