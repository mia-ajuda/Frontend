import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';

import styles from './styles';

export default function HelpCard({ help, showBadge = false, onClick }) {
    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                styles.cardContainer,
                help.user.riskGroup.length
                    ? {
                          borderRightColor: colors.danger,
                          borderRightWidth: 10,
                      }
                    : {},
            ]}>
            {showBadge && help.possibleHelpers.length ? (
                <Badge
                    value={
                        <Text style={styles.labelBadge}>
                            {help.possibleHelpers.length}
                        </Text>
                    }
                    badgeStyle={styles.badgeStyle}
                    containerStyle={styles.containerBadge}
                />
            ) : null}
            <View style={styles.cardTitle}>
                <Text numberOfLines={1} style={styles.titleContent}>
                    {help.description}
                </Text>
            </View>
            <View style={styles.cardDescription}>
                <Text numberOfLines={3} style={styles.descriptionContent}>
                    {help.description}
                </Text>
                <View style={styles.bottomItens}>
                    <View style={styles.categoryWarning}>
                        <Text style={styles.categoryName}>
                            {' '}
                            {help.category[0].name}{' '}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
