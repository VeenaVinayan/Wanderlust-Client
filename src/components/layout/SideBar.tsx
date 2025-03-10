import React from 'react'
import { LayoutDashboard, ShipWheel, Users, BellDot, PackageCheck, LogOut} from "lucide-react";
import SideBarLink from './Admin/SideBarLink';

const SideBar : React.FC = () => {
  return (
    <>
        <aside className="w-64 bg-blue-50  text-yellow-50 p-6 shadow-xl">
        <p className="text-3xl p-3 font-semibold  tracking-wide shadow-sm bg-gradient-to-r from-blue-300 to-purple-600 text-transparent bg-clip-text">
            Admin
        </p>
        <ul className="space-y-4 gap-5">
          <li>
               <SideBarLink icon={LayoutDashboard} label="Dashboard" route="/admin/adminDashboard" />
          </li>
          <li>
             <SideBarLink icon={Users} label="Users" route="/admin/users"/>
          </li>
          <li>
               <SideBarLink icon={PackageCheck} label="Packages" route="/admin/packages" />
          </li>
          <li>
               <SideBarLink icon={ShipWheel} label="Agent" route="/admin/agents" />
          </li>
          <li>
               <SideBarLink icon={BellDot} label="Notifications" route="/admin/notifications" />
           </li>
          <li>
              <SideBarLink icon={LogOut} label="Logout" route="/logout"/>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default SideBar
