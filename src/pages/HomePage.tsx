import { Link , useNavigate } from "react-router-dom";
import React , { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination ,Autoplay, EffectCoverflow} from "swiper/modules";
import { getCategories } from "../services/User/UserServices";
import { TCategoryValue } from '../types/userTypes';
import { fetchPackages } from "../features/authentication/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../app/store';
import { HeartIcon} from 'lucide-react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../css/video.css";
import { TPackage } from "../types/packageTypes";
import Header from '../components/layout/Shared/Header';
import { addToWishlist } from "../services/User/UserServices";
import { toast } from 'react-toastify';

const HomePage : React.FC = () => {
const dispatch = useDispatch<AppDispatch>();  
const [ categories, setCategories ] = useState<TCategoryValue[]>([]);
const { packages, status, error } = useSelector((state: RootState) => state.packages);
const user = useSelector(( state: RootState) => state.userData);
const navigate = useNavigate();

 useEffect (() =>{
    const fetchAllCategory = async () =>{
      const data = await getCategories();
      setCategories(data);
    } 
      fetchAllCategory(); 
      dispatch(fetchPackages());
  }, []);

if(status ==='loading') return <p>Loading...</p>
if(status === 'failed') return <p>Error ...{error}</p>

const handleWishlist = async (packageId : string) => {
   console.log('Wishlist !!',packageId);
   if(user.isAuthenticated){
   const res = await addToWishlist(user.id,packageId);
   if(res) toast.success(res);
   else toast.error('Not successfully added To Wishlist !!');
   }else{
      toast.info("Please sign in to add items to your wishlist.");
      navigate(`/login?redirectBack=${encodeURIComponent(location.pathname)}`);
      return;
   }
  }

const handleThemeSearch = (categoryId : string) =>{
   console.log("Category search",categoryId);
   navigate("/user/search",{state:categoryId});
}
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
   <section className="flex flex-col mt-20 md:flex-row items-center justify-center mx-10 md:mx-16 px-6 py-16 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl shadow-lg">
   <div className="w-full md:w-1/2 flex justify-center">
    <img
      src="/images/travelImage.jpg"
      alt="Travel Adventure"
      className="w-80 h-80 md:w-96 md:h-96 rounded-2xl shadow-xl transition-transform duration-500 hover:scale-110"
    />
  </div>

  <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 px-6">
    <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-800 via-pink-700 to-red-800 bg-clip-text text-transparent">
      "Travel makes one modest, you see what a tiny place you occupy in the world."
    </h2>
    <p className="mt-6 text-gray-700 text-lg md:text-xl leading-relaxed">
      Discover breathtaking destinations and unforgettable experiences with us.  
      Step out of your comfort zone and explore the wonders of the world!
    </p>
    <Link 
          to="/user/search"
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-800 via-pink-700 to-red-800 
             text-white text-lg font-semibold rounded-xl shadow-md hover:bg-blue-700 
             hover:shadow-lg transition-all inline-block text-center"
    >
           Explore Now
    </Link>
  </div>
</section>
<section className="py-16 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Explore Destinations by Theme!
      </h2>

 <Swiper
  modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
  spaceBetween={10}
  slidesPerView={4}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  loop={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  coverflowEffect={{
    rotate: 30,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  navigation
  pagination={{ clickable: true }}
  className="p-4"
>
  {categories.map((category: TCategoryValue) => (
    <SwiperSlide key={category._id} className="flex justify-center"
                 onClick={()=> handleThemeSearch(category._id)} >
      <div className="relative bg-white shadow-xl rounded-lg overflow-hidden w-72 backdrop-blur-lg" >
        {/* Image Section with Overlay */}
        <div className="relative">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Text Section */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h3 className="text-lg font-bold">{category.name}</h3>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

</div>
</section>
<section className="py-16 px-6">
  <div className="max-w-7xl mx-auto">
   <h2 className="text-3xl font-bold text-center  mb-12">
              Explore  Packages Here!
   </h2>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
  {packages.map((pkg: TPackage) => (
    <div
      key={pkg.id}
      className="relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative"
      >
        <img
          src={pkg.images[0] as string}
          alt={pkg.name}
          className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 hover:brightness-90"
        />

        {/* Heart Icon in top-right */}
        <div 
             className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-200 transition"
             onClick={() => handleWishlist(pkg._id)}>
          <HeartIcon size={24} className="text-red-500" />
        </div>
       {/* Gradient Overlay at the bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col items-center"
           onClick={()=> navigate('/user/packageDetails',{state:pkg})}
        >
          <h3 className="text-lg font-semibold text-white text-center">{pkg.name}</h3>
       </div>
       </div> 
      <div>
      <p className="text-sm text-gray-700 text-center">
          {pkg.description.split(' ').slice(0, 10).join(' ')}...</p>
      <p className="text-lg font-bold text-center text-yellow-400 mt-1">{'\u20B9'}{pkg.price}</p>
     </div>
   
    </div>
  ))}
</div>
</div>
</section>
     {/* Footer */}
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
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@wanderlust.com</p>
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
    </div>
  );
}
export default HomePage;
