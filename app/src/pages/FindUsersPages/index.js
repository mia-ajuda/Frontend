import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import callService from '../../services/callService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import colors from '../../../assets/styles/colorVariables';
import ProfileList from '../../components/profileList';
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from '../../components/atoms/SearchBar';
const FindUsers = ({ navigation }) => {
    const { user } = useContext(UserContext);

    const [isFindUserLoading, setFindUserLoading] = useState(false);
    const [usersProfile, setUsersProfile] = useState(null);
    const [findName, setFindName] = useState(null);

    async function setupPage() {
        setFindUserLoading(true);
        const findUserTemp = await callService(
            socialNetworkProfileservice,
            'findUsersProfiles',
            [user._id, findName],
        );

        setUsersProfile(findUserTemp);
        setFindUserLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            setupPage();
        }, [navigation]),
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            findName ? setupPage() : setUsersProfile(null);
        }, 500);

        return () => clearTimeout(timer);
    }, [findName]);

    const renderLoadingIndicator = () => (
        <ActivityIndicator
            style={styles.loading}
            size="large"
            color={colors.primary}
        />
    );

    return (
        <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                <SearchBar
                    value={findName}
                    setValue={setFindName}
                    placeholder="Ex: Maria"
                />
                {isFindUserLoading ? (
                    renderLoadingIndicator()
                ) : (
                    <ProfileList
                        usersProfile={usersProfile}
                        navigation={navigation}
                    />
                )}
            </View>
        </ScrollView>
    );
};

export default FindUsers;
