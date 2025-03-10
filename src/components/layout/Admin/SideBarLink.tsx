import React from 'react'
interface  SideBarLinkProps {
     icon: React.ElementType;
     label:string;
     route:string;
}

const SideBarLink: React.FC<SideBarLinkProps>= ( {icon :Icon, label, route} ) => {
  return (
    <>
       <div className='flex flex-row  rounded-md shadow-md hover:bg-gray-200 transition m-2 hover:scale-105  duration-300 ease-in-out  hover:shadow-xl'>
               <Icon size={20} color={'violet'} />
               <a href={route}  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-300
                                text-xl font-extrabold tracking-wide font-[Poppins]">
                   {label}
               </a>
            </div>
    </>
  )
}

export default SideBarLink;




