import React from 'react';
import { NotFound } from '../NotFound';
import { HorizontalList } from '../HorizontalList';
import { useNavigation } from '@react-navigation/native';
import { BadgeCard } from '../../molecules/BadgeCard';

export const BadgesList = ({ badges }) => {
    const navigation = useNavigation();

    const handleOpenBadgeScreen = () => {
        navigation.navigate('badges', { userId });
    };

    return badges.length > 0 ? (
        <HorizontalList
            className="max-h-56"
            showMoreButton
            onPressMoreButton={handleOpenBadgeScreen}
        >
            {badges.map((badge, i) => (
                <BadgeCard badgeTemplate={badge.template} key={i} />
            ))}
        </HorizontalList>
    ) : (
        <NotFound title="Usuário não possui conquistas" size="small" />
    );
};
