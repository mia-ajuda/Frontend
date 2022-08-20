import React, {useContext } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,    
} from 'react-native';
import styles from './styles';
import { UserContext } from '../../store/contexts/userContext';
export default function ProfileList({usersProfile, navigation}) {

    if(!usersProfile){
        console.log("Erro");
        return (<></>);
    }

    const { user } = useContext(UserContext);
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
                        profileUserId: profile.userId,
                    })
                }
            >
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
        <View>
        {usersProfile ? (
            usersProfile.map((profile) => {
                return profileCard(profile);
            })
        ) : (
            <></>
        )}
        </View>
    );

}