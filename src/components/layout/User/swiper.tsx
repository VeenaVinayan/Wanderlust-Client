import { useState, useEffect } from 'react';

type TCategoryValue = {
  _id: string;
  name: string;
  image: string;
};

type Props = {
  categories: TCategoryValue[];
  handleThemeSearch: (id: string) => void;
};

export default function CategoryCarousel({ categories, handleThemeSearch }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  // Optional auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="overflow-hidden rounded-lg shadow-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="min-w-full cursor-pointer"
              onClick={() => handleThemeSearch(category._id)}
            >
              <div className="relative w-full h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center p-4">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2"
      >
        ›
      </button>
    </div>
  );
}
