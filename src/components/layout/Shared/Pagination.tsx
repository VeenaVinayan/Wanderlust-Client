import React ,{useMemo} from 'react';
import { PaginationProps } from '../../../Interfaces/Props';

const Pagination: React.FC <PaginationProps>= ({ perPage,length, handlePage}) => {

 const paginationNumber = useMemo(() => {
    return Array.from({ length: Math.ceil(length / perPage) }, (_, i) => i + 1);
  }, [length, perPage]);
  
  return (
    <> 
        <div className='flex justify-center gap-x-2 m-5'>
           { paginationNumber.map((pageNumber) => (
            <button className="px-3 py-2 border rouned-md shadow-sm bg-white hover:bg-gray-400 active:gray-600"
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



