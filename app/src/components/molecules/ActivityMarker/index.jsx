import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Marker } from 'react-native-maps';
import colors from '../../../../assets/styles/colorVariables';
import navigateToDescription from '../../../utils/navigateToDescription';
import { UserContext } from '../../../store/contexts/userContext';
import { useNavigation } from '@react-navigation/core';
import getActivityIcon from '../../../utils/getActivityIcon';

export const ActivityMarker = ({ activity, activityType, index }) => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation();

    const types = {
        help: {
            text: 'Pedido',
        },
        offer: {
            text: 'Oferta',
        },
        campaign: {
            text: 'Campanha',
        },
    };

    const selectedType = types[activityType];
    const icon = getActivityIcon(activityType);
    const isRiskGroup = activity.user?.riskGroup?.length > 0;

    const handleNavigate = () => {
        navigateToDescription(activityType, user, navigation, activity);
    };

    return (
        <Marker
            tracksViewChanges={false}
            coordinate={{
                latitude:
                    activity.location?.coordinates[1] ??
                    activity.user.location.coordinates[1],
                longitude:
                    activity.location?.coordinates[0] ??
                    activity.user.location.coordinates[0],
            }}
            onPress={handleNavigate}
        >
            <View className="bg-white py-1 px-2 w-32 rounded-full rounded-bl-none shadow-sm shadow-black flex-row items-center justify-center">
                <Icon
                    name={icon.name}
                    type={icon.type}
                    size={18}
                    color={
                        isRiskGroup
                            ? colors['danger-400']
                            : colors['primary-400']
                    }
                />
                <Text
                    className="ml-2 text-xs font-ms-semibold text-black overflow-hidden "
                    numberOfLines={1}
                >
                    {selectedType.text} {index}
                </Text>
            </View>
        </Marker>
    );
};
