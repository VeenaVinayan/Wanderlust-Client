import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getBookingData } from '../../services/Booking/BookingService';
import Table from '../common/Table';
import { BookingColumn } from '../../Constants/User';
import { TBookingValue } from '../../types/bookingTypes';
import SearchFilter from '../layout/Shared/SearchFilter';
import Pagination from '../layout/Shared/Pagination';
import { PER_PAGE } from '../../Constants/User';
import { useNavigate } from 'react-router-dom';
 
const BookingData : React.FC = () => {
     const [ bookingData, setBookingData ] = useState([]);
     const [ filters, setFilters ] = useState({ keyword: '',sortBy:'', sortOrder: ''});
     const [ count, setCount ] = useState<number>(0);
     const [ currentPage, setCurrentPage] = useState(1);
     const navigate = useNavigate();
     const user = useSelector((state : RootState) => state.userData);
     const handlePage = (page : number) =>{
        setCurrentPage(page);
     }
    useEffect(() => {
      if (!user?.id) return; 
       const  fetchBookingData = async (userId: string, page: number) => {
       const data = await getBookingData(userId,{
          page,
          perPage: PER_PAGE,
          search: filters.keyword,
          sortBy: filters.sortOrder,
          sortOrder: filters.sortOrder,
        });
        if (data) {
          setBookingData(data.data);
          setCount(data.totalCount);
          console.log('Booking Data :', data);
        }
      };
      fetchBookingData(user.id, currentPage);
    }, [currentPage,filters]);
  return (
    <>
       <SearchFilter onFilterChange={setFilters}
                      values={['bookingId','tripDate','totalAmount','totalGuest']}
       />
       {bookingData.length > 0 ? (  
          <> 
            <Table<TBookingValue>
              data={bookingData}
              columns={BookingColumn}
              role={'Booking'}
              renderActions={(value) => (
                <>
                 <div className="flex items-center space-x-2">
                   <button 
                      className="text-gray-500 hover:text-gray-700 border"
                      onClick={() => navigate('/user/userProfile/bookingDetails',{state:value})}
                    >
                      View</button>
                 </div>
                </>
              )}
           />
            <div className="flex justify-center mt-6">
             <Pagination
              perPage={PER_PAGE}
              length={count || 1}
              handlePage={handlePage}
              currentPage={currentPage}
            />
          </div>
          </>
        ) : (
          <h2 className="text-3xl font-bold text-center text-gray-700 my-4">
             No user available
          </h2>   
        )}
    </>
  )
}

export default BookingData
