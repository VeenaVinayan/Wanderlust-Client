import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto justify-around grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Wanderlust</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Creating unforgettable travel experiences since 2024.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <address className="not-italic text-sm text-gray-400">
            <p>Kochi, Kerala</p>
            <p>Email: <a href="mailto:info@wanderlust.com" className="hover:text-white">info@wanderlust.com</a></p>
            <p className="mt-2">Phone: <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a></p>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
