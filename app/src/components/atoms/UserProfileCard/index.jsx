import React, { Fragment } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ProfilePhoto } from '../../molecules/ProfilePhoto';
import formatPhone from '../../../utils/formatPhone';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tailwindConfig from '../../../../tailwind.config';

export const UserProfileCard = ({ user }) => {
    const { _id, photo, phone, name, email } = user;
    const navigation = useNavigation();

    const handlenavigate = () => {
        navigation.navigate('socialUserProfile', {
            userId: _id,
        });
    };

    const textPattern = 'text-black text-sm';
    return (
        <Pressable
            className="border border-gray-contrast px-4 py-4 rounded-xl flex-row items-center"
            android_ripple={{
                color: tailwindConfig.theme.extend.colors.gray.contrast,
            }}
            onPress={() => handlenavigate()}
        >
            {user && (
                <Fragment>
                    <ProfilePhoto size={'md'} base64={photo} />
                    <View className="ml-3">
                        <Text
                            className={`font-ms-bold ${textPattern}`}
                            numberOfLines={1}
                        >
                            {name}
                        </Text>
                        <Text
                            className={`font-ms-regular ${textPattern}`}
                            numberOfLines={1}
                        >
                            {formatPhone(phone)}
                        </Text>
                        <Text
                            className={`font-ms-regular ${textPattern}`}
                            numberOfLines={1}
                        >
                            {email}
                        </Text>
                    </View>
                    <View className="absolute right-0">
                        <Icon name="chevron-right" size={42} color="#353535" />
                    </View>
                </Fragment>
            )}
        </Pressable>
    );
};
