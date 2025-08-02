import React , {useState, useEffect } from 'react'
import Table from '../../components/common/Table';
import { User} from '../../types/userTypes' ;
import { fetchData  } from '../../services/Admin/Dashboard';
import useBlockActions from '../../hooks/CustomHooks/useBlockActions';
import { Columns } from '../../Constants/User';
import { Ban } from 'lucide-react';
import Pagination from "../layout/Shared/Pagination";
import { PER_PAGE } from "../../Constants/User";
import SearchFilter from '../layout/Shared/SearchFilter';

const Users : React.FC = () => {
 const [ userData, setUserData ] = useState<User []>([]); 
 const { handleBlock} = useBlockActions();
 const [count, setCount] = useState<number>(0); 
 const [ currentPage, setCurrentPage] = useState(1);
 const [filters, setFilters] = useState({ keyword: '', sortOrder: '' });

 useEffect(() =>{
     getUserData(currentPage);
 },[currentPage,filters]); 
   
   const getUserData  = async (page:number) =>{
    const data  =  await fetchData("User",page,{
       page,
       perPage : PER_PAGE,
       search : filters.keyword,
       sortBy:'name',
       sortOrder: filters.sortOrder,
    });
    console.log('In User Page !!',data);
    if(data){
        setUserData(data.data);
        setCount(data.totalCount);
    }else{
       setUserData([]);
     }
    }
    const handleBlockUser = async (userId: string,role :string) => {
      await handleBlock(userId, role, () => {
        setUserData((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: !user.status } : user
          )
        );
      });
    };
  const handlePage = async (page :number)=> {
    setCurrentPage(page);
 } 
  return (
    <>
       <SearchFilter onFilterChange={setFilters} />
       { userData.length >0 ? ( 
        <> 
        <Table<User>
                data={userData} 
                columns={Columns}
                role={"User"} 
                renderActions={(user) => (
                     <>
                        <button 
                          onClick={ () => handleBlockUser(user._id,"User")}
                          className="bg-red-400 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-red-500 focus:ring-2 focus:ring-red-400 transition flex-row"
                        >
                          <Ban color={'white'} size={10} />
                        </button>
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
        ):(
        <h2 className='text-3xl font-bold text-center text-blue-600 my-4'> No user avilable </h2>
       )
     }
    </>
  )
}

export default Users;
