import React,{ useEffect , useState} from 'react'
import { useSelector } from 'react-redux' ;
import { RootState } from '../../app/store';
import Table from '../../components/common/Table';
import Pagination from '../../components/layout/Shared/Pagination';
import SearchFilter from '../layout/Shared/SearchFilter';
import { PER_PAGE, BookingAgentData } from '../../Constants/User';
import { getBookingData } from '../../services/Agent/BookingService';
import { TBookingResponse } from '../../types/bookingTypes';
import { useNavigate } from 'react-router-dom';
import { TBookingAgentResponse } from '../../types/bookingTypes';

const BookingData : React.FC= () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ filters, setFilters] = useState({keyword:'',sortOrder:''})
    const [ count, setCount ] = useState<number>(0);
    const agent = useSelector((state:RootState) => state.agentSliceData);
    const [ bookingData, setBookingData ] = useState<TBookingAgentResponse []>([]);

    const handlePage = ( page: number) =>{
        setCurrentPage(page);
    }
    const navigate = useNavigate();
    useEffect( () =>{
         const fetchData = async(page: number) =>{
         const data = await getBookingData(agent.id,{
              page,
              perPage:PER_PAGE,
              search:filters.keyword,
              sortBy:'tripDate',
              sortOrder:filters.sortOrder, 
         });  
         if(data){
            setBookingData(data.data);
            console.log('Booking Data ::',bookingData);
            setCount(data.totalCount);
        }
      }  
       fetchData(currentPage);
    },[currentPage,filters]) 

  return (
    <>
       
        { bookingData.length > 0 ? (
            <>
            <SearchFilter onFilterChange={setFilters} />
              <Table <TBookingAgentResponse>
                data={bookingData}
                columns={BookingAgentData}
                role={'Booking Data'}
                renderActions ={(value) => (
                  <> 
                      <button 
                          onClick={() => navigate('/agent/agentDashboard/bookingPackage',{state:value.bookings[0].packageId})}
                          className='bg-gray-700 text-white px-5 rounded-lg font-semibold shadow-md hover:bg-slate-500 focus:ring-2 transition flex-row' >
                        View 
                      </button>
                  </>
                )}
             />
             <div>
                 <Pagination 
                        perPage={PER_PAGE}
                        length={ count || 1}
                        handlePage= {handlePage}
                  />      
             </div>
            </>
        ):(
            <div className="flex items-center justify-center h-60 bg-gray-50 rounded-xl shadow-inner">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 tracking-wide">
                🚫 No Booking Data Available
               </h2>
            </div>
        )}
    </>
  )
}

export default BookingData
