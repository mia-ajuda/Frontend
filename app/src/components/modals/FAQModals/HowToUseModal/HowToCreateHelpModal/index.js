import React from 'react';
import { Modal, ScrollView,TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../../Container';
import {HowToCreateHelpSteps} from '../../../../../docs/FAQ/HowToCreateHelp';
import colors from '../../../../../../assets/styles/colorVariables';
import styles from './styles';


export default function HowToCreateHelpRequest({ visible, setVisible }) {
    const renderHowToCreateHelpRequestStepsList = () => (
        <View style={styles.modalContent}>
        <ScrollView  indicatorStyle="white"
        >
        <View>
               <Text style={styles.title}>
                  Como criar um pedido de ajuda
                          </Text>
                              {HowToCreateHelpSteps.map(
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

             {renderHowToCreateHelpRequestStepsList()}
            
            </Container>
            </ImageBackground>
        </View>
    </Modal>

    
    


  );
}