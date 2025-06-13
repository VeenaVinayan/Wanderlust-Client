import React, { useState , useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../common/Table';
import { BookingColumn, PER_PAGE} from '../../Constants/User';
import { TBookingResponse } from '../../types/bookingTypes';
import { getPackageBooking} from '../../services/Agent/BookingService';
import  Pagination from '../layout/Shared/Pagination';
import SearchFilter from '../layout/Shared/SearchFilter';

const BookingPackageData: React.FC = () => {
    const [bookings, setBooking] = useState<TBookingResponse []>([]);
    const [count, setCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const packageId = location.state;
    console.log('Package Id ::',packageId);
    const navigate = useNavigate();
    const [ filters, setFilters] = useState({keyword:'',sortOrder:''});

    const handlePage =( page : number) =>{
          setCurrentPage(page)
    }
    useEffect(() => {
        const fetchData = async (page : number,packageId : string) => {
              const response  = await getPackageBooking(packageId,{
                 page,
                 perPage: PER_PAGE,
                 search: filters.keyword,
                 sortBy:'tripDate',
                 sortOrder: filters.sortOrder,
              });
              console.log('Pacakge data is ::',response);
              if(response){
                  setBooking(response.data.data);
                  setCount(response.data.totalCount)
              }
        } 
        fetchData(currentPage,packageId);
   }, [packageId,filters,currentPage]);
   return(
    <>
     { bookings.length > 0 ? ( 
       <> 
       <SearchFilter onFilterChange={setFilters} />
        <Table <TBookingValue>
            data = {bookings}
            columns = {BookingColumn}
            role = {bookings[0]?.packageName}
            renderActions={(value) =>(
                <>
                    <button 
                        onClick={() => navigate('/agent/agentDashboard/bookingView',{state:value})}
                        className='bg-gray-700 text-white px-5 rounded-lg font-semibold shadow-md hover:bg-slate-500 focus:ring-2 transition flex-row' >
                        View 
                    </button>
                </>
            )}
        /> 
          <div className='flex justify-center mt-4'>
            <Pagination 
                perPage={PER_PAGE}
                length ={ count || 1}
                handlePage={handlePage}
            />
          </div>  
        </> 
        ):(
            <div className="flex items-center justify-center h-60 bg-gray-50 rounded-xl shadow-inner">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 tracking-wide">
                🚫 No Booking Data Available
               </h2>
            </div>
        ) 
     } 
    </>
  )
}

export default BookingPackageData

