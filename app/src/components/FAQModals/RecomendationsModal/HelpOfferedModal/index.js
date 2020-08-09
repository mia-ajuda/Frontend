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

export default function HelpOfferedRecomendations({ visible, setVisible }) {
    const acceptHelpRequestRecomendationsDescription = `
  ##1 Lembre-se que você está lidando com pessoas que precisam de ajuda, logo, tenha paciência, seja prestativo e gentil;

  ##2 Ao entrar em contato com o ajudado, considere que o mesmo pode estar em alguma situação de risco, por isso, não peça, e nem ofereça, informações adicionais além das apresentadas no app;

  ##3 Recomendamos, caso seja necessário um encontro, que este ocorra em um local público, e de forma segura.
  `;

    const createHelpOfferedRecomendationsDescriptions = `
  ##1 Se um objeto for ofertado, certifique-se de que o mesmo está em boas condições de uso;

  ##2 Certifique-se, ao escolher um ajudado, de que este realmente precisa da ajuda;

  ##3 Caso seja ofertado um serviço ( apoio social, psicológico ou físico, transporte de emergência e pequenos serviços) lembre-se de realizá-lo da melhor forma possível, e sempre com paciência e prestatividade.
 `;

    const HelpOfferedRecomendations = [
        {
            id: '1',
            title: 'Recomendações importantes para aceitar um pedido de ajuda',
            description: acceptHelpRequestRecomendationsDescription,
        },
        {
            id: '2',
            title: 'Recomendações importante para oferecer ajuda',
            description: createHelpOfferedRecomendationsDescriptions,
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
                    source={require('../../../../../assets/images/offerHelpHand.png')}
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
                                {HelpOfferedRecomendations.map((item) => (
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
