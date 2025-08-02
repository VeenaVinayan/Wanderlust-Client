import { createContext, useContext, useState, ReactNode } from "react";
import {TNotification  }from '../types/notificationTypes';
import {  changeNotificationStatus} from "../services/Notification/NotificationService";

interface NotificationContextType {
  notifications: TNotification[];
  clearAll:() => void,
  addNotification: (notification:TNotification) => void;
  markAllAsRead: () => void;
  markNotificationRead:(notificationId : string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProviderContext  = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const addNotification = (notification: TNotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };
  const clearAll = () => {
     setNotifications([]);
  }
  const markNotificationRead = async(notificationId : string) =>{
      try {
         const notification : TNotification | undefined = notifications.find((msg)=> msg._id === notificationId)
         if( !notification?.isRead ){ 
         const res = await changeNotificationStatus(notificationId,"User");
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
     }catch(err) {
         console.error("Failed to update notification:", err);
       }
     };
  
  return (
    <NotificationContext.Provider value={{ notifications,clearAll, addNotification, markAllAsRead, markNotificationRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext must be used inside NotificationProviderContext");
  return context;
};
