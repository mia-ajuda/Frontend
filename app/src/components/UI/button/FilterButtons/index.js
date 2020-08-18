import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Exclamation from '../../../../../assets/images/exclamation.svg';
import HelpHand from '../../../../../assets/images/hand.svg';
import House from '../../../../../assets/images/house.svg';
import styles from './styles';

export default function FilterButtons() {
    return (
        <View style={styles.contentButtons}>
            <View style={styles.helpFilterButton}>
                <TouchableOpacity>
                    <View style={styles.info}>
                        <Exclamation />
                        <Text style={styles.infoText}>PEDIDOS</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.helpFilterButton}>
                <TouchableOpacity>
                    <View style={styles.info}>
                        <HelpHand />
                        <Text style={styles.infoText}>OFERTAS</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.helpFilterButton}>
                <TouchableOpacity>
                    <View style={styles.info}>
                        <House />
                        <Text style={styles.infoTextInst}>INSTITUIÇÕES</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
