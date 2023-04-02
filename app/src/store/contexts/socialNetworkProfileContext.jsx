import React, { useContext, createContext, useState, useEffect } from 'react';
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
        const temp_userProfile = await callService(
            socialNetworkProfileservice,
            'getUserProfile',
            [userId],
        );
        setUserSocialNetworkProfile(temp_userProfile);
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

    return (
        <SocialNetworkProfileContext.Provider
            value={{
                userSocialNetworkProfile,
                setUserSocialNetworkProfile,
                followUser,
                unfollowUser,
            }}
        >
            {children}
        </SocialNetworkProfileContext.Provider>
    );
}
