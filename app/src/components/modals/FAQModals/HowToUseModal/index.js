import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import colors from '../../../../assets/styles/colorVariables';
import { Icon } from 'react-native-elements';
import HowToChoseHelpOfferModal from '../HowToUseModal/HowToChoseHelpOfferModal';
import HowToCreateHelpModal from '../HowToUseModal/HowToCreateHelpModal';
import HowToOfferHelpModal from '../HowToUseModal/HowToOfferHelpModal';
import HowToVolunteerModal from '../HowToUseModal/HowToVolunteerModal';

export default function HowToUseModal({ visible, setVisible }) {
    const [
        howToCreateHelpModalVisible,
        setHowToCreateHelpModalVisible,
    ] = useState(false);
    const [
        howToOfferHelpModalVisible,
        setHowToOfferHelpModalVisible,
    ] = useState(false);
    const [
        howToChoseHelpOfferModalVisible,
        setHowToChoseHelpOfferModalVisible,
    ] = useState(false);
    const [
        howToVolunteerModalVisible,
        setHowToVolunteerModalVisible,
    ] = useState(false);

    const renderHowToCreateHelpModal = () => (
        <TouchableOpacity
            onPress={() => {
                setHowToCreateHelpModalVisible(!howToCreateHelpModalVisible);
            }}
            style={styles.textButtons}>
            <Text style={styles.textContent}>Como criar uma ajuda?</Text>
        </TouchableOpacity>
    );

    const renderHowToOfferHelpModal = () => (
        <TouchableOpacity
            onPress={() => {
                setHowToOfferHelpModalVisible(!howToOfferHelpModalVisible);
            }}
            style={styles.textButtons}>
            <Text style={styles.textContent}>
                Como criar uma oferta de ajuda?
            </Text>
        </TouchableOpacity>
    );

    const renderHowToChoseOfferHelpModal = () => (
        <TouchableOpacity
            onPress={() => {
                setHowToChoseHelpOfferModalVisible(
                    !howToChoseHelpOfferModalVisible,
                );
            }}
            style={styles.textButtons}>
            <Text style={styles.textContent}>
                Como escolher uma oferta de ajuda?
            </Text>
        </TouchableOpacity>
    );

    const renderHowToVolunteerModal = () => (
        <TouchableOpacity
            onPress={() => {
                setHowToVolunteerModalVisible(!howToVolunteerModalVisible);
            }}
            style={styles.textButtons}>
            <Text style={styles.textContent}>Como ser um voluntário?</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}>
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => {
                    setVisible(false);
                }}>
                <View style={styles.modalContent}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.title}>Como usar o Mia Ajuda?</Text>

                        <TouchableOpacity
                            onPress={() => {
                                setVisible(false);
                            }}
                            style={styles.closeIcon}>
                            <Icon
                                name="times-circle"
                                type="font-awesome"
                                color={colors.primary}
                                size={35}
                            />
                        </TouchableOpacity>
                    </View>
                    {renderHowToCreateHelpModal()}
                    {renderHowToOfferHelpModal()}
                    {renderHowToChoseOfferHelpModal()}
                    {renderHowToVolunteerModal()}
                </View>
            </TouchableOpacity>
            <HowToCreateHelpModal
                visible={howToCreateHelpModalVisible}
                setVisible={setHowToCreateHelpModalVisible}
            />
            <HowToOfferHelpModal
                visible={howToOfferHelpModalVisible}
                setVisible={setHowToOfferHelpModalVisible}
            />
            <HowToChoseHelpOfferModal
                visible={howToChoseHelpOfferModalVisible}
                setVisible={setHowToChoseHelpOfferModalVisible}
            />
            <HowToVolunteerModal
                visible={howToVolunteerModalVisible}
                setVisible={setHowToVolunteerModalVisible}
            />
        </Modal>
    );
}
