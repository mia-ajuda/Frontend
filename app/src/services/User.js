import api from '../services/Api';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
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
        console.log(`checkUserExistence/${value}`);
        const response = await api.get(`checkUserExistence/${value}`);
        return !!response.data;
    }

    async editUser(data, complement = '') {
        const user = await api.put(`user${complement}`, data);
        return user.data;
    }

    async setUserDeviceId() {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS,
            );
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS,
                );
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
