import React from 'react';
import { View, Text } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import HelpCard from '../HelpCard';

import styles from './styles';

export default function MyRequestHelpCard({
    help,
    setConfirmationModalVisible,
    setSelectedHelp,
    isEntityUser,
}) {
    function handleDelete() {
        setConfirmationModalVisible(true);
        setSelectedHelp(help._id);
    }

    const renderBadgeIcon = () => {
        if (
            help?.possibleHelpers.length > 0 ||
            help?.possibleEntities.length > 0
        ) {
            return (
                <Badge
                    value={
                        <Text style={styles.labelBadge}>
                            {help?.possibleHelpers.length +
                                help?.possibleEntities.length}
                        </Text>
                    }
                    badgeStyle={styles.badgeStyle}
                    containerStyle={styles.containerBadge}
                />
            );
        }
    };

    return (
        <HelpCard {...{ help }}>
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
        </HelpCard>
    );
}
