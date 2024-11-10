// External dependencies
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";

// Internal components
import AuthSpinner from "@/components/AuthSpinner";

export default async function SignInPage() {
  const { userId } = await auth();

  return (
    <main className="flex justify-center items-start mt-16">
      <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-28">
        {userId ? (
          <AuthSpinner />
        ) : (
          <SignIn
            fallbackRedirectUrl={
              process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
            }
          />
        )}
      </div>
    </main>
  );
}
