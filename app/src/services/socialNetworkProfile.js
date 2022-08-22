import api from './Api';

class SocialNetworkProfileService {
    constructor() {}

    async findUsersProfiles(userId, username = null) {
        if (!username) {
            username = null;
        }

        const url = `/socialNetworkProfile/findUsers/${userId}/${username}`;
        const usersProfiles = await api.get(url);
        return usersProfiles.data;
    }

    async followUser(selectedProfileId, userId = null) {
        const url = `/socialNetworkProfile/followUser/${selectedProfileId}/${userId}`;
        const followUser = await api.put(url);
        return followUser.data;
    }

    async unfollowUser(selectedProfileId, userId = null) {
        const url = `/socialNetworkProfile/unfollowUser/${selectedProfileId}/${userId}`;
        const unfollowUser = await api.put(url);
        return unfollowUser.data;
    }

    async getUserActivities(userId) {
        const url = `/socialNetworkProfile/getUserActivities/${userId}`;
        const usersActivities = await api.get(url);
        return usersActivities.data;
    }

    async getFollowers(userId,selectedProfileId)
    {
        const url = `/socialNetworkProfile/getFollowers/${userId}/${selectedProfileId}`;
        const followers = await api.get(url);
        return followers.data;
    }

    async getFollowing(userId,selectedProfileId)
    {
        const url = `/socialNetworkProfile/getFollowing/${userId}/${selectedProfileId}`;
        const following = await api.get(url);
        return following.data;
    }

    async getUserProfile(userId)
    {
        const url = `/socialNetworkProfile/getUserProfile/${userId}`;
        const userProfile = await api.get(url);
        return userProfile.data;
    }
}

const socialNetworkProfileservice = new SocialNetworkProfileService();
Object.freeze(socialNetworkProfileservice);
export default socialNetworkProfileservice;
