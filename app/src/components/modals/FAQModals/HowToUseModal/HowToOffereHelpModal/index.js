import React from 'react';
import {
    Modal,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import { HowToOfferHelpSteps } from '../../../../../docs/FAQ/HowToOfferHelp';
import colors from '../../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HowToOfferHelp({ visible, setVisible }) {

    const renderHowToOfferHelpStepsList = () => (
        <View style={styles.modalContent}>
        <ScrollView indicatorStyle="white">
            <View>
                <Text style={styles.title}>
                    Como criar uma oferta de ajuda
                </Text>
                {HowToOfferHelpSteps.map(
                    (steps) => (
                        <Text
                            key={steps.id}
                            style={styles.description}>
                            {steps.text}
                        </Text>
                    ),
                )}
            </View>
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


