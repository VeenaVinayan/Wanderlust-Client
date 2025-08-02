
import userApi from '../../helper/userApi';
import { TPackage, TPackageData } from '../../types/packageTypes';
import { TCategoryValue } from '../../types/userTypes';
import {TBookingType } from '../../types/bookingTypes';
import { TReview } from '../../types/userTypes';
import { SearchParams } from '../../types/agentTypes';

export const getCategories = async() : Promise<TCategoryValue[]>=> {
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

export const stripePayment = async (bookingData : TBookingType ) =>{
     try{
         const response = await userApi.stripePayment(bookingData);
         return response
     }catch(err){
         console.log('Error occured while booking package:', err);
         throw err;
     }
}

export const addToWishlist = async(userId: string,bookingId  : string) => {
     try{
         console.log('Wishlist :: ',bookingId);
         const res = await userApi.addToWishlist(userId,bookingId);
         console.log("REsponse in wishlist :: ",res);
         return res;
     }catch(err){
         console.error("error in searching packages !",err);
         throw err;
     }
}
export const getWishlist = async(userId : string) =>{
    try{
         console.log('Get wishlist !!');
         const data = await userApi.getWishlists(userId);
         console.log("Data in Get Wishlist ||",data);
         return data;
    }catch(err){
        console.log('Error in get Packages !!');
        throw err;
    }
}
export const deleteWishlist = async(id : string) => {
    try{
         console.log('Delete Wishlisst !!');
         const response = await userApi.deleteWishlist(id);
         return response;
    }catch(err){
        console.log('Error in Delete Wishlist !',err);
        throw err;
    }
}
export const addReview = async(data : TReview, userId: string,packageId: string) =>{
     try{
            const response = await userApi.addReview(data,packageId,userId);
            return response;
     }catch(err){
        console.log('Error in add Review ',err);
        throw err;
     }
}
export const getReview = async(userId: string , packageId:string) =>{
    try{
         return await userApi.getReview(userId,packageId);
    }catch(err){
        console.log('Error in get Review !!');
        throw err;
    }
}
export const deleteReview = async(reviewId : string) =>{
     try{
         console.log('Deelte review service !');
         return await userApi.deleteReview(reviewId);
     }catch(err){
        console.log('Error in Delete Review !!');
        throw err;
     }
}
export const getReviews = async (packageId : string) =>{
     try{
         console.log('Get Review of a package !');
         return await userApi.getReviews(packageId);
     }catch(err){
         console.log('Error in get Review s ');
         throw err;
     }
}
export const getWallet = async( userId : string,params: SearchParams) =>{
    try{
        return await userApi.getWallet(userId,params);
    }catch(err){
        console.log('Error in wallets !');
        throw err;
    }
}
export const editReview = async(data : TReview , reviewId : string) =>{
     try{
          console.log('Edit Review Service !');
          return await userApi.editReview(data,reviewId);
     }catch(err){
        console.log('Error in Edit Review !!');
        throw err;
     }
}

export const getAgentData = async(agentId : string) =>{
     try{
         console.log("Agent Id:",agentId);
         const data = await userApi.getAgentData(agentId);
         return data;
     }catch(err){
         console.log('Error in Edit Review !!');
        throw err;
     }
}



