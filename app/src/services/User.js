import api from '../services/Api';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

class UserService {
    async requestUserData(userId = null) {
        let url;
        if (userId) {
            url = `user/getUser/${userId}`;
        } else {
            url = 'user/getUser';
        }
        const user = await api.get(url);
        return user.data;
    }

    async requestAnyTypeUserData(id) {
        const user = await api.get(`user/getAnyUser/${id}`);
        return user.data;
    }

    async editUserAdress(data) {
        const user = await api.put('user/address', data);
        return user.data;
    }

    async verifyUserInfo(value) {
        const response = await api.get(`checkUserExistence/${value}`);

        return !!response.data;
    }

    async editUser(data, complement = '') {
        const user = await api.put(`user${complement}`, data);
        return user.data;
    }

    async setUserDeviceId() {
        if (Constants.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                throw new Error(
                    'Failed to get push token for push notification!',
                );
            }
        }

        await Notifications.getExpoPushTokenAsync().then(async (pushToken) => {
            await api.put('/user', { deviceId: pushToken });
        });
    }
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
