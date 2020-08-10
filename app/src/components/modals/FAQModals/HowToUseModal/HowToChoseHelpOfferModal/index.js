import React from 'react';
import { Modal, ScrollView,TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {HowToChoseHelpOfferSteps} from '../../../../../docs/FAQ/HowToCHoseHelpOffer';
import Container from '../../../Container';
import colors from '../../../../../../assets/styles/colorVariables';
import styles from './styles';


export default function HowToChoseHelpOffer({ visible, setVisible }) {
        const renderHowToChoseHelpOfferStepsList = () => (
            <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
            <View>
                   <Text style={styles.title}>
                      Como escolher uma oferta de ajuda
                              </Text>
                                  {HowToChoseHelpOfferSteps.map(
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
        animationType="fade"
    >
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

             {renderHowToChoseHelpOfferStepsList()}
            
            </Container>

        </View>
    </Modal>

    
    


  );
}