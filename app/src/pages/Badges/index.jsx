import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BadgeContext } from '../../store/contexts/badgeContext';
import { BadgeCard } from '../../components/molecules/BadgeCard';
import { HorizontalList } from '../../components/organisms/HorizontalList';

export const Badges = ({ route }) => {
    const { userId } = route.params;
    const { getBadgesHistory } = useContext(BadgeContext);
    const [badges, setBadges] = useState({});

    const getBadgesInfo = async () => {
        const response = await getBadgesHistory(userId);
        setBadges(response);
    };

    useEffect(() => {
        getBadgesInfo();
    }, []);

    return (
        <ScrollView className="p-4 flex-1">
            {badges.allBadges &&
                Object.keys(badges.allBadges)?.map((category) => (
                    <View key={badges.allBadges[category].title}>
                        <View className="flex-row justify-between">
                            <Text className="font-ms-bold text-lg">
                                {badges.allBadges[category].title}
                            </Text>
                        </View>
                        <HorizontalList className="max-h-52">
                            {badges.allBadges[category].badges.map((badge) => {
                                const currentLevel =
                                    badges.userBadges[category]?.badge?.template
                                        ?.rank || 0;
                                return (
                                    <BadgeCard
                                        badgeTemplate={badge}
                                        hidden={badge.rank > currentLevel}
                                        key={badge._id}
                                        showLevel
                                    />
                                );
                            })}
                        </HorizontalList>
                    </View>
                ))}
        </ScrollView>
    );
};
