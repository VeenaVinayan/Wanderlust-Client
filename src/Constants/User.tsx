import { TCategory} from '../types/categoryTypes';
import { Column } from '../components/common/Table';
import { Agent , User, TWalletTransaction} from '../types/userTypes';
import { TAgentVerification } from '../types/agentTypes';
import { TPackage, TPackageAllData } from '../types/packageTypes';
import { TBookingValue, TBookingAgentResponse,TBookingResponse } from '../types/bookingTypes';
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
          const mainClass=`rounded-full px-2 py-1 bg-green-100`
          return value ? (
            <span className={`${mainClass}text-green-800"`}>Active</span>
          ) : (
            <span className={`${mainClass}text-red-800`}>Inactive</span>
          );
        }
        return "Unknown";
      },
    }
 ];

export const Columns_Category: Column<TCategory>[] = [
   { key: "name", label: "Name" },
  {
  key: "description",
  label: "Description",
  render: (value) => {
    if (typeof value === "string") {
      return (
        <span
          className="text-sm text-gray-700 line-clamp-2 max-w-[200px] overflow-hidden"
          title={value}
        >
          {value}
        </span>
      );
    }
    return null;
  },
},

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
         return "Unknown"; 
       }
   },
   {
    key: "image",
    label: "Image",
    render: (value) =>
      typeof value === "string" ? (
        <img
          src={value}
          alt={"Category"}
          className="h-16 w-16 object-cover rounded-lg"
        />
      ) : (
        <span className="text-gray-400">No image</span>
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
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
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
    //      // <span className="text-sm text-gray-700">  {value.split(' ').slice(0, 10).join(' ')}...</span>
    //      <span 
    <span
          className="text-sm text-gray-700 line-clamp-2 max-w-[200px] overflow-hidden"
          title={value}
    >
      {value}
    </span>
   )}
      } 
}
},
  { key:"price", label: "Price"},
  { key:"day", label: "Days"},
  { key :"status",
    label:"Status",
    render: (value, row) => {
      if (row.isVerified === "Pending") return <span className="text-red-400 font-thin">Awaiting Verification</span>;
      else if(row.isVerified === "Rejected") return <span className='text-orange-600 font-thin'>Rejected</span>
      else{ 
      if (typeof value === "boolean") {
        return value ? (
          <span className="rounded-full bg-teal-200 border-spacing-1 text-white">Active</span>
        ) : (
          <span className="text-white rounded-full">Inactive</span>
        )
       }   
      }
      }
    }
  ]
  export const PackageColumnData : Column < TPackageAllData>[]=[    
  {
   key: "images",
   label: "Image",
   render: (value) => {
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
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
          //<span className="text-sm text-gray-700">  {value.split(' ').slice(0, 10).join(' ')}...</span>
          <span
          className="text-sm text-gray-700 line-clamp-2 max-w-[200px] overflow-hidden"
          title={value}
    >
      {value}
    </span>
        )}
     } }
},
  { key:"price", label: "Price"},
  { key:"day", label: "Days"},
  { key :"status",
    label:"Status",
    render: (value, row) => {
      if (row.isVerified === "Pending") return <span className="text-orange-500 bg-yellow-200 font-thin rounded-full px-3 py-1">Pending</span>;
      else if(row.isVerified === "Rejected") return <span className='text-orange-600 font-thin'>Rejected</span>
      else{ 
      if (typeof value === "boolean") {
        return value ? (
          <span className="rounded-full bg-green-200 border-spacing-1 text-green-800 px-3 py-1">Active</span>
        ) : (
          <span className="text-white rounded-full">Inactive</span>
        )
       }   
      }
      }
    }
  ]
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
     { key:"tripStatus",
       label:"Trip Status",
       render:(value)=>{
         if(typeof value !== "string") return null;
         const baseClass="py-1 px-3 rounded-full inline-block font-light text-sm";
         const StatusStyle : Record<string,string> ={
           Cancelled:"bg-red-100 text-red-600",
           Completed:"bg-green-100 text-green-700",
           Pending:"bg-yellow-300 text-orange-600"
         };
         return(
          <span className={`${baseClass} ${StatusStyle[value] || ""}`}>{value}</span>
         )
       }
      },  
  ] 
  export const BookingColumnData : Column<TBookingResponse>[]=[
     { key:"bookingId", label:"Booking ID"},
     { key:"tripDate",
       label:"Trip Date",
        render: (value) => {
          const date = new Date(value as string | number | Date);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        },
      },
     {key:"email", label:"Email"},
     {key:"totalGuest", label:"Travellers"},
     { key:"tripStatus",
       label:"Trip Status",
       render: (value ) => {
          if(typeof value !== "string") return null
           const baseClass =
             "px-3 py-1 text-sm font-light rounded-full inline-block";
           const statusStyles: Record<string, string> = {
              Cancelled: "bg-red-100 text-red-700",
              Completed: "bg-green-100 text-green-700",
              Pending: "bg-yellow-100 text-orange-500",
          };
        return (
          <span className={`${baseClass} ${statusStyles[value] || ""}`}>
            {value}
          </span>
      );
    },
  },  
 ] 
  export const BookingAgentData  : Column<TBookingAgentResponse>[]=[
    { key:"packageName", label:'Package Name'},
    { key: "totalBooking", label:'Total Booking'}
  ]

  export const WalletTransactionData : Column<TWalletTransaction>[] =[
    { key: "bookingId",
      label:"Booking ID",
      render: (value) => {
        return typeof value === "string" ? value : (value?.toString() ?? '__00AA1__');
      }
    },
    {key: "description", label: "Description" },
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
//  export const AgentPackage : Column<TAgentPackage>[] =[
//  { key: "packageName", label: "Agent Name"},
//  { key: "totalCount", label:"Total Packages"},
//  ];
  
 