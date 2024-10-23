import { SignUp } from "@clerk/nextjs";
import Container from "@/components/Container";

const SignUpPage = () => {
  return (
    <Container className="flex justify-center">
      <SignUp />
    </Container>
  );
};

export default SignUpPage;
