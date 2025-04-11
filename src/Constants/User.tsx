import { TCategory} from '../types/categoryTypes';
import { Column } from '../components/common/Table';
import { Agent , User} from '../types/userTypes';
import { TAgentVerification } from '../types/agentTypes';
import { TPackage } from '../types/packageTypes';

export const Columns : Column <Agent | User>[]= [
    {key:"name", label:"Name"},
    {key:"email", label:"Email"},
    {key:"phone", label:"Phone"},
    {
      key: "status",
      label: "Status",
      render: (value: boolean | string) => {
        if (typeof value === "boolean") {
          return value ? (
            <span className="text-green-800">Active</span>
          ) : (
            <span className="text-red-800">Inactive</span>
          );
        }
        return "Unknown";
      },
    }
 ];
export const PER_PAGE = 2;

export const Columns_Category: Column<TCategory>[] = [
   { key: "name", label: "Name" },
   { key: "description", label: "Description" },
   { 
      key: "status", 
      label: "Status", 
      render: (value) => { 
         if (typeof value === "boolean") {
           return value ? (
             <span className="text-green-800">Active</span>
           ) : (
             <span className="text-red-900">Inactive</span>
           );
         } 
         return "Unknown"; // Handle cases where value is not a boolean
       }
   },
   {
    key: "image",
    label: "Image",
    render: (value) => (
      <img
        src={value}
        alt={"Category"}
        className="h-16 w-16 object-cover rounded-lg"
      />
    ),
  }
];

export const AgentVerificationColumn : Column<TAgentVerification>[] =[
  { key:"name", label:"Name" },
  { key:"email", label:"Email"},
  { key:"phone", label:"Phone"},
  { key: "license",
    label:"License",
    render: (value) =>( 
      <img 
           src={value}
           alt={"Certificate"}
           className='h-16 w-16 object-cover rounded-lg'
      />     
    ),
  }
]

export const PackageColumn : Column <TPackage>[]=[
  { key: "name", label:"Name"},
  { key:"description", label:"Description"},
  { key:"price", label: "Price"},
  { key:"day", label: "Days"},
  { key :"status",
    label:"Status",
    render:(value) =>{
       if( typeof value === "boolean"){
         return value ? 
          (
            <span className="text-green-800 border-spacing-1">Active</span>
          ) : (
            <span className="text-red-900">Inactive</span>
          );
          return "unknown"
      }
    }
  },
   { key:"images",
     label:"Image",
     render:(value) =>(
       <img 
             src={value[0]}
             alt={'Package image'}
             className='h-16 w-16 object-cover rounded-lg'
       />      
     )
  },
]
 