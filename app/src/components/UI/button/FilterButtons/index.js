import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../../../../../assets/styles/colorVariables';
const filterButtonTypes = [
    {
        id: 1,
        name: 'PEDIDOS',
        isEnabled: false,
        iconName: 'exclamation',
    },
    {
        id: 2,
        name: 'OFERTAS',
        isEnabled: false,
        iconName: 'hand-holding-heart',
    },
    {
        id: 3,
        name: 'INSTITUIÇÕES',
        isEnabled: false,
        iconName: 'home',
    },
];
export default function FilterButtons() {
    const [selectedFilters, setSelectedFilteres] = useState([]);

    function selectionFilter(id) {
        if (selectedFilters.includes(id)) {
            removeType(id);
        } else {
            includeType(id);
        }
    }
    function includeType(id) {
        setSelectedFilteres([...selectedFilters, id]);
    }
    function removeType(id) {
        const filterType = selectedFilters.filter(
            (selectedId) => selectedId !== id,
        );
        setSelectedFilteres(filterType);
    }

    return (
        <View style={styles.contentButtons}>
            {filterButtonTypes.map((filterButton) => (
                <TouchableOpacity
                    key={filterButton.id}
                    style={styles.helpFilterButton}
                    onPress={() => {
                        selectionFilter(filterButton.id);
                    }}>
                    <View
                        style={
                            selectedFilters.includes(filterButton.id)
                                ? styles.infoPress
                                : styles.info
                        }>
                        <FontAwesome5
                            name={filterButton.iconName}
                            size={60}
                            color={
                                selectedFilters.includes(filterButton.id)
                                    ? colors.light
                                    : colors.primary
                            }
                        />
                        <Text
                            style={
                                selectedFilters.includes(filterButton.id)
                                    ? styles.infoPressText
                                    : styles.infoText
                            }>
                            {filterButton.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
