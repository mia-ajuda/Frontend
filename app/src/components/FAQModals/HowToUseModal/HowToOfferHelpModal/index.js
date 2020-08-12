import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import offerHelpRecomendations from '../../../../docs/FAQ/HowToOfferHelp';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HowToOfferHelp({ visible, setVisible }) {
    const renderHowToOfferHelpStepsList = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {offerHelpRecomendations.map((item) => (
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
            animationType="fade">
            <View style={styles.modalContainer}>
                <Container>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false);
                        }}
                        style={styles.icon}>
                        <Icon
                            name="times-circle"
                            type="font-awesome"
                            color={colors.primary}
                            size={35}
                        />
                    </TouchableOpacity>
                    {renderHowToOfferHelpStepsList()}
                </Container>
            </View>
        </Modal>
    );
}
