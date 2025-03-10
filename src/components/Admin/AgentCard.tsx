import React , { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { approveAgent } from "../../services/Admin/Dashboard";
import { toast } from "react-toastify";
import { X } from 'lucide-react';

interface Agent {
  _id:string;  
  name: string;
  email: string;
  phone: string;
  address?: string;
  license: string;
}

const AgentCard: React.FC<{ agent: Agent }> = () => {
    const [isOpen, setIsOpen ] = useState<boolean>(false);
    const [agent, setAgent] = useState<Agent>({
          _id:'',
          name:'',
          email:'',
          phone:'',
          address:'',
          license:''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const toggleModal = () =>{
         setIsOpen(true);
    }
    useEffect(() =>{
        if(location.state){
             setAgent(location.state);
             console.log("Agent Data in Card ::", location.state);
        }
    },[location.state]);

    const verifyAgent = async () =>{
         const respone = await approveAgent(agent._id);
         if(respone){
              toast.success(respone.message);
               navigate('/admin/adminDashboard');
         }else{
             toast.error(respone.message);
         }
    }
    const rejectRequest = async () =>{
        const respone = await rejectAgentRequest(agent._id);
        if(respone){
             toast.success(respone.message);
              navigate('/admin/adminDashboard/verification');
        }else{
            toast.error(respone.message);
        }
    }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl border border-gray-300 p-6 flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-2/3 flex flex-col justify-center p-6">
        <h2 className="text-3xl font-bold text-gray-800">{agent.name}</h2>
        <p className="text-gray-700 text-lg mt-2">
          📧 <span className="font-medium">{agent.email}</span>
        </p>
        <p className="text-gray-700 text-lg mt-2">
          📞 <span className="font-medium">{agent.phone}</span>
        </p>
        <p className="text-gray-700 text-lg mt-2">
          📍 <span className="font-medium">{agent?.address}</span>
        </p>
      <div className="flex space-x-3 p-4">
        <button 
                 className="px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-md hover:bg-green-900 transition shadow"
                 onClick={verifyAgent}
                 >
              ✅ Verify
        </button>
        <button 
                className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 transition shadow"
                onClick={rejectRequest}
             >
              ❌ Reject
          </button>
        <button 
                 className="px-4 py-2 bg-gray-500 text-white text-sm font-semibold rounded-md hover:bg-gray-600 transition shadow"
                 onClick={()=> navigate('/admin/adminDashboard/verification')}>
               🔄 Cancel
         </button>
      </div>
    </div>

      <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          src={agent.license}
          alt="License"
          onClick={toggleModal}
          className="w-96 h-64 object-cover rounded-lg border border-gray-400 shadow-md"
        />
      </div>
      { isOpen && 
         ( 
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative max-w-4xl p-4">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                  <X size={30} />
                </button>
                <img
                  src={agent.license}
                  alt="License"
                  className="w-auto h-auto max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
      
    </div>
  );
};

export default AgentCard;
