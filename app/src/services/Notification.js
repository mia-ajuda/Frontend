import api from "./Api";

class NotificationService {

    async getAllNotifications(userId) {
        let url = `/notification/user/${userId}`;  

        const allNotifications = await api.get(url);
        return allNotifications.data;
    };

}

const notificationService = new NotificationService();
Object.freeze(notificationService);
export default notificationService;