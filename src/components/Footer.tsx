const Footer = () => (
  <footer className="bg-white dark:bg-gray-800">
    <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
      <div className="text-center">
        <span className="block text-sm text-center text-gray-500 dark:text-gray-400">
          NextPay &copy; {new Date().getFullYear()}
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
