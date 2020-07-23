import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import { Badge } from 'react-native-elements';

import styles from './styles';

export default function ListCard({
    help,
    isRiskGroup,
    deleteVisible,
    setConfirmationModalVisible,
    setSelectedHelp,
}) {
    function handleDelete() {
        setConfirmationModalVisible(true);
        setSelectedHelp(help._id);
    }
    return (
        <View
            style={[
                isRiskGroup && {
                    borderRightColor: colors.danger,
                    borderRightWidth: 10,
                },
                styles.cardContainer,
            ]}>
            <Badge
                value={<Text style={styles.labelBadge}>2</Text>}
                badgeStyle={styles.badgeStyle}
                containerStyle={styles.containerBadge}
            />

            <View style={styles.cardTitle}>
                <Text numberOfLines={1} style={styles.titleContent}>
                    {help.title}
                </Text>
            </View>
            <View style={styles.cardDescription}>
                <Text numberOfLines={3} style={styles.descriptionContent}>
                    {help.description}
                </Text>
                <View style={styles.bottomItens}>
                    <View style={styles.categoryWarning}>
                        <Text style={styles.categoryName}>
                            {help.category[0].name}
                        </Text>
                    </View>
                    {deleteVisible && (
                        <Icon
                            size={25}
                            name="trash"
                            type="font-awesome"
                            color={colors.danger}
                            onPress={() => handleDelete()}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}
