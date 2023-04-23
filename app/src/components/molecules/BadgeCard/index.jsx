import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export const BadgeCard = ({
    badgeTemplate,
    showLevel = false,
    hidden = false,
}) => {
    const iconBackgrounds = {
        1: 'bg-first-rank',
        2: 'bg-second-rank',
        3: 'bg-thirt-rank',
    };

    const getTitle = () => {
        return `${badgeTemplate.name.split(' ')[0]} ${badgeTemplate.name.slice(
            -1,
        )}`;
    };

    const title = showLevel ? `Nível ${badgeTemplate.rank}` : getTitle();
    const selectedIconBackground = hidden
        ? 'bg-gray'
        : iconBackgrounds[badgeTemplate.rank];

    const hiddenBadgeInfo = {
        iconName: 'help',
        description: '-',
        neededValue: '?',
        rank: badgeTemplate.rank,
    };
    const badgeInfo = hidden ? hiddenBadgeInfo : badgeTemplate;

    return (
        <View className="rounded-md p-4 bg-white shadow-md shadow-black items-center w-36 mx-2 h-48 justify-around">
            <View className={`rounded-full p-2 ${selectedIconBackground}`}>
                <Icon
                    name={badgeInfo.iconName}
                    color={'white'}
                    size={34}
                    type={hidden ? 'material-community' : 'material'}
                />
            </View>
            <View>
                <Text
                    className="font-ms-bold text-sm text-black text-center"
                    numberOfLines={1}
                >
                    {title}
                </Text>
                <Text
                    className="font-ms-regular text-xs text-black text-center w-32"
                    numberOfLines={2}
                >
                    {badgeInfo.description}
                </Text>
            </View>
            <Text className="font-ms-bold text-sm text-primary">
                {badgeInfo.neededValue}/{badgeInfo.neededValue}
            </Text>
        </View>
    );
};
