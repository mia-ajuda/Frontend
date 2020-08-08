import React from 'react';
import { Modal, ScrollView,TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import colors from '../../../../../assets/styles/colorVariables';
import styles from './styles';


export default function EmergencyNumbers({ visible, setVisible }) {
    
  const emergencyNumbers =[
    {id:'1', number:'100',description:'Disque Direitos Humanos'},
    {id:'2', number:'156',descrition:'Governo no Distrito Federal'},
    {id:'3', number:'180',descrition:'Delegacias especializadas de atendimento à mulher'},
    {id:'4', number:'181',descrition:'Disque Denúncia (Geral)'},
    {id:'5', number:'190',descrition:'Polícia Militar'},
    {id:'6', number:'191',descrition:'Polícia Rodoviária Federal'},
    {id:'7', number:'192',descrition:'SAMU'},
    {id:'8', number:'193',descrition:'Corpo de Bombeiros'},
    {id:'9', number:'194',descrition:'Polícia Federal'},
    {id:'10',number:'197',descrition:'Polícia Civil'},
    {id:'11',number:'(61) 3207-4242',descrition:'Delegacia especial de repressão aos crimes de discriminação racial, religiosa ou por orientação sexual ou contra a pessoa idosa ou com deficiência (DECRIN'},
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
             source={require('../../../images/emergencyContactsPhone.png')}
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
                            {emergencyNumbers.map((item) => (
                                <View key={item.id}>
                                    <Text style={styles.title}>
                                        {item.number}
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