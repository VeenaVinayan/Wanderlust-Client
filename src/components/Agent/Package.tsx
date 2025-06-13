import React , {useEffect, useState  }from 'react';
import { PlusCircle } from 'lucide-react';
import AddPackage from './AddPackage';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../../components/common/Table';
import { TPackage } from '../../types/packageTypes';
import { Ban, Edit } from 'lucide-react';
import { PackageColumn } from '../../Constants/User';
import  useSweetAlert  from '../../hooks/CustomHooks/SweetAlert';
import { agentDeletePackage, getPackages } from '../../services/Agent/PackageService';
import { toast } from 'react-toastify';
import Pagination from '../../components/layout/Shared/Pagination';
import { PER_PAGE } from '../../Constants/User';
import {  packageValidationSchema } from '../../Validations/PackageRegister';
import SearchFilter from '../layout/Shared/SearchFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store'; 

 const Package : React.FC= () => {
   const [ currentPage, setCurrentPage] = useState(1);
   const [isCreate, setIsCreate] = useState<boolean>(false); 
   const [packages , setPackages ] = useState<TPackage []>([]);
   const [ count , setCount ] = useState<number>(0);
   const [ filters, setFilters] = useState({keyword:'',sortOrder:''});
   const navigate = useNavigate();
   const { showConfirm } = useSweetAlert();
   const agent = useSelector((state:RootState) => state.agentSliceData);
   const handlePage = async (page: number) =>{
    setCurrentPage(page);
   }
   useEffect(() =>{
         const fetchPackages = async (page :number) =>{
             const data = await getPackages(agent.id,{
                page,
                perPage:PER_PAGE,
                search: filters.keyword,
                sortBy: 'name',
                sortOrder: filters.sortOrder,
            });
             if(data){
              console.log('Packages ::',data);
              setPackages(data.packages);
              setCount(data.totalCount);
             }
          }
         fetchPackages(currentPage);
   },[currentPage,filters]);

   const handleDelete = async (packageData: TPackage) =>{
     if(packageData._id){
      const response = await agentDeletePackage(packageData._id);
       if(response){
          toast.success("Successfully delete package !");
          packageData.status = !packageData.status;
        //  dispatch(updatePackageInStore(packageData));
       }else{
         toast.error("Delete not working properly !!");
       }
     }
  }

   const handleEdit = (packages : TPackage) =>{
     console.log('Handle Edit ::', packages);
     navigate('/agent/agentDashboard/editPackage',{state:packages});
   }
   return (
   <>
   <div className="bg-white p-5 shadow-lg rounded-xl min-h-[300px] flex flex-col">
    <div className="flex justify-between items-center mb-4">
     <Link to="/agent/agentDashboard/addPackage">
        <button
          className="relative flex items-center gap-2 p-3 text-lg font-semibold transition-all duration-300 bg-black rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-700"
          onClick={() => setIsCreate(true)}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
             CREATE
          </span>
          <PlusCircle size={20} color={"white"} />
        </button>
      </Link>
    </div>
 
    {isCreate && (
      <div className="mb-6">
          <AddPackage />
      </div>
    )}

  { packages.length > 0 ? ( 
    <>
    <SearchFilter onFilterChange={setFilters} /> 
     <div className="overflow-x-auto">
      <Table<TPackage>
        data={packages}
        columns={PackageColumn}
        role={"Packages"}
        renderActions={(value) => (
          <div className="flex gap-2">
            <button
              onClick={() => showConfirm("Delete Package |","Do you want to Delete package ?",()=> handleDelete(value))}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition flex items-center gap-1"
            >
              <Ban color={'white'} size={12} />
            </button>
            <button
              onClick={() => showConfirm("Edit package !"," Do you want to Edit Package ?",() => handleEdit(value))}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 focus:ring-2 transition flex items-center gap-1"
            >
              <Edit color={'white'} size={12} />
            </button>
          </div>
        )}
      />
       <div className="flex justify-center mt-6"> 
        <Pagination 
              perPage={PER_PAGE}
              length={count || 1}
              handlePage={handlePage}
        />
      </div> 
    </div> 
    </> 
      ): (
           <div className="flex items-center justify-center h-60 bg-gray-50 rounded-xl shadow-inner">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide">
                🚫 No Package is Available
               </h2>
            </div>
       )
    } 
  </div>
</>
 );
}
export default Package;
