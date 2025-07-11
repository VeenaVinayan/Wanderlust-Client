import { TCategory} from '../types/categoryTypes';
import { Column } from '../components/common/Table';
import { Agent , User, TWalletTransaction} from '../types/userTypes';
import { TAgentVerification } from '../types/agentTypes';
import { TPackage } from '../types/packageTypes';
import { TBookingValue, TBookingAgentResponse } from '../types/bookingTypes';
import { TAgentPackage } from '../types/packageTypes';
export const PER_PAGE = 6;

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
  {
   key: "images",
   label: "Image",
   render: (value) => {
    if (Array.isArray(value) && value.length > 0) {
      return (
        <img
          src={value[0]}
          alt="Package"
          className="h-16 w-16 object-cover rounded-lg"
        />
      );
    }
     return <span className="text-gray-400">No image</span>;
   },
 },

  { key: "name", 
    label:"Name",
    render:(value) =>  { 
      if(typeof value === "string"){ 
      return(
         <span className="text-gray-800 font-semibold">{value}</span>
     )
  }
 }
 },
  { key:"description", 
    label:"Description",
    render:(value) =>{ 
       { if(typeof value === "string") { 
        return (
          <span className="text-sm text-gray-700">  {value.split(' ').slice(0, 10).join(' ')}...</span>
        )}
     } }
},
  { key:"price", label: "Price"},
  { key:"day", label: "Days"},
  { key :"status",
    label:"Status",
    render: (value: TPackage["status"], row: TPackage) => {
      if (!row.isVerified) return <span className="text-red-500">Awaiting Verification</span>;
      else{ 
      if (typeof value === "boolean") {
        return value ? (
          <span className="rounded-full bg-green-800 border-spacing-1 text-white">Active</span>
        ) : (
          <span className="text-white rounded-full bg-red-400 border-spacing-1">Inactive</span>
        );
      }
      return "unknown";
    }
  }
  },
];
  export const BookingColumn : Column<TBookingValue>[]=[
     { key:"bookingId", label:"Booking ID"},
     { key:"tripDate",
       label:"Trip Date",
        render: (value) => {
          const date = new Date(value);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        },
      },
     {key:"email", label:"Email"},
     {key:"totalGuest", label:"Travellers"},
     {key:"tripStatus", label:"Trip Status"},  
  ] 
  
  export const BookingAgentData  : Column<Partial<TBookingAgentResponse>>[]=[
    { key:"packageName", label:'Package Name'},
    { key: "totalBooking", label:'Total Booking'}
  ]

  export const WalletTransactionData : Column<TWalletTransaction>[] =[
    { key: "description", label: "Description" },
    { 
      key: "transactionDate", 
      label: "Transaction Date",
      render: (value) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    { key: "amount", label: "Amount" }, 
  ]
 export const AgentPackage : Column<TAgentPackage>[] =[
 { key: "agentName", label: "Agent Name"},
 { key: "totalCount", label:"Total Packages"},
 ];
  
 