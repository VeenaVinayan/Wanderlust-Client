// import React ,{ useEffect , useState } from 'react'
// import { PER_PAGE } from '../../Constants/User';
// import Pagination from '../../components/layout/Shared/Pagination';
// import SearchFilter  from '../layout/Shared/SearchFilter';
// import { toast } from 'react-toastify';
// import { TAgentPackage } from '../../types/packageTypes';
// import Table from '../../components/common/Table';
// import { AgentPackage } from '../../Constants/User';
// import { getAgentPackages } from '../../services/Admin/Dashboard';

// const AgentPackages: React.FC = () => {
//    const [ currentPage, setCurrentPage] = useState(1);
//    const [ data, setData] = useState<TAgentPackage[]>([]); 
//    const [ filters , setFilters ] = useState({keyword:'',sortOrder: ''});
//    const [ count ,setCount ] = useState(0);
  
//    useEffect(() =>{
//         (async () => {
//             try{
//                 const data : TAgentPackage = await getAgentPackages({
//                     page : currentPage,
//                     perPage: PER_PAGE,
//                     search: filters.keyword,
//                     sortBy:'agent',
//                     sortOrder: filters.sortOrder,
//                 });
//                 setData(data.data);
//                 setCount(data.totalCount);
//             }catch(err){
//                 toast.error(`Error is ${err}`);
//             }
//         })();
//    },[]); 
//    const handlePage = (page : number) =>{
//       setCurrentPage(page);
//    }
//   return(
//     <>
//       <SearchFilter onFilterChange ={setFilters} />
//       {
//          data && data.length>0 ? ( 
//             <>
//             <Table <TAgentPackage>
//               data = {data}
//               column={AgentPackage}
//               role={' Agent Packages'}
//             />  
//             <div className="flex justify-center mt-6">
//               <Pagination 
//                 perPage={PER_PAGE}
//                 length={count || 1}
//                 handlePage={handlePage}
//                 currentPage={currentPage}
//                /> 
//             </div>
//             </>
//          ) :(
//              <p className='text-gray-600 '> No Agent packages found </p>
//          )
//       }
      
//     </>
//   )
// }

// export default AgentPackages

