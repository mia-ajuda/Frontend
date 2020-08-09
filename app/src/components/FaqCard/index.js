import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import EmergencyNumbers from '../../components/FAQModals/EmergencyNumbersModal';
import HelpOfferedRecomendations from '../FAQModals/RecomendationsModal/HelpOfferedModal';
import HelpRequestRecomendations from '../FAQModals/RecomendationsModal/HelpRequestModal';
import HowToUseModal from '../FAQModals/HowToUseModal';

import styles from './styles';

export default function FaqCard({ faq }) {
    const [modalVisible, setModalVisible] = useState(false);

    const selectRenderModal = (id) => {
        if (id == 1) {
            return (
                <HowToUseModal
                    visible={modalVisible}
                    setVisible={setModalVisible}
                />
            );
        } else if (id == 2) {
            return (
                <HelpRequestRecomendations
                    visible={modalVisible}
                    setVisible={setModalVisible}
                />
            );
        } else if (id == 3) {
            return (
                <HelpOfferedRecomendations
                    visible={modalVisible}
                    setVisible={setModalVisible}
                />
            );
        } else if (id == 4) {
            return (
                <EmergencyNumbers
                    visible={modalVisible}
                    setVisible={setModalVisible}
                />
            );
        }
    };

    return (
        <View style={styles.cardContainer}>
            {selectRenderModal(faq.id)}
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.info}>
                    <Image source={faq.icon}></Image>
                    <Text style={styles.title} numberOfLines={2}>
                        {faq.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
