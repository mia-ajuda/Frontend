import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../SocialNetworkProfile/styles';
import callService from '../../../services/callService';
import socialNetworkProfileservice from '../../../services/socialNetworkProfile';
import ProfileList from '../../../components/profileList';
import { UserContext } from '../../../store/contexts/userContext';
import { LoadingContext } from '../../../store/contexts/loadingContext';
const FollowersFollowingPage = ({ navigation, route }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    // podem ser usuários seguidores ou seguindo
    const [usersProfile, setUsersProfile] = useState(null);

    const { selectedProfileId, isFollowersPage } = route.params;

    async function getUsersProfile() {
        let temp_usersProfile;
        let functionName = 'getFollowing';
        if (isFollowersPage) {
            functionName = 'getFollowers';
        }
        temp_usersProfile = await callService(
            socialNetworkProfileservice,
            functionName,
            [user._id, selectedProfileId],
        );
        setUsersProfile(temp_usersProfile);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        getUsersProfile();
    }, []);

    return (
        <View style={styles.cardContainer}>
            {!isLoading && (
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
