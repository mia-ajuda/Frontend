import React from 'react';
import { Modal, ScrollView,TouchableOpacity, View , Text} from 'react-native';
import { Icon } from 'react-native-elements';
import {HowToVolunteerSteps} from '../../../../../docs/FAQ/HowToVolunteer'
import Container from '../../../Container';
import colors from '../../../../../../assets/styles/colorVariables';
import styles from './styles';


export default function HowToVolunteer({ visible, setVisible }) {

    const renderHowToVolunteerStepsList = () => (
        <View style={styles.modalContent}>
              <ScrollView indicatorStyle="white">
              <View>
                     <Text style={styles.title}>
                        Como ser um voluntário
                                </Text>
                                    {HowToVolunteerSteps.map(
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

              {renderHowToVolunteerStepsList()}
            
            </Container>
    
        </View>
    </Modal>

    
    


  );
}