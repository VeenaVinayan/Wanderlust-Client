export type TPackage = {
    name:string;
    description: string;
    price:number;
    day:number;
    night:number;
    images:File[];
    category:string;
    itinery:{
        day:number;
        decription:string;
        meals:string[];
        activities:string;
        stay:string;
        transfer:string;
        location:string;  
    }
}