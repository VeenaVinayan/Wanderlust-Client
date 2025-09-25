import axiosInstance from "../apiStore/api";
import { TCategoryValue } from "../types/userTypes";
import { TPackage ,TPackagePack } from '../types/packageTypes';
import { TBookingType,TBookingData } from "../types/bookingTypes";
import { TReviewData, TReview } from '../types/userTypes';
import { SearchParams } from '../types/agentTypes';
import { USER_ROUTE } from "../Constants/RouteValues";
class User{
    async getAllCategories(): Promise<TCategoryValue[]> {
       try{
          const { data } = await axiosInstance.get(USER_ROUTE.USER_CATEGORY);
          return data.data;
       }catch(err : unknown){
         throw Error(`Error in Get Category !! : ${err}`);
       } 
    }
    async getPackagesByCategory(): Promise<TPackage[]> {
        try{
            const { data } = await axiosInstance.get(USER_ROUTE.USER_PACKAGES_CATEGORY);
            return data.packages;
        }catch(err : unknown){
            console.log('Error');
            throw Error(`Get Package Error !! ${err}`);
        }
     }
    async getPackges(queryString : string) : Promise<TPackagePack>{
         try{
              const { data } = await axiosInstance.get(`${USER_ROUTE.ADVANCE_SEARCH}?${queryString}`);
              return data.packages;
         }catch(err){
            console.error('Error in Stripe Payment:', err);
             throw Error('Error in get Packages !');
         }
    } 
    async stripePayment(bookingData : TBookingType) {
        try{
            const { data } = await axiosInstance.post(USER_ROUTE.STRIPE_PAYMENT,bookingData);
            return data.data;
        }catch(err : unknown){
            console.error('Error in Stripe Payment:', err);
            throw Error('Error in Booking Package !!');
        }
    }
    async addToWishlist(userId: string,packageId : string){
         try{
             const { data } = await axiosInstance.post(USER_ROUTE.USER_WISHLIST,{userId,packageId});
             return data.message;
         }catch(err){
            console.log('Error in add to wishlist:: ',err);
            throw err;
         }
    }
    async getWishlists(userId : string){
         try{
             const { data } = await axiosInstance.get(`${USER_ROUTE.USER_WISHLIST}?userId=${userId}`);
             return data.wishlists;
         }catch(err){
             console.log('Error occured in Get Wishlist !');
             throw err;
         }
    }
    async deleteWishlist(id : string){
         try{
             const { data } = await axiosInstance.delete(`${USER_ROUTE.USER_WISHLIST}?wishlistId=${id}`);
             return data;
         }catch(err){
            console.log('Error in delete Wishlist ',err);
            throw err;
         }
    }
    async addReview(data :TReview , packageId : string, userId: string){
         try{
             const reviewData : TReviewData ={
                review : data.review,
                rating : data.rating,
                packageId,
                userId
             }
             const response = await axiosInstance.post(USER_ROUTE.USER_REVIEW,{reviewData});
             return response.data;
         }catch(err){
             console.log('Error in Add Review !!'); 
             throw err;
         }
    }
    async getReview(userId : string ,packageId : string ){
         try{
             const { data } = await axiosInstance.get(`${USER_ROUTE.USER_REVIEW}?userId=${userId}&packageId=${packageId}`);
             return data.data;
         }catch(err){
             console.log('Error in get Review :',err);
             throw err;
         }
    }
    async deleteReview(reviewId : string){
        try{
                const { data } = await axiosInstance.delete(`${USER_ROUTE.USER_REVIEW}?reviewId=${reviewId}`);
                return data.success;
        }catch(err){
             console.log('Error in Delete Review !!');
             throw err;
        }
    }
    async getReviews(packageId : string){
        try{
             const { data } = await axiosInstance.get(`${USER_ROUTE.USER_REVIEWS}/${packageId}`);
             return data.review;
        }catch(err){
            console.log('Error in Get Reviews ',err);
            throw err;
        }
    }
    async getWallet (userId : string,params : SearchParams){
        try{
             const { data } = await axiosInstance.get(`${USER_ROUTE.USER_WALLETS}/${userId}`,{params});
             return data.wallet;
        }catch(err){
            console.log('Error in Wallet');
            throw err;
        }
    }
    async editReview(reviewEdit : TReview, reviewId: string){
        try{
            const { data } = await axiosInstance.patch(`${USER_ROUTE.USER_REVIEW}/${reviewId}`,reviewEdit);
            return data.message;
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
            console.error('Error in Validate Booking');
            throw err;
        }
    } 
    async getAgentData(agentId : string){
        try{
            const response = await axiosInstance.get(`${USER_ROUTE.USER_AGENTS_DATA}?agentId=${agentId}`);
            return response.data;
        }catch(err){
             console.log('Error is ::',err);
             throw err;
        }
    }
    
}

export default new User();