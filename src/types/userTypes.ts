export type UserData ={
   id:string;
   email:string;
   name:string;
   phone:string;
   role:string;
   status:boolean;
   isAuthenticated:boolean;
}
export type User = {
     _id:string;
     name:string;
     email:string;
     phone:string;
     role?:string;
     status:boolean;
   }
export type Agent = {
   _id:string;
   name:string;
   email:string;
   phone:string;
   status:boolean;
 }
export type DataResponse ={
    data : Agent[] | User[];
    totalCount:number;
 }

 export type LoginResponse = {
    user : UserData;
    accessToken : string;
    address?:{
      home: string;
      street?:string;
      city:string;
      state:string;
      country:string;
      zipcode:string;
   }
    isVerified:string;
 }
 export type TUserUpdateData = {
    name:string;
    phone:string;
 }
 export type TResetPassword = {
     oldPassword: string;
     newPassword:string;
     confirmPassword:string;
 }

 export type TCategoryValue = {
    _id: string;
    name:string;
    image:string;
 }

 export type TReview = {
   _id:string;
    review : string;
    rating : number;
 }
  export type TReviewData ={
    review : string;
    rating:number;
    packageId : string;
    userId: string;
 }
 export type TWalletTransaction ={
      _id:string;
      bookingId:string;
      transactionDate: Date;
      amount:number;
      description:string;
 }
 export type TWallet={
    _id:string;
    amount:number;
    transaction:TWalletTransaction[]
 }
  export type GoogleAuthCodeResponse ={
    code: string;
    status:string;
 }