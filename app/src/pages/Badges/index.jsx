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
                Object.values(badges.allBadges)?.map((badges, i) => (
                    <View key={i}>
                        <View className="flex-row justify-between">
                            <Text className="font-ms-bold text-lg">
                                {badges.title}
                            </Text>
                        </View>
                        <HorizontalList className="max-h-52">
                            {badges.badges.map((badge, j) => (
                                <BadgeCard
                                    badgeTemplate={badge}
                                    key={j}
                                    pressable
                                />
                            ))}
                        </HorizontalList>
                    </View>
                ))}
        </ScrollView>
    );
};
