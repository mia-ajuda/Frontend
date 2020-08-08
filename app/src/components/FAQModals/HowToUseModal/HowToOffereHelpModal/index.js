import React from 'react';
import { Modal, ScrollView,TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import colors from '../../../../../../assets/styles/colorVariables';
import styles from './styles';


export default function HowToOfferHelp({ visible, setVisible }) {
  const HowToOfferHelpRecomendations = `
 ##1 Para ofertar uma ajuda clique no ícone de criar oferta ;
 ##2 Preencha os dados da página de pedidos: título, categoria e descrição;
 ##3 Depois de efetuada a oferta do seu pedido, é só aguardar que uma ou mais pessoas se interessarem pela sua ajuda;
 ##4 A lista de interessados aparecerá no histórico da sua oferta e uma notificação será enviada pelo app;
 ##5 Você pode aceitar ajudar uma ou mais pessoas;
 ##6 O contato entre você e o interessado que você irá ajudar será feito através do telefone ou alguma aplicativo de conversa que vocês utilizem (Exemplo: WhatsApp, Facebook);
 ##7 Depois de ajudar os interessados, é só entrar no app e finalizar a sua oferta.

  
  `;
  
  const OfferHelpRecomendations =[
    {id:'1',
    title:'Como criar uma oferta de ajuda',
    description:HowToOfferHelpRecomendations},
    
  ];



  return (
    
        <Modal 
        visible={visible}
        transparent
        onRequestClose={() => setVisible(false)}
        animationType="fade"
    >
        <View style={styles.modalContainer}>
        <ImageBackground
                source={require('../../../images/catPhoto.png')}
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
                            { OfferHelpRecomendations.map((item) => (
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