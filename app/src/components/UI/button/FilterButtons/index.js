import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../../../../../assets/styles/colorVariables';
import filterButtonTypes from '../../../../docs/filterMarkers';

export default function FilterButtons({
    setSelectedMarkerType,
    selectedMarker,
}) {
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

    useEffect(() => {
        setSelectedMarkerType(selectedFilters);
    }, [selectedFilters]);

    useEffect(() => {
        setSelectedFilteres(selectedMarker);
    }, [selectedMarker]);

    return (
        <View style={styles.contentButtons}>
            {filterButtonTypes.map((filterButton) => (
                <TouchableOpacity
                    key={filterButton.id}
                    style={styles.helpFilterButton}
                    onPress={() => {
                        selectionFilter(filterButton.id);
                    }}
                >
                    <View
                        style={
                            selectedFilters.includes(filterButton.id)
                                ? styles.infoPress
                                : styles.info
                        }
                    >
                        <FontAwesome5
                            name={filterButton.iconName}
                            size={45}
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
                            }
                        >
                            {filterButton.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
