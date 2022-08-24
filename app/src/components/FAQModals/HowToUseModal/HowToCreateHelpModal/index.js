import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import createHelpRecomendations from '../../../../docs/FAQ/HowToCreateHelp';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HowToCreateHelpRequest({ visible, setVisible }) {
    const renderHowToCreateHelpRequestStepsList = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {createHelpRecomendations.map((item) => (
                    <View key={item.id}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => setVisible(false)}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <Container>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false);
                        }}
                        style={styles.icon}
                    >
                        <Icon
                            name="times-circle"
                            type="font-awesome"
                            color={colors.primary}
                            size={35}
                        />
                    </TouchableOpacity>
                    {renderHowToCreateHelpRequestStepsList()}
                </Container>
            </View>
        </Modal>
    );
}
