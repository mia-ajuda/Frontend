import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HowToCreateHelpRequest({ visible, setVisible }) {
    const HowToCreateHelpRequestModal = `   ##1 Para pedir uma ajuda clique no ícone;

    ##2 Preencha os dados da página de pedidos: título, categoria e descrição;

    ##3 Depois de criado o seu pedido, é só esperar que alguém ofereça ajuda;

    ##4 Quando alguém oferecer ajuda, uma notificação será enviado pelo app;

    ##5 O contato entre você e o voluntário a lhe ajudar será feito através do telefone ou alguma aplicativo de conversa que vocês utilizem (Exemplo: WhatsApp, Facebook);

    ##6 Depois que você recebeu a sua ajuda, é só entrar no app e finalizar o seu pedido.`;

    const CreateHelpRecomendations = [
        {
            id: '1',
            title: 'Como criar um pedido de ajuda?',
            description: HowToCreateHelpRequestModal,
        },
    ];

    const renderHowToCreateHelpRequestStepsList = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {CreateHelpRecomendations.map((item) => (
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
                    {renderHowToCreateHelpRequestStepsList()}
                </Container>
            </View>
        </Modal>
    );
}
