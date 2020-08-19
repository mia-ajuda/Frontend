import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Exclamation from '../../../../../assets/images/exclamation.svg';
import HelpHand from '../../../../../assets/images/hand.svg';
import House from '../../../../../assets/images/house.svg';
import styles from './styles';

export default function FilterButtons() {
    const types = [
        {
            id: 1,
            name: 'PEDIDOS',
            isEnabled: false,
        },
        {
            id: 2,
            name: 'OFERTAS',
            isEnabled: false,
        },
        {
            id: 3,
            name: 'INSTITUIÇÕES',
            isEnabled: false,
        },
    ];

    const renderSVG = (id) => {
        if (id === 1) {
            return <Exclamation />;
        } else if (id === 2) {
            return <HelpHand />;
        } else if (id === 3) {
            return <House />;
        }
    };

    const [helpTypes, setHelpTypes] = useState([]);

    useEffect(() => {
        setHelpTypes(types);
    }, []);

    function handleTypesButton(id) {
        const newHelpTypes = helpTypes.map((helpType) => {
            return helpType.id == id
                ? { ...helpType, isEnabled: !helpType.isEnabled }
                : helpType;
        });

        setHelpTypes(newHelpTypes);
    }

    const renderTypesContent = (helpType) => {
        if (helpType.isEnabled) {
            return (
                <View style={styles.infoPress}>
                    {renderSVG(helpType.id)}
                    <Text style={styles.infoPressText}>{helpType.name}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.info}>
                    {renderSVG(helpType.id)}
                    <Text style={styles.infoText}>{helpType.name}</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.contentButtons}>
            {helpTypes.map((helpType) => (
                <TouchableOpacity
                    key={helpType.id}
                    style={styles.helpFilterButton}
                    onPress={() => {
                        handleTypesButton(helpType.id);
                    }}>
                    {renderTypesContent(helpType)}
                </TouchableOpacity>
            ))}
        </View>
    );
}
