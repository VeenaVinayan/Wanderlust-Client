// src/providers/NotificationProvider.tsx
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useNotificationContext } from "../context/NotificationContext";
import { TNotification } from '../types/notificationTypes';

const NotificationProvider = () => {
  const { socket } = useSocket();
  const { addNotification } = useNotificationContext();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (data: TNotification) => {
         addNotification(data);
    };

    socket.on("new-notification", handleNotification);

    return () => {
      socket.off("new-notification", handleNotification);
    };
  }, [socket, addNotification]);

  return null;
};

export default NotificationProvider;
