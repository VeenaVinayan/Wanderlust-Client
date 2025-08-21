import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationContext } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const NotificationBell = () => {
  const { notifications, clearAll } = useNotificationContext();
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const user = useSelector((state: RootState) => state.userData);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const viewAllNotification = ()=>{
     console.log(user.role); 
     if(user.role ==="Admin"){
        navigate('/admin/adminDashboard/notification');
     }else if(user.role === "Agent"){
       navigate('/agent/agentDashboard/notification');
     }else{
        navigate('/user/userProfile/notification');
     }
    } 
  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Toggle notifications"
      >
        <Bell className="w-6 h-6 text-gray-800" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-[10px] shadow-md">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <>
         <div className="absolute top-0 right-5 w-3 h-3 bg-white rotate-45 transform translate-y-[-6px] shadow-sm border-t border-l border-gray-200 z-40" />
          <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              )}
               <button 
              className="px-3 py-1 text-sm font-sm text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-shadow shadow-sm hover:shadow-md" 
              onClick={viewAllNotification}>
               View All
            </button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No recent notifications
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 px-1 py-2">
                  {notifications.map((msg) => (
                    <li
                      key={msg._id}
                      className={`p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                        msg.isRead ? 'text-gray-500' : 'text-gray-800 font-medium'
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">{msg.message}</span>
                        {msg.createdAt && (
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(msg.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
           
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
