import React from 'react'
import { Link } from 'react-router-dom';

const Footer:React.FC = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Wanderlust</h3>
            <p className="text-gray-400">
              Creating unforgettable travel experiences since 2010.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-400 hover:text-white"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-white">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p>123 Travel Lane</p>
              <p>Adventure City, AC 12345</p>
              <p>Email: wanderlust3603@gmail.com</p>
            </address>
          </div>

          <div>
            <h4 className="font-bold mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Get special offers and travel inspiration.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-black rounded-l focus:outline-none"
              />
              <button className="px-4 py-2 bg-yellow-500 text-black rounded-r">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer
