
import userApi from '../../helper/userApi';
import { TPackage } from '../../types/packageTypes';
import { TCategoryValue } from '../../types/packageTypes';
import { PER_PAGE } from '../../Constants/User';

export const getCategories = async() : Promise<TCategoryValue>=> {
    try{
        console.log('Fetch Category for Landing Page !!'); 
        const data = await userApi.getAllCategories();
        return data;
     }catch(err){
        console.log('Error occured :::',err);
        throw err;
     }
}
export const getPackageData = async(): Promise<TPackage[]> =>{
    try{
        const data : TPackage []= await userApi.getPackagesByCategory();
        return data;
    }catch(err){
        console.log('Error occured::',err);
        throw err;
    }
}

export const advanceSearch = async (queryString: string): Promise<TPackageData> => {
    try {
        console.log("Searching packages with query:", queryString);

        const response = await userApi.getPackges(queryString);
        return response; 
    } catch (err) {
        console.error("Error in searching packages:", err);
        throw err;
    }
};
