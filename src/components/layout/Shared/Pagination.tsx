import React ,{useMemo} from 'react';
import { PaginationProps } from '../../../Interfaces/Props';

const Pagination: React.FC <PaginationProps>= ({ perPage,length, handlePage,currentPage}) => {

 const paginationNumber = useMemo(() => {
    return Array.from({ length: Math.ceil(length / perPage) }, (_, i) => i + 1);
  }, [length, perPage]);
  
  return (
    <> 
        <div className='flex justify-center gap-x-2 m-5'>
           { paginationNumber.map((pageNumber) => (
            <button className= {`w-10 h-10 mx-1 flex items-center justify-center rounded-full 
                text-sm font-medium transition-all duration-300 
                shadow-md border 
                ${
                  currentPage === pageNumber
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
                    key={pageNumber}
                    onClick={()=>handlePage(pageNumber)} >
                {pageNumber}
            </button>
           ))}
        </div>   
    </>
  )
}
 export default Pagination;



