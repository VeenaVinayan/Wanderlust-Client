import axiosInstance from "../../apiStore/api";
import agentHelper from '../../helper/agentApi';
import axios from 'axios';

export const uploadCertificate =  async (userId : string, image :File) =>{
    console.log("Inside  upload certificate !! ",userId,File);
     try{
          const response = await axiosInstance.post('/agent/getPresignedUrl',{
             fileType:image.type
          });
          console.log(' After upload url !!',response);
          if(response.status === 200){
              const { signedUrl, fileKey,publicUrl } = response.data.response;
              console.log('  url !! :: ',signedUrl, fileKey);
              const res = await axios.put(signedUrl, image, {
                headers: { "Content-Type": image.type },
             });
          console.log(' Result : response from S3 :: ',res);  
          if(res.status === 200){
              console.log("Image upload successfully !!");
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
        const data = await agentHelper.getDashboard(agentId);
        return data;
   }catch(err:unknown){
        console.error('Error in Fetching Agent Dashboard ::', err);
        throw err;
   }
}
