import api from '../services/Api';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

class EntityService {
    async requestEntityData(userId = null) {
        let url;
        if (userId) {
            url = `entity/getEntity/${userId}`;
        } else {
            url = 'entity/getEntity';
        }
        const user = await api.get(url);
        return user.data;
    }

    async editEntityAdress(data) {
        const entity = await api.put('/entity/address', data);
        return entity.data;
    }

    async verifyEntityInfo(value) {
        const response = await api.get(`/checkEntityExistence/${value}`);
        return !!response.data;
    }

    async editEntity(data, complement = '') {
        const entity = await api.put(`/entity${complement}`, data);
        return entity.data;
    }

    async setEntityDeviceId() {
        try {
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
                    throw 'Failed to get push token for push notification!';
                }
            }

            Notifications.getExpoPushTokenAsync()
                .then(async (pushToken) => {
                    await api.put('/entity', { deviceId: pushToken });
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

const entityService = new EntityService();
Object.freeze(entityService);

export default entityService;
