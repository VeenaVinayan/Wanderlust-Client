import axiosInstance from '../apiStore/api';
import { Notification_Route } from '../Constants/RouteValues';

class Notification{
 
  async getAllNotifications(userId: string, role: string) {
    try {
      const { data } = await axiosInstance.get(`/${role}${Notification_Route.NOTIFICATIONS}/${userId}`);
      return data.data;
    } catch (err) {
      console.error("Error fetching notifications:", err);
      throw err;
    }
  }

  async changeNotificationStatus(notificationId: string, role: string): Promise<boolean> {
    try {
      const { data } = await axiosInstance.patch(`/${role}${Notification_Route.NOTIFICATIONS}/${notificationId}`);
      return data.success ?? false;
    } catch (err) {
      console.error("Error changing notification status:", err);
      throw err;
    }
  }
}

export default new Notification();
