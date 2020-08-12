import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EmergencyNumbers from '../../components/FAQModals/EmergencyNumbersModal';
import HelpOfferedModal from '../FAQModals/RecomendationsModal/HelpOfferedModal';
import HelpRequestModal from '../FAQModals/RecomendationsModal/HelpRequestModal';
import HowToUseModal from '../FAQModals/HowToUseModal';
import SvgUri from 'react-native-svg-uri';
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
                <HelpRequestModal
                    visible={modalVisible}
                    setVisible={setModalVisible}
                />
            );
        } else if (id == 3) {
            return (
                <HelpOfferedModal
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
                    <SvgUri width="65" height="60" source={faq.icon} />
                    <Text style={styles.title} numberOfLines={2}>
                        {faq.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
