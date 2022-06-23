import api from './Api';

class SocialNetworkProfileService {
    constructor() {}

    async findUsersProfiles(userId, username = null) {
        const url = `/socialNetworkProfile/findUsers/${userId}/${username}`;
        console.log(url);
        const usersProfiles = await api.get(url);
        return usersProfiles.data;
    }
}

const socialNetworkProfileservice = new SocialNetworkProfileService();
Object.freeze(socialNetworkProfileservice);
export default socialNetworkProfileservice;
