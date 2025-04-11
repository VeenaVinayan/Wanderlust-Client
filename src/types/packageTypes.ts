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
    discount:number;
    itinerary:{
        day:number;
        description:string;
        meals:string[];
        activities:string;
        stay:string;
        transfer:string;
    }[]
}
export type TCategoryValue = {
    _id: string;
    name:string;
}
export type TPackageState = {
    packages: TPackage[];
    status: "idle" | "succeeded" | "failed" | "loading";
    error: string | null;
}
export type TItinerary = { 
    day:number;
    description:string;
    activities: string, 
    meals: string [], 
    stay: string; 
    transfer: string;
  };
 
  export type TPackageUpdate = Omit<TPackage, '_id' | 'status'>;

  export type TPackageData = {
     packages: TPackage[],
     totalCount : number,
  }