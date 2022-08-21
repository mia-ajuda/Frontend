import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import useService from '../../services/useService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import Input from '../../components/UI/input';
import colors from '../../../assets/styles/colorVariables';
import ProfileList from '../../components/profileList';

const FindUsers = ({ navigation }) => {
    const { user } = useContext(UserContext);

    const [isFindUserLoading, setFindUserLoading] = useState(false);
    const [usersProfile, setUsersProfile] = useState(null);
    const [findName, setFindName] = useState(null);

    //const isFocused = useIsFocused();

    async function setupPage() {
        setFindUserLoading(true);
        const findUserTemp = await useService(
            socialNetworkProfileservice,
            'findUsersProfiles',
            [user._id, findName],
        );

        setUsersProfile(findUserTemp);
        setFindUserLoading(false);
    }

    useEffect(() => {
        const willFocus = navigation.addListener('focus', () => {
            setupPage();
        });

        return willFocus;
    }, [navigation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            findName ? setupPage() : setUsersProfile(null);
        }, 500);

        return () => clearTimeout(timer);
    }, [findName]);

    const renderLoadingIndicator = () => (
        // <View style={styles.loadingContainer}>
        <ActivityIndicator
            style={styles.loading}
            size="large"
            color={colors.primary}
        />
        // </View>
    );

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
                {isFindUserLoading ? (
                    renderLoadingIndicator()
                ) : ( <ProfileList 
                        usersProfile={usersProfile} 
                        navigation={navigation}
                    />
                )
                }
            </View>
        </ScrollView>
    );
};

export default FindUsers;
