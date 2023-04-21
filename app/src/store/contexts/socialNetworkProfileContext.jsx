import React, {
    useContext,
    createContext,
    useState,
    useEffect,
    useMemo,
} from 'react';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from './userContext';
import callService from '../../services/callService';
export const SocialNetworkProfileContext = createContext();

export default function SocialNetworkProfileContextProvider({ children }) {
    const { user } = useContext(UserContext);

    const [userSocialNetworkProfile, setUserSocialNetworkProfile] =
        useState(null);

    useEffect(() => {
        if (user._id) {
            getUserProfile(user._id);
        }
    }, [user._id]);

    async function getUserProfile(userId) {
        const userProfileInfo = await callService(
            socialNetworkProfileservice,
            'getUserProfile',
            [userId],
        );
        return userProfileInfo;
    }

    async function getActivities(userId) {
        let activities = await callService(
            socialNetworkProfileservice,
            'getUserActivities',
            [userId],
        );
        return activities;
    }

    async function followUser(selectedProfileId) {
        return await callService(socialNetworkProfileservice, 'unfollowUser', [
            selectedProfileId,
            user._id,
        ]);
    }

    async function unfollowUser(selectedProfileId) {
        return await callService(socialNetworkProfileservice, 'followUser', [
            selectedProfileId,
            user._id,
        ]);
    }

    async function getFollows(followType, selectedProfileId) {
        const requestName = {
            followers: 'getFollowers',
            following: 'getFollowing',
        };
        return await callService(
            socialNetworkProfileservice,
            requestName[followType],
            [selectedProfileId, user._id],
        );
    }

    const contextValue = useMemo(() => {
        return {
            getUserProfile,
            userSocialNetworkProfile,
            setUserSocialNetworkProfile,
            followUser,
            unfollowUser,
            getActivities,
            getFollows,
        };
    }, [userSocialNetworkProfile, followUser, unfollowUser]);

    return (
        <SocialNetworkProfileContext.Provider value={contextValue}>
            {children}
        </SocialNetworkProfileContext.Provider>
    );
}
