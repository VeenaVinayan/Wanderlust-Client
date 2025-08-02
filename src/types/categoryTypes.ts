export type TCategory= {
    _id:string;
    name: string;
    description : string;
    status:boolean;
    image: string;
}

export type TCategoryData ={
    name:string;
    description:string;
    image: File ;
    status?:boolean;
}

export type TCategoryValue ={
    name:string;
    description:string;
    image:string;
}


