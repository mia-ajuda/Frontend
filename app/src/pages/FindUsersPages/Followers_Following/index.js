import React, { useState, useEffect } from 'react';
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

const FollowersFollowingPage = ({ navigation, route }) => {
    
    // podem ser usuários seguidores ou seguindo
    const [usersProfile, setUsersProfile] = useState(null);
    
    const [isLoading, setIsLoading] = useState(true);

    const { profileId,isFollowersPage } = route.params;

    async function getUsersProfile () {
        let temp_usersProfile;
        let functionName = 'getFollowers';
        if(isFollowersPage){    
            functionName = 'getFollowers';
        }
        temp_usersProfile = await useService(
            socialNetworkProfileservice,
            functionName,
            [profileId],
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
