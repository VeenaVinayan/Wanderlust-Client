import axiosInstance from "../apiStore/api";
import { TCategoryValue } from "../types/userTypes";
import { TPackage ,TPackagePack } from '../types/packageTypes';
import { TBookingType,TBookingData } from "../types/bookingTypes";
import { TReviewData, TReview } from '../types/userTypes';
import { SearchParams } from '../types/agentTypes';

class UserApi{
    async getAllCategories(): Promise<TCategoryValue[]> {
       try{
          const { data } = await axiosInstance.get('/user/category');
          return data.data;
       }catch(err : unknown){
         throw Error(`Error in Get Category !! : ${err}`);
       } 
    }
    async getPackagesByCategory(): Promise<TPackage[]> {
        try{
            console.log('Error in get Packages :::');
            const respone = await axiosInstance.get(`/user/packages-category`);
            console.log("REsponse is ::",respone.data.packages);
            return respone.data.packages;
        }catch(err : unknown){
            console.log('Error');
            throw Error(`Get Package Error !! ${err}`);
        }
     }
    async getPackges(queryString : string) : Promise<TPackagePack>{
         try{
              const response = await axiosInstance.get(`/user/advance-search?${queryString}`);
              console.log(' Searched Packages !!',response);
             return response.data.data;
         }catch(err){
            console.error('Error in Stripe Payment:', err);
             throw Error('Error in get Packages !');
         }
    } 
    async stripePayment(bookingData : TBookingType) {
        try{
            const response = await axiosInstance.post('/user/stripe-payment', bookingData);
            console.log('Booking Response:', response.data);
            console.log('Booking URL:', response.data.data);
            return response.data.data;
        }catch(err : unknown){
            console.error('Error in Stripe Payment:', err);
            throw Error('Error in Booking Package !!');
        }
    }
    async addToWishlist(userId: string,packageId : string){
         try{
             console.log(' Wishlist in api helper !!');
             const response = await axiosInstance.post(`/user/wishlist`,{userId,packageId});
             console.log(' REsult in wishlist ::',response.data.message);
             return response.data.message;
         }catch(err){
            console.log('Error in add to wishlist:: ',err);
            throw err;
         }
    }
    async getWishlists(userId : string){
         try{
             console.log('Get Wishlist !!');
             const res = await axiosInstance.get(`/user/wishlist?userId=${userId}`);
             return res.data.data;
         }catch(err){
             console.log('Error occured in Get Wishlist !');
             throw err;
         }
    }
    async deleteWishlist(id : string){
         try{
             console.log('Delete Wishlist !');
             const res = await axiosInstance.delete(`/user/wishlist?wishlistId=${id}`);
             return res.data;
         }catch(err){
            console.log('Error in delete Wishlist ',err);
            throw err;
         }
    }
    async addReview(data :TReview , packageId : string, userId: string){
         try{
             console.log('Add review Helper !!');
             const reviewData : TReviewData ={
                review : data.review,
                rating : data.rating,
                packageId,
                userId
             }
             const response = await axiosInstance.post('/user/review',{reviewData});
             return response.data;
         }catch(err){
             console.log('Error in Add Review !!'); 
             throw err;
         }
    }
    async getReview(userId : string ,packageId : string ){
         try{
             console.log('Get Review data !');
             const data = await axiosInstance.get(`/user/review?userId=${userId}&packageId=${packageId}`);
             console.log('Review DAta ::',data.data.data);
             return data.data.data;
         }catch(err){
             console.log('Error in get Review :',err);
             throw err;
         }
    }
    async deleteReview(reviewId : string){
        try{
                const response = await axiosInstance.delete(`/user/review?reviewId=${reviewId}`);
                console.log('Result after Delete Review ::',response);
                return response.data.success;
        }catch(err){
             console.log('Error in Delete Review !!');
             throw err;
        }
    }
    async getReviews(packageId : string){
        try{
             const response = await axiosInstance.get(`/user/reviews/${packageId}`);
             console.log('DAta reviews ::',response.data.data);
             return response.data.data;
        }catch(err){
            console.log('Error in Get Reviews ',err);
            throw err;
        }
    }
    async getWallet (userId : string,params : SearchParams){
        try{
             console.log("User ID :: ", userId);
             const data = await axiosInstance.get(`/user/wallets/${userId}`,{params});
             console.log("Data from ::",data.data.data);
             return data.data.data;
        }catch(err){
            console.log('Error in Wallet');
            throw err;
        }
    }
    async editReview(data : TReview, reviewId: string){
        try{
            console.log('Edit Review !!',data,reviewId);
            const response = await axiosInstance.patch(`/user/reviews/${reviewId}`,data);
            console.log('Response in Edit Review ::',response.data);
            return response.data.message;
        }catch(err){
            console.log('Error in Edit Review !!');
            throw err;
        }
    }  
    async validateBooking(bookingData : TBookingData){
        try{
            console.log("Validate booking !!",bookingData);
            //const response = await axiosInstance.get('/bookings/validate',{bookingData});
           // return response.data;
        }catch(err){
            console.log('Error in Validate Booking');
            throw err;
        }
    } 
    async getAgentData(agentId : string){
        try{
            const response = await axiosInstance.get(`/user/agents/data?agentId=${agentId}`);
            return response.data;
        }catch(err){
             console.log('Error is ::',err);
             throw err;
        }
    }
    
}

export default new UserApi();