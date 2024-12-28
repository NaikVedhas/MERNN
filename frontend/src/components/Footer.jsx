const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2">Quick Links</p>
        <ul className="flex justify-center space-x-6">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/about" className="hover:underline">About</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
          <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
        </ul>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
