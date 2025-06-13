import { TItinerary } from './packageTypes';

export type TBookingData = {
    tripDate: Date ;
    travellers:{
         adult: number;
         children: number;      
         infant: number;
     }
     email:string;
     phone:string;
     totalAmount: number;
}
export type TBookingType = {
    price: number,
    packageName: string
}
export type TBooking ={
    userId: string;
    packageId: string;
    totalGuest: number;
    totalAmount: number;
    tripDate: Date;
    travellers:{
        adult: number;
        children: number;      
        infant: number;
    }
    email:string;
    phone:string;
}

export type TBookingResponse = {
    _id: string; 
    bookingId:string;  
    userId:string;
    packageId:{
        _id: string;
        name: string;
        description: string;
        images: string;
        price: number;
        day: number;
        night:number;
        itinerary:TItinerary[];
    },
    totalGuest: number;
    totalAmount: number;    
    tripDate: Date;
    bookingDate:Date;
    travellers:{        
        adult: number;
        children: number;      
        infant: number;
    }
    email:string;
    phone:string;
    tripStatus: string;
    paymentStatus:string;
} 
export type TBookingValue ={
       _id: string;
        packageId:string;
        packageName:string;
        packageImage:string;
        bookingId:string;  
        userId:string;
        totalGuest: number;
        totalAmount: number;    
        tripDate: Date;
        email:string;
        phone:string;
        tripStatus: string;
        paymentStatus:string;
}
export type TBookingAgentResponse = {
    _id: string;
    packageName: string;
    totalBooking: number;
    bookings:   TBookingValue [];    
}
export type TBookingView = TBooking & {
     tripStatus:string;
     userId:{
        name: string;
        _id:string;
     }
}


