import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-center items-center">
        <p className="text-sm">NextPay &copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
};

export default Footer;
