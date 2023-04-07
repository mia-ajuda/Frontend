import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './styles';
import callService from '../../services/callService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import ProfileList from '../../components/profileList';
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from '../../components/atoms/SearchBar';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { NotFound } from '../../components/organisms/NotFound';
import { UpdaterContext } from '../../store/contexts/updaterContext';

const FindUsers = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { shouldUpdate, setShouldUpdate } = useContext(UpdaterContext);

    const [usersProfile, setUsersProfile] = useState([]);
    const hasUsers = usersProfile.length > 0;
    const [findName, setFindName] = useState('');

    async function setupPage() {
        setIsLoading(true);
        const findUserTemp = await callService(
            socialNetworkProfileservice,
            'findUsersProfiles',
            [user._id, findName],
        );
        console.log(findUserTemp);
        if (findUserTemp) setUsersProfile(findUserTemp);
        else setUsersProfile([]);
        setIsLoading(false);
        setShouldUpdate(false);
    }

    useFocusEffect(
        useCallback(() => {
            setupPage();
        }, [navigation]),
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setupPage();
        }, 500);

        return () => clearTimeout(timer);
    }, [findName, shouldUpdate]);

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

                {!hasUsers && (
                    <NotFound
                        body={
                            'Nenhum usuário com o nome digitado foi encontrado'
                        }
                    />
                )}
            </View>
        </ScrollView>
    );
};

export default FindUsers;
