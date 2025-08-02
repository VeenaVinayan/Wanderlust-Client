import React , { useEffect , useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCircle, MessageSquare, Package2 } from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getAllNotifications , changeNotificationStatus} from "../../services/Notification/NotificationService";
import { TNotification } from "../../types/notificationTypes";

const getIcon = (type: string) => {
  switch (type) {
    case "Booking":
      return <CheckCircle className="text-emerald-500 w-5 h-5" />;
    case "Chat":
      return <MessageSquare className="text-blue-500 w-5 h-5" />;
    case "Package":
      return <Package2 className="text-blue-500 w-5 h-5" />;
    default:
      return <Bell className="text-gray-500 w-5 h-5" />;
  }
};

const NotificationList: React.FC = () => {
    const user = useSelector((state : RootState) => state.userData);
    const [notifications, setNotifications ] = useState<TNotification[]>([]);
    useEffect(() =>{
        const fetchData = async(userId : string)=>{
             const data = await getAllNotifications(userId,user.role);
             setNotifications(data);
        }
         fetchData(user.id);
    },[]);

const handleRead = async (notificationId: string) => {
  try {
    const notification : TNotification | undefined = notifications.find((msg)=> msg._id === notificationId)
    if( !notification?.isRead ){ 
    const res = await changeNotificationStatus(notificationId,user.role);
    if(res){ 
    setNotifications((prev) =>
      prev.map((message) =>
        message._id === notificationId
          ? { ...message, isRead: !message.isRead }
          : message 
      )
    );
  } 
  }
  } catch (err) {
    console.error("Failed to update notification:", err);
  }
};

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow p-4 space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Notifications</h2>

      { notifications.length >0 ? (
        <> 
        {  notifications.map((msg) => (
        <div
          key={msg._id}
          className={`flex items-start gap-3 p-3 rounded-md ${
            msg.isRead ? "bg-gray-50" : "bg-emerald-50"
          } hover:bg-emerald-100 transition-all duration-150`}
        >
          <div>{getIcon(msg.title)}</div>

          <div className="flex-1" onClick={() => handleRead(msg._id)}>
            <p className={`text-sm ${msg.isRead ? "text-gray-600 shadow-lg" : "text-gray-800 font-medium"}`}
                >
              {msg.message}
            </p>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
            </span>
          </div>
        </div>
      ))}
      </>
      )
      :(
       <p className="text-red-950 rouded font-extralight"> No notifications right now !!</p>
     )
   }
    </div>
  );
};

export default NotificationList;
