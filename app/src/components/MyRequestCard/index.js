import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import HistoricCard from '../HistoricCard';

import styles from './styles';

export default function MyRequestCard({
    object,
    setConfirmationModalVisible,
    setSelectedHelp,
    possibleInterestedList,
    isEntityUser,
    deleteVisible = true,
}) {
    function handleDelete() {
        setConfirmationModalVisible(true);
        setSelectedHelp(object._id);
    }

    const renderBadgeIcon = () => {
        const possibleInterestedSize =
            possibleInterestedList.length + object.possibleEntities.length;
        if (possibleInterestedSize > 0) {
            return (
                <Badge
                    value={
                        <Text style={styles.labelBadge}>
                            {' '}
                            {possibleInterestedSize}{' '}
                        </Text>
                    }
                    badgeStyle={styles.badgeStyle}
                    containerStyle={styles.containerBadge}
                />
            );
        } else if (isEntityUser && object.finishedCampaignList.length > 0) {
            return (
                <Badge
                    value={
                        <Text style={styles.labelBadgeCampaign}>
                            {' '}
                            {object.finishedCampaignList.length +
                                object.possibleEntities.length}{' '}
                        </Text>
                    }
                    badgeStyle={styles.badgeStyle}
                    containerStyle={styles.containerBadge}
                />
            );
        }
    };

    return (
        <HistoricCard {...{ object }}>
            {!isEntityUser && renderBadgeIcon()}
            {deleteVisible && (
                <View style={styles.deleteIcon}>
                    <Icon
                        size={25}
                        name="trash"
                        type="font-awesome"
                        color={colors.danger}
                        onPress={() => handleDelete()}
                    />
                </View>
            )}
        </HistoricCard>
    );
}
