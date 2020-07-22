import api from '../services/Api';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

class UserService {
    async requestUserData(helperId = null) {
        let url;
        if (helperId) {
            url = `user/getUser/${helperId}`;
        } else {
            url = '/user/getUser';
        }
        const user = await api.get(url);
        return user.data;
    }

    async verifyUserInfo(value) {
        const response = await api.get(`/checkUserExistence/${value}`);
        return !!response.data;
    }

    async editUser(data, complement = '') {
        const user = await api.put(`/user${complement}`, data);
        return user.data;
    }

    async setUserDeviceId() {
        try {
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
                    throw 'Failed to get push token for push notification!';
                }
            }

            Notifications.getExpoPushTokenAsync()
                .then(async (pushToken) => {
                    await api.put('/user', { deviceId: pushToken });
                })
                .catch((error) => {
                    console.log(error);
                    console.log('Tente rodar "expo login"');
                });
        } catch {
            throw { error: 'Não foi possível recuperar Push Token!' };
        }
    }
}

const userService = new UserService();
Object.freeze(userService);

export default userService;
