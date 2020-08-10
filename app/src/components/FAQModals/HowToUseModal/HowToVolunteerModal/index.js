import React from 'react';
import {
    Modal,
    ScrollView,
    TouchableOpacity,
    View,
    ImageBackground,
    Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HowToVolunteer({ visible, setVisible }) {
    const HowToVolunteerRecomendations = [
        {
            id: '1',
            title: 'Como ser voluntário',
            description:
                'Para ser voluntário,  é só olhar no mapa da página inicial do app, e clicar no ícone',
        },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => setVisible(false)}
            animationType="fade">
            <View style={styles.modalContainer}>
                <ImageBackground
                    source={require('../../../../../assets/images/blueCatCard.png')}
                    style={styles.image}>
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

                        <View style={styles.modalContent}>
                            <ScrollView indicatorStyle="white">
                                {HowToVolunteerRecomendations.map((item) => (
                                    <View key={item.id}>
                                        <Text style={styles.title}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.description}>
                                            {item.description}
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </Container>
                </ImageBackground>
            </View>
        </Modal>
    );
}
