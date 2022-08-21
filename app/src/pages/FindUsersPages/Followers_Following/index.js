import React, { useState,useContext, useEffect } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import styles from '../SocialNetworkProfile/styles';
import useService from '../../../services/useService';
import socialNetworkProfileservice from '../../../services/socialNetworkProfile';
import findUserPageStyles from '../styles';
import colors from '../../../../assets/styles/colorVariables';
import ProfileList from '../../../components/profileList';
import { UserContext } from '../../../store/contexts/userContext';
const FollowersFollowingPage = ({ navigation, route }) => {
    
    const { user } = useContext(UserContext);

    // podem ser usuários seguidores ou seguindo
    const [usersProfile, setUsersProfile] = useState(null);
    
    const [isLoading, setIsLoading] = useState(true);

    const { selectedProfileId,isFollowersPage } = route.params;

    async function getUsersProfile () {
        let temp_usersProfile;
        let functionName = 'getFollowing';
        if(isFollowersPage){    
            functionName = 'getFollowers';
        }
        temp_usersProfile = await useService(
            socialNetworkProfileservice,
            functionName,
            [user._id, selectedProfileId],
        );
        setUsersProfile(temp_usersProfile);
        setIsLoading(false);
        console.log("users = " + temp_usersProfile);
    }


    useEffect(() => {
        setIsLoading(true);
        getUsersProfile();
    }, []);


    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                style={findUserPageStyles.loading}
                size="large"
                color={colors.primary}
            />
        </View>
    );

    return (
        <View style={styles.cardContainer}>
            {isLoading ? (
                renderLoadingIndicator()
            ) : (
                <ScrollView>
                    <ProfileList 
                        usersProfile={usersProfile} 
                        navigation={navigation}
                    />
                </ScrollView>
            )}
        </View>
       
    );
};

export default FollowersFollowingPage;
