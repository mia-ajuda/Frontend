import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import callService from '../../services/callService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import colors from '../../../assets/styles/colorVariables';
import ProfileList from '../../components/profileList';
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from '../../components/atoms/SearchBar';
import { LoadingContext } from '../../store/contexts/loadingContext';

const FindUsers = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [usersProfile, setUsersProfile] = useState(null);
    const [findName, setFindName] = useState(null);

    async function setupPage() {
        setIsLoading(true);
        const findUserTemp = await callService(
            socialNetworkProfileservice,
            'findUsersProfiles',
            [user._id, findName],
        );

        setUsersProfile(findUserTemp);
        setIsLoading(false);
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

    return (
        <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                <SearchBar
                    value={findName}
                    setValue={setFindName}
                    placeholder="Ex: Maria"
                />
                {!isLoading && (
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
