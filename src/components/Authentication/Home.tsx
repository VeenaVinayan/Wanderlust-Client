import React from "react";
import Navbar from "../layout/Navbar";
import Footer from '../layout/Footer';
const HomePage: React.FC = () => {
  return (
    
    <div className="bg-gray-50">
      <Navbar />
       <header className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/travel.jpg')" }}>
        <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">Explore the World with Ease</h1>
            <p className="text-lg mb-8">Find the best deals on flights, hotels, and tours for your next adventure.</p>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search your destination..."
                className="px-4 py-3 w-80 rounded-l-md focus:outline-none"
              />
              <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-r-md hover:bg-indigo-500">
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
     <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
          {["Paris", "Bali", "Tokyo", "New York", "Sydney", "Dubai"].map((city) => (
            <div
              key={city}
              className="relative overflow-hidden rounded-lg shadow-lg group transform hover:scale-105 transition"
            >
              <img src={`/images/${city.toLowerCase()}.jpg`} alt={city} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{city}</h3>
                  <p className="text-sm">Discover the beauty of {city}.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="flex overflow-x-scroll space-x-6 px-8">
          {[1, 2, 3].map((review) => (
            <div key={review} className="min-w-[300px] bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 italic">"Amazing experience! Everything was so smooth and organized."</p>
              <p className="text-gray-500 mt-4">- Happy Traveler</p>
            </div>
          ))}
        </div>
      </section>
     <Footer /> 
    </div>
  );
};

export default HomePage;
