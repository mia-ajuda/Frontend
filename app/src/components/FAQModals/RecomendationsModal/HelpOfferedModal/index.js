import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import helpOfferedRecomendations from '../../../../docs/FAQ/HelpOfferedRecomendations';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HelpOfferedModal({ visible, setVisible }) {
    const renderRecomendationsList = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {helpOfferedRecomendations.map((item) => (
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
                    {renderRecomendationsList()}
                </Container>
            </View>
        </Modal>
    );
}
