import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import styles from './styles';
import FinishHelpButton from './FinishHelpButton';

export default function HelpDescription({ route, navigation }) {
    const { help } = route.params;

    const navigateToHelpersList = () => {
        navigation.navigate('ListHelpInteresteds', {
            possibleInteresteds: help.possibleHelpers.concat(
                help.possibleEntities,
            ),
            message:
                'Você tem certeza que deseja este usuário como seu ajudante?',
            method: 'chooseHelper',
            helpId: help._id,
        });
    };

    const renderPossibleHelpersButton = () => (
        <TouchableOpacity
            style={styles.buttonInteresteds}
            onPress={navigateToHelpersList}
        >
            <Text style={styles.textBtn}>Possíveis Ajudantes</Text>
            <Badge
                value={
                    <Text style={styles.labelBadge}>
                        {help.possibleHelpers.length +
                            help.possibleEntities.length}
                    </Text>
                }
                badgeStyle={styles.badgeStyle}
                containerStyle={styles.containerBadge}
            />
        </TouchableOpacity>
    );

    const renderHelpInfo = () => (
        <View style={styles.helpInfo}>
            <Text style={styles.titleFont}>{help.title}</Text>
            <View style={styles.categoryContainer}>
                {help.categories.map((category) => (
                    <View key={category._id} style={styles.categoryWarning}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                    </View>
                ))}
            </View>
            <View>
                <Text style={styles.infoTitle}>Descrição:</Text>
                <Text style={styles.infoText}>{help.description}</Text>
            </View>
        </View>
    );

    const renderMyHelper = () => {
        if (help.status != 'finished') return <FinishHelpButton help={help} />;
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {renderHelpInfo()}
                <View style={styles.helpButtons}>
                    {help.helperId
                        ? renderMyHelper()
                        : renderPossibleHelpersButton()}
                </View>
            </View>
        </ScrollView>
    );
}
