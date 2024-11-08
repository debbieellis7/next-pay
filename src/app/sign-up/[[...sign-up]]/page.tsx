// External dependencies
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex-grow">
      <div className="max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:pt-28">
        <SignUp />
      </div>
    </main>
  );
};

export default SignUpPage;
