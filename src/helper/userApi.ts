import axiosInstance from "../apiStore/userApi";
import { TCategoryValue } from "../types/userTypes";
import { TPackage ,TPackageData } from '../types/packageTypes';

class UserApi{
    async getAllCategories(): Promise<TCategoryValue> {
       try{
          const { data } = await axiosInstance.get('/category');
          console.log(' Values ::',data,data.data)
          return data.data;
       }catch(err : unknown){
         throw Error(`Error in Get Category !! : ${err}`);
       } 
    }
    async getPackagesByCategory(): Promise<TPackage[]> {
        try{
            console.log('Error in get Packages :::');
            const respone = await axiosInstance.get(`/packages-category`);
            console.log("REsponse is ::",respone.data.packages);
            return respone.data.packages;
        }catch(err : unknown){
            console.log('Error');
            throw Error(`Get Package Error !! ${err}`);
        }
     }
    async getPackges(queryString : string) : Promise<TPackageData>{
         try{
              const response = await axiosInstance.get(`/advance-search?${queryString}`);
              console.log(' Searched Packages !!',response);
              console.log("Response Data ::",response.data.packages);
              return response.data.data;
         }catch(err){
             throw Error('Error in get Packages !');
         }
    } 
}

export default new UserApi();