import { User } from '../types/userTypes' 

export interface TableProps {
   data: User [] ;
   columns: {key: string, label: string} [];
   role:string;
   renderActions?:(id:string,role:string) => JSX.Element;
}

export interface PaginationProps {
    perPage: number;
    length: number;
    handlePage: (page: number) => void;
    currentPage:number;
 }

 export interface IApiResponse{
     success: boolean;
     message: string;
 }