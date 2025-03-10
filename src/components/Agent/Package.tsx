import React , {useState  }from 'react'
import { PlusCircle } from 'lucide-react';
import AddPackage from './AddPackage';
import { Link} from 'react-router-dom';

const Package : React.FC= () => {
   const [isCreate, setIsCreate] = useState<boolean>(false); 
   return (
    <>
        <div className="bg-white p-6 shadow-lg rounded-xl h-64 flex items-center ">
          <Link to="/agent/agentDashboard/addPackage" >
          <button className="relative flex items-center gap-1 p-3 text-lg font-semibold transition-all duration-300 bg-black rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-700"
                  onClick={() => setIsCreate(true)}
          >
            <PlusCircle size={20} color={"white"} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
               CREATE PACKAGE
            </span>
         </button>
         </Link>
         <div className="mt-6">
         { isCreate && 
          < AddPackage  />
         }
      </div>
        </div>
      
    </>
    // <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
    // <div className="mt-6 bg-white p-6 shadow-lg rounded-xl text-center">
    //   <h1 className="text-2xl font-bold mb-4">Packages</h1>
    //   <button
    //     className="relative flex items-center gap-3 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-black rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-700"
    //   >
    //     <PlusCircle size={20} color={"white"} />
    //     <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
    //       CREATE PACKAGE
    //     </span>
    //   </button>
    // </div>
    // </div>
  )
}

export default Package
