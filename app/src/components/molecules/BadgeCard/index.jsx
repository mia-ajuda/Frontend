import React from 'react';
import { Text, View } from 'react-native';
import { CircleBadge } from '../../atoms/CircleBadge';

export const BadgeCard = ({
    badgeTemplate,
    showLevel = false,
    hidden = false,
}) => {
    const getTitle = () => {
        return `${badgeTemplate.name.split(' ')[0]} ${badgeTemplate.rank}`;
    };

    const title = showLevel ? `Nível ${badgeTemplate.rank}` : getTitle();

    const hiddenBadgeInfo = {
        iconName: 'help',
        description: '-',
        neededValue: '?',
        rank: badgeTemplate.rank,
    };
    const badgeInfo = hidden ? hiddenBadgeInfo : badgeTemplate;

    return (
        <View className="rounded-md p-4 bg-white shadow-md shadow-black items-center w-36 mx-2 h-48 justify-around">
            <CircleBadge
                badgeIcon={badgeInfo.iconName}
                rank={badgeTemplate.rank}
                isHidden={hidden}
            />
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
