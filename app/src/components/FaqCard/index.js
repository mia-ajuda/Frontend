import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EmergencyNumbers from '../../components/FAQModals/EmergencyNumbersModal';
import HelpOfferedModal from '../FAQModals/RecomendationsModal/HelpOfferedModal';
import HelpRequestModal from '../FAQModals/RecomendationsModal/HelpRequestModal';
import HowToUseModal from '../FAQModals/HowToUseModal';
import styles from './styles';
import BlueCat from '../../../assets/images/blueCatCard.svg';
import Exclamation from '../../../assets/images/exclamation.svg';
import HelpHand from '../../../assets/images/hand.svg';
import Phone from '../../../assets/images/phone.svg';

export default function FaqCard({ faq }) {
    const [modalVisible, setModalVisible] = useState(false);

    const renderSVGIcon = (id) => {
        if (id == 1) {
            return <BlueCat />;
        } else if (id == 2) {
            return <Exclamation />;
        } else if (id == 3) {
            return <HelpHand />;
        } else if (id == 4) {
            return <Phone />;
        }
    };

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
                }}
            >
                <View style={styles.info}>
                    {renderSVGIcon(faq.id)}
                    <Text style={styles.title} numberOfLines={2}>
                        {faq.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
