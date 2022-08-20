import api from './Api';

class SocialNetworkProfileService {
    constructor() {}

    async findUsersProfiles(userId, username = null) {
        if (!username) {
            username = null;
        }

        const url = `/socialNetworkProfile/findUsers/${userId}/${username}`;
        console.log(url);
        const usersProfiles = await api.get(url);
        return usersProfiles.data;
    }

    async followUser(followerId, userId = null) {
        const url = `/socialNetworkProfile/followUser/${followerId}/${userId}`;
        const followUser = await api.put(url);
        return followUser.data;
    }

    async unfollowUser(followerId, userId = null) {
        const url = `/socialNetworkProfile/unfollowUser/${followerId}/${userId}`;
        const unfollowUser = await api.put(url);
        return unfollowUser.data;
    }

    async getUserActivities(userId) {
        const url = `/socialNetworkProfile/getUserActivities/${userId}`;
        console.log(url);
        const usersActivities = await api.get(url);
        console.log("passei da data");
        return usersActivities.data;
    }

    async getFollowers(userId)
    {
        const url = `/socialNetworkProfile/getFollowers/${userId}`;
        const followers = await api.get(url);
        return followers.data;
    }
}

const socialNetworkProfileservice = new SocialNetworkProfileService();
Object.freeze(socialNetworkProfileservice);
export default socialNetworkProfileservice;
