import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import callService from '../../services/callService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import Input from '../../components/UI/input';
import ProfileList from '../../components/profileList';
import { useFocusEffect } from '@react-navigation/native';
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

    const findUserinput = () => {
        return (
            <Input
                change={(name) => setFindName(name)}
                label={'Pesquisar'}
                placeholder={'Digite o nome do usuário'}
                value={findName}
                keyboard={'default'}
            />
        );
    };

    return (
        <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                {findUserinput()}
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
