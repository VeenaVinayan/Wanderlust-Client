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
 }

 export type TAgentVerification = {
    _id:string;
    name:string;
    email:string;
    phone:string;
    license:string;
 }