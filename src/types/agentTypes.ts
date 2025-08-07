export type TAgentData= {
    id:string;
    email:string;
    name:string;
    phone:string;
    role:string;
    status:boolean;
    isAuthenticated:boolean;
    address:{
            home: string;
            street?:string;
            city:string;
            state:string;
            country:string;
            zipcode:string;
         }, 
    isVerified:string; 
    license:string;    
 }
 export type TAgentVerification = {
    _id:string;
    name:string;
    email:string;
    phone:string;
    address:{
            home: string;
            street?:string;
            city:string;
            state:string;
            country:string;
            zipcode:string;
    },
     isVerified:string; 
     license:string;
 }

 export type TCategoryValue = {
    _id:string;
    name:string;
 }


 export type TSignedUrl = {
   signedUrl: string;
   fileKey: string;
   publicUrl: string;
 }

 export type SearchParams = {
     page:number,
     perPage:number,
     search: string,
     sortBy: string,
     sortOrder: string,
 }

 export type TAgent = {
    id:string;
    email:string;
    name:string;
    phone:string;
    address:{
            home: string;
            street?:string;
            city:string;
            state:string;
            country:string;
            zipcode:string;
         }, 
    isVerified:string; 
    license:string; 
 }