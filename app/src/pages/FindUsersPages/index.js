import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import useService from '../../services/useService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import Input from '../../components/UI/input';
import colors from '../../../assets/styles/colorVariables';
//import { useIsFocused } from '@react-navigation/native';

const findUsers = ({ navigation }) => {
    const { user } = useContext(UserContext);

    const [isFindUserLoading, setFindUserLoading] = useState(false);
    const [usersProfile, setUsersProfile] = useState(null);
    const [findName, setFindName] = useState(null);

    //const isFocused = useIsFocused();

    async function setupPage() {
        setFindUserLoading(true);
        console.log('aqui');
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

    const profileCard = (profile) => {
        return (
            <TouchableOpacity
                key={profile._id}
                onPress={() =>
                    navigation.navigate('Perfil social dos Usuários', {
                        profileId: profile._id,
                        profileUsername: profile.username,
                        profileNumberOfFollowers: profile.numberOfFollowers,
                        profileNumberOfFollowing: profile.numberOfFollowing,
                        profilePhoto: profile.photo,
                        profileIsFollowing: profile.isFollowing,
                        userId: user._id,
                    })
                }>
                <View style={[styles.card, styles.elevation]}>
                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: `data:image/png;base64,${profile.photo}`,
                        }}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{profile.username}</Text>
                        <Text style={styles.text}>
                            Seguidores: {profile.numberOfFollowers}
                        </Text>
                        <Text style={styles.text}>
                            Seguindo: {profile.numberOfFollowing}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                {findUserinput()}
                {isFindUserLoading ? (
                    renderLoadingIndicator()
                ) : (
                    <View>
                        {usersProfile ? (
                            usersProfile.map((profile) => {
                                return profileCard(profile);
                            })
                        ) : (
                            <></>
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default findUsers;
