import axiosInstance from "../../apiStore/api";
import agentHelper from '../../helper/agentApi';
import axios from 'axios';

export const uploadCertificate =  async (userId : string, image :File) =>{
   try{
          const response = await axiosInstance.post('/agent/getPresignedUrl',{
             fileType:image.type
          });
         if(response.status === 200){
              const { signedUrl, publicUrl } = response.data.response;
              const res = await axios.put(signedUrl, image, {
                headers: { "Content-Type": image.type },
             });
          if(res.status === 200){
             const result = await axiosInstance.patch(`/agent/upload-certificate/${userId}`,
                 {publicUrl});
              if(result.status === 200) return "true";
              else return false;
          }
        }else{
             console.log(" Error occured upload Image at S3 bucket !!");
        }
    }catch(err){
       console.log('Error in upload image !!' ,err)
    }
}

export const getDashboard = async (agentId : string) =>{
   try{
        const dashboard = await agentHelper.getDashboard(agentId);
        return dashboard;
   }catch(err:unknown){
        console.error('Error in Fetching Agent Dashboard ::', err);
        throw err;
   }
}
