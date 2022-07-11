import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import Button from '../../components/UI/button';

const socialNetworkProfilePage = ({ route }) => {
    const [follow_button_name, set_follow_button_name] = useState('Seguir');

    const {
        profileId,
        profileUsername,
        profileNumberOfFollowers,
        profileNumberOfFollowing,
        profilePhoto,
    } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                <Image
                    style={styles.profileImage}
                    source={{
                        uri: `data:image/png;base64,${profilePhoto}`,
                    }}
                />

                <View style={styles.smallerInfoContainer}>
                    <View style={styles.nameAndFollowButtonContainer}>
                        <Text style={styles.name}>{profileUsername}</Text>
                        <Button
                            title={follow_button_name}
                            type="default"
                            press={() => {
                                let button_name =
                                    follow_button_name == 'Seguir'
                                        ? 'Seguindo'
                                        : 'Seguir';
                                set_follow_button_name(button_name);
                            }}
                        />
                    </View>
                    <View style={styles.followerFollowingContainer}>
                        <Text style={styles.text}>
                            {profileNumberOfFollowers} Seguidores
                        </Text>
                        <Text style={styles.text}>
                            {profileNumberOfFollowing} Seguindo
                        </Text>
                    </View>
                    <Text style={styles.text}>{profileId}</Text>
                </View>
            </View>
            <View style={styles.profileCardContainer}>
                <Image
                    style={styles.profileImage}
                    source={{
                        uri: `data:image/png;base64,${profilePhoto}`,
                    }}
                />
            </View>
        </View>
    );
};

export default socialNetworkProfilePage;

// return (
//     <View
//         style={[
//             styles.component
//         ]}
//         >
//         <View style = {styles.profileInfo}>
//             <Image style = {styles.profileImage}
//                 source={{
//                     uri: `data:image/png;base64,${profilePhoto}`,
//                 }}
//             />
//             <View style = {styles.profileInfo2}>
//                 <View style = {styles.textContainer}>
//                     <Text style = {styles.textName}>
//                         {profileUsername}
//                     </Text>

//                 </View>
//                 <View style = {styles.followerFollowing}>
//                     <Text style={styles.text}>
//                         {profileNumberOfFollowers}
//                         {' '}Seguidores
//                     </Text>
//                     <Text style={styles.text}>
//                         {profileNumberOfFollowing}
//                         {' '}Seguindo
//                     </Text>
//                 </View>
//                 <View style= {styles.buttonView}>
//                     <Button
//                                 title={follow_button_name}
//                                 type="default"
//                                 press={() => {
//                                     let button_name = follow_button_name == "Seguir"?"Seguindo":"Seguir";
//                                     set_follow_button_name(button_name);

//                                     }
//                                 }
//                     />
//                 </View>
//             </View>
//         </View>

//     </View>
// )
