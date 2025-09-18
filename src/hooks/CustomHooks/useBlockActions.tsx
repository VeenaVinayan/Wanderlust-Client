import Swal from 'sweetalert2';
import { blockOrUnblock } from '../../services/Admin/Dashboard';
import { useState } from 'react';

const useBlockActions = () => {
  const [ loading, setLoading ] = useState(false);

  const handleBlock = async(id:string,role :string, onSuccess: () => void) =>{
       Swal.fire({
            title:"Are you sure to block the User ?",
            icon:"question",
            showCancelButton: true,
            confirmButtonText:"Block",
            cancelButtonText:'Cancel',
         }).then( async(result) =>{
            if(result.isConfirmed){
              try{
                   setLoading(true);
                   const res = await blockOrUnblock(id,role);
                   if(res){
                       onSuccess();
                       Swal.fire({
                       icon:"success",
                       title:"Successfully completed !",
                       timer:1000,
                    });
                  }else{
                     Swal.fire({
                       icon:"error",
                       title:"Sonething went wrong!"
                     });
                } 
               }catch(err:unknown){
                 console.error("Error Blocking User !");
                 Swal.fire({
                   icon:"error",
                   title:"Failed to block user !",
                   text:err instanceof Error? err.message :"Please try again",
                 })
               }finally{
                 setLoading(false);
               }
            }
        });
     }
     
     return { handleBlock , loading } 
 }
export default useBlockActions;
