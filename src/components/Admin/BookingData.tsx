import React ,{ useState, useEffect} from 'react'
import Table from  '../common/Table';
import SearchFilter from '../layout/Shared/SearchFilter';
import { TBookingResponse } from '../../types/bookingTypes';
import { useNavigate } from 'react-router-dom';
import { BookingColumn } from '../../Constants/User';
import Pagination from '../../components/layout/Shared/Pagination';
import { getBookingDataToAdmin } from '../../services/Booking/BookingService';
import { PER_PAGE } from '../../Constants/User';
const BookingData :React.FC = () => {
  const  [ currentPage, setCurrentPage ] = useState(1);
  const [ booking, setBooking ] = useState([]);
  const [count, setCount] = useState<number>(0)
  const [ filters, setFilters] = useState({keyword:'',sortOrder:''});
  const navigate = useNavigate();
  
  const handlePage = (page : number) =>{
      setCurrentPage(page);
  }
  useEffect(() =>{
        const fetchData = async(page:number) =>{
           const data = await getBookingDataToAdmin({
               page,
               perPage: PER_PAGE,
               search:filters.keyword,
               sortBy:'tripDate',
               sortOrder:filters.sortOrder,
            })
           if(data){
             setBooking(data.data);
             setCount(data.totalCount);
          }
     }  
     fetchData(currentPage);
  },[currentPage,filters]);

  return(
   <>
      { booking.length > 0 ? ( 
       <>
        <SearchFilter onFilterChange={setFilters} />
        <Table <TBookingResponse>
          data={booking}
          columns={BookingColumn}
          role={'Booking Data'}
          renderActions={(value) => (
             <>
                <button 
                    onClick={() => navigate('/admin/adminDashboard/bookingView',{state:value})}
                    className='bg-gray-700 text-white px-5 rounded-lg font-semibold shadow-md hover:bg-slate-500 focus:ring-2 transition flex-row' >
                  View
                </button>
             </>
          )}
        />
        <div>
          <Pagination 
                  perPage={PER_PAGE}
                  length={count || 1}
                  handlePage = {handlePage}
          />      
        </div>
      </>
      ):(
        <h2 className='text-3xl font-bold text-center text-gray-600 my-4'>
           No Booking data avilable !!
       </h2>
      )
    }
   </>
  )
}
export default BookingData;

