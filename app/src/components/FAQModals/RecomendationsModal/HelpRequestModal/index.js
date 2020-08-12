import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';

export default function HelpRequestModal({ visible, setVisible }) {
    const acceptHelpOfferRecomendationsDescription = `
  ##1 Verifique se a oferta está de acordo com a sua necessidade, caso contrário deixe a oportunidade para alguém que realmente precise;

 ##2 Caso a oferta se adeque à sua situação, aceite-a e aguarde o contato do responsável por ela;

 ##3 Ao receber a ajuda, lembre-se de agradecer ao voluntário.
  `;

    const createHelpRequestRecomendationsDescriptions = `
  ##1 Lembre-se sempre que você está lidando com outras pessoas, então não peça por coisas impossíveis, nem por dinheiro pois é importante que todos possam ajudar;

  ##2 Ao receber voluntários para te ajudar, nunca esqueça de ser educado e gentil, pois eles estão tentando fazer o possível para atender à sua solicitação na situação pela qual você está passando;

  ##3 Recomendamos, caso seja necessário um encontro, que este ocorra em um local público, e de forma segura.
 `;

    const HelpOfferedModal = [
        {
            id: '1',
            title:
                'Recomendações importantes para se interessar por alguma oferta de ajuda',
            description: acceptHelpOfferRecomendationsDescription,
        },
        {
            id: '2',
            title: 'Recomendações importantes para criar de pedidos de ajuda ',
            description: createHelpRequestRecomendationsDescriptions,
        },
    ];

    const renderImportantRecomendations = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {HelpOfferedModal.map((item) => (
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
                    {renderImportantRecomendations()}
                </Container>
            </View>
        </Modal>
    );
}
