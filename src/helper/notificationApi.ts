import axiosInstance from '../apiStore/api';

class NotificationApi {
 
  async getAllNotifications(userId: string, role: string) {
    try {
      const { data } = await axiosInstance.get(`/${role}/notifications/${userId}`);
      console.log("Data :: Notifications ::", data.data);
      return data.data;
    } catch (err) {
      console.error("Error fetching notifications:", err);
      throw err;
    }
  }

  async changeNotificationStatus(notificationId: string, role: string): Promise<boolean> {
    try {
      const { data } = await axiosInstance.patch(`/${role}/notifications/${notificationId}`);
      return data.success ?? false;
    } catch (err) {
      console.error("Error changing notification status:", err);
      throw err;
    }
  }
}

export default new NotificationApi();
