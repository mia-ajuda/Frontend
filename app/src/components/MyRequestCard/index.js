import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import { Badge } from 'react-native-elements';
import HistoricCard from '../HistoricCard';

import styles from './styles';

export default function MyRequestCard({
    object,
    setConfirmationModalVisible,
    setSelectedHelp,
    isEntityUser,
}) {
    function handleDelete() {
        setConfirmationModalVisible(true);
        setSelectedHelp(object._id);
    }

    const renderBadgeIcon = () => {
        if (
            object.possibleHelpers.length > 0 ||
            object.possibleEntities.length > 0
        ) {
            return (
                <Badge
                    value={
                        <Text style={styles.labelBadge}>
                            {' '}
                            {object.possibleHelpers.length +
                                object.possibleEntities.length}{' '}
                        </Text>
                    }
                    badgeStyle={styles.badgeStyle}
                    containerStyle={styles.containerBadge}
                />
            );
        } else if (object.finishedCampaignList.length > 0) {
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
            <View style={styles.deleteIcon}>
                <Icon
                    size={25}
                    name="trash"
                    type="font-awesome"
                    color={colors.danger}
                    onPress={() => handleDelete()}
                />
            </View>
        </HistoricCard>
    );
}
