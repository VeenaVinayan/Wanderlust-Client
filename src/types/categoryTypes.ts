export type TCategory= {
    _id:string;
    name: string;
    description : string;
    status:boolean;
    image: string;
}

export type CategoryData ={
    name:string;
    description:string;
    image: File | null;
    status?:boolean;
}


