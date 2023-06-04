import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwindConfig from '../../../../tailwind.config';
import Badge from '../../molecules/Badge';
import navigateToDescription from '../../../utils/navigateToDescription';
import { ActivitiesContext } from '../../../store/contexts/activitiesContext';
import { UserContext } from '../../../store/contexts/userContext';
import { useNavigation } from '@react-navigation/native';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import getActivityIcon from '../../../utils/getActivityIcon';
import SeedlingIcon from '../../../../assets/images/Seedling';
import isRecentDate from '../../../utils/isRecentDate';

export const ActivityCard = ({
    variant,
    title,
    description,
    badges,
    isRiskGroup = false,
    distance,
    count,
    id,
    creationDate,
}) => {
    const { getActitivtieById } = useContext(ActivitiesContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    const navigation = useNavigation();
    const isNewActivity = isRecentDate(creationDate);

    const activitiesVariants = {
        help: {
            translation: 'Pedido',
        },
        offer: {
            translation: 'Oferta',
        },
        campaign: {
            translation: 'Campanha',
        },
    };
    const selectedVariant = activitiesVariants[variant];
    const icon = getActivityIcon(variant);
    const color = {
        font: isRiskGroup ? 'text-danger' : 'text-primary-400',
        icon: isRiskGroup
            ? tailwindConfig.theme.extend.colors.danger
            : tailwindConfig.theme.extend.colors.primary[400],
    };

    const handleClick = async () => {
        setIsLoading(true);
        const activity = await getActitivtieById(variant, id);
        setIsLoading(false);
        if (!activity.error)
            navigateToDescription(user, navigation, activity, variant);
    };

    return (
        <Pressable
            className="rounded-2xl shadow-md shadow-black p-4 mr-2 bg-white w-72 h-40"
            onPress={handleClick}
            android_ripple={{
                color: tailwindConfig.theme.extend.colors.gray.DEFAULT,
            }}
        >
            <View className="flex-row items-center mb-2">
                <Icon
                    name={icon.name}
                    size={18}
                    color={color.icon}
                    type={icon.type}
                />
                <Text className={`${color.font} font-ms-bold ml-1 text-base`}>
                    {`${selectedVariant.translation} ${count}`}
                </Text>
                {isNewActivity && <SeedlingIcon className="ml-auto" />}
            </View>
            <Text
                className="max-w-sm text-primary font-ms-semibold text-base"
                numberOfLines={1}
            >
                {title}
            </Text>
            <Text
                className="text-black text-xs font-ms-regular"
                numberOfLines={2}
            >
                {description}
            </Text>
            <View className="flex-row justify-between mt-auto">
                {badges && <Badge title={badges[0].name} />}
                <Text className="font-ms-bold text-black">
                    {distance?.split(' ').join('')}
                </Text>
            </View>
        </Pressable>
    );
};
