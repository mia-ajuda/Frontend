import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import colors from '../../../../assets/styles/colorVariables';
import { Icon } from 'react-native-elements';
import createHelpRecomendations from '../../../docs/FAQ/HowToCreateHelp';
import offerHelpRecomendations from '../../../docs/FAQ/HowToOfferHelp';
import howToChoseHelpOfferRecomendations from '../../../docs/FAQ/HowToChooseHelpOffered';
import howToVolunteerRecomendations from '../../../docs/FAQ/HowToBeVolunteer';
import { ModalComponent } from '../modal';

export default function HowToUseModal({ visible, setVisible }) {
    const [howToCreateHelpModalVisible, setHowToCreateHelpModalVisible] =
        useState(false);
    const [howToOfferHelpModalVisible, setHowToOfferHelpModalVisible] =
        useState(false);
    const [
        howToChoseHelpOfferModalVisible,
        setHowToChoseHelpOfferModalVisible,
    ] = useState(false);
    const [howToVolunteerModalVisible, setHowToVolunteerModalVisible] =
        useState(false);

    const renderHowToCreateHelpModal = () => (
        <TouchableOpacity
            onPress={() => {
                setHowToCreateHelpModalVisible(!howToCreateHelpModalVisible);
            }}
            style={styles.textButtons}
        >
            <Text style={styles.textContent}>
                Como criar um pedido de ajuda?
            </Text>
        </TouchableOpacity>
    );

    const renderHowToOfferHelpModal = () => (
        <TouchableOpacity
            onPress={() => {
                setHowToOfferHelpModalVisible(!howToOfferHelpModalVisible);
            }}
            style={styles.textButtons}
        >
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
            style={styles.textButtons}
        >
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
            style={styles.textButtons}
        >
            <Text style={styles.textContent}>Como ser um voluntário?</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => {
                    setVisible(false);
                }}
            >
                <View style={styles.modalContent}>
                    <View style={styles.contentHeader}>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible(false);
                            }}
                            style={styles.closeIcon}
                        >
                            <Icon
                                name="times-circle"
                                type="font-awesome"
                                color={colors.primary}
                                size={35}
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>Como usar o Mia Ajuda?</Text>
                    </View>
                    {renderHowToCreateHelpModal()}
                    {renderHowToOfferHelpModal()}
                    {renderHowToChoseOfferHelpModal()}
                    {renderHowToVolunteerModal()}
                </View>
            </TouchableOpacity>
            <ModalComponent
                visible={howToCreateHelpModalVisible}
                setVisible={setHowToCreateHelpModalVisible}
                list={createHelpRecomendations}
            />
            <ModalComponent
                visible={howToOfferHelpModalVisible}
                setVisible={setHowToOfferHelpModalVisible}
                list={offerHelpRecomendations}
            />
            <ModalComponent
                visible={howToChoseHelpOfferModalVisible}
                setVisible={setHowToChoseHelpOfferModalVisible}
                list={howToChoseHelpOfferRecomendations}
            />
            <ModalComponent
                visible={howToVolunteerModalVisible}
                setVisible={setHowToVolunteerModalVisible}
                list={howToVolunteerRecomendations}
            />
        </Modal>
    );
}
