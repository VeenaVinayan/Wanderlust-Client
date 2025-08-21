export type TItinerary = { 
    day:number;
    description:string;
    activities: string, 
    meals: string [], 
    stay: string; 
    transfer: string;
  };
export type TPdfProps ={
     title: string;
     day:number;
     night:number;
     itinerary: TItinerary[];
}
export type TPackageValue = {
    name:string;
    description: string;
    price:number;
    day:number;
    night:number;
    images:File[];
    category:string;
    status?:boolean;
    agent:string;
    totalCapacity:number;
    discount?:number;
    itinerary:TItinerary[];
    isVerified:string;
    coordinates:{
       latitude:number,
       longitude:number,
    }
}

export type TPackageUpload = Omit<TPackageValue,'images'>& {
   images : string[];
}

export type TPackage = {
    _id:string;
    name:string;
    description: string;
    price:number;
    day:number;
    night:number;
    images:string[];
    category:string;
    status?:boolean;
    agent:string;
    totalCapacity:number;
    discount?:number;
    itinerary:TItinerary[];
    isVerified:string;
    coordinates:{
       latitude:number,
       longitude:number,
    }
}
export type TPackageAllData = Omit<TPackage,'agent'> &{
   agent:{
     _id:string,
     name:string;
     email:string;
     phone:string;
   }
} 
export type TCategoryValue = {
    _id: string;
    name:string;
}
export type TPackageState = {
    packages: TPackageDataValue[];
    status: "idle" | "succeeded" | "failed" | "loading";
    error: string | null;
}
  export type TPackageUpdate = Omit<TPackage, '_id' | 'status'>;

  export type TPackageData = {
     packages: TPackageAllData[],
     totalCount : number,
  }
  export type TPackageResponse = {
     _id:string,
     userId:string,
     packageId:{
         _id:string,
         name:string,
         images:string[],
         description:string,
         day:number,
         night:number,
         price:number,
     }
  }
  export type TReviews = {
    _id : string;
    rating:number;
    review:string;
    packageId:string;
    userId: {
         _id:string;
         name:string;
    }
    createdAt:Date;
  }
  export type TAgentPackage ={
    packages :{
     id: string;
     agentName: string;
     count: number;
    } [],
     totalCount : string;
  }

  export type ItineraryItem = {
   day: number;
   description: string;
   meals?: string[];
   activities: string;
   stay?: string;
   transfer?: string;
};

export type TPackageDataValue ={
    id:string;
    name:string;
    agent:{
        id:string;
        name:string;
        email:string;
        phone:string;
    },
    category:string;
    description:string;
    images:string[];
    status:boolean;
    day:number;
    night:number;
    price:number;
    totalCapacity:number;
    discount?:number;
    itinerary:{
        day:number;
        description:string;
        activities:string;
        meals:string[];
        stay:string;
        transfer:string;
      }[],
      coordinates?:{
        latitude:number,
        longitude:number,  
    } 
}
export type TPackagePack ={
   packages: TPackageDataValue[];
   totalPackages:number;
}
