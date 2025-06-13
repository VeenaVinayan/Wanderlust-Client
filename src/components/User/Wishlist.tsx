import React , { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getWishlist } from '../../services/User/UserServices';
import { TPackageResponse } from '../../types/packageTypes';
import { useNavigate } from 'react-router-dom';
import { deleteWishlist } from '../../services/User/UserServices';
import { toast } from 'react-toastify';
import { Info } from 'lucide-react';

const Wishlist : React.FC = () => {
  const user = useSelector(( state: RootState) => state.userData); 
  const [ wishlist ,setWishlist] = useState<TPackageResponse[]>([]); 
  const navigate = useNavigate();

  useEffect(() =>{
       const fetchData = async () =>{
            const data = await getWishlist(user.id);
            setWishlist(data);
       }
       fetchData();
  },[]); 

  const handleDelete =  async (id : string) =>{
     console.log('Delete !',id);
     const data = await deleteWishlist(id);
     if(data){
         toast.success(data);
         const updated  =  wishlist.filter(value => id !=value._id ); 
         setWishlist(updated);   
       }
     else toast.error(data);
  }
  return (
    <div className='m-5'>
     <h2 className="font-bold text-gray-700">Wishlist !!</h2>
      { wishlist.length > 0 ? (
        wishlist.map((item) => (
         <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-lg transition-shadow duration-300 flex flex-row overflow-hidden">
          <img
            src={item.packageId.images[0]}
            alt={item.packageId.name}
            className="w-56 h-48 object-cover rounded-l-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4 flex flex-col flex-grow justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.packageId.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.packageId.day} Days/{item.packageId.night} Nights
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-yellow-500 font-semibold text-sm">
                  ⭐ {item.packageId.rating}
                </span>
                <span className="text-green-600 font-bold text-sm">
                  ₹{item.packageId.price}
                </span>
              </div>
            </div>
        
            {/* Buttons */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => navigate('/user/packageDetails', { state: item.packageId})}
                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition text-sm font-medium shadow-sm"
              >
                View Details
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700 text-xl transition-transform transform hover:scale-110"
                title="Remove from Wishlist"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
        
       ))
  ) : (
  <div className="flex flex-col items-center justify-center border border-dashed border-blue-300 bg-blue-50 text-blue-700 p-6 rounded-2xl shadow-sm mt-8">
      <Info className="w-10 h-10 mb-2 text-blue-500" />
      <h3 className="text-lg font-semibold">Wish List is empty</h3>
      <p className="text-sm text-blue-600 mt-1">There is no data to display right now.</p>
    </div>
)}
</div>
  )
}
export default Wishlist
