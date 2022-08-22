import React, { useContext, createContext, useState, useEffect } from 'react';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from './userContext';
import useService from '../../services/useService';
export const SocialNetworkProfileContext = createContext();

export default function SocialNetworkProfileContextProvider ({ children }) {
    
    const { user } = useContext(UserContext);
   
    
    const [userSocialNetworkProfile, setUserSocialNetworkProfile] = useState(null);

    useEffect(() => {
        
        if (user._id) {
            getUserProfile(user._id);
        }
        
    }, [user._id]);


    async function getUserProfile(userId) {
        const temp_userProfile = await useService(
            socialNetworkProfileservice,
            'getUserProfile',
            [userId],
        );
        setUserSocialNetworkProfile(temp_userProfile);
    }

    return (
        <SocialNetworkProfileContext.Provider value={{userSocialNetworkProfile,setUserSocialNetworkProfile}}>
            {children}
        </SocialNetworkProfileContext.Provider>
    );
};
