
import React,{useState} from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native';

import styles from './styles';
import colors from '../../../../../assets/styles/colorVariables';
import { Icon } from 'react-native-elements';
import HowToChoseHelpOfferModal from '../HowToUseModal';
import HowToCreateHelpModal from '../HowToUseModal';
import HowToOfferHelpModal from '../HowToUseModal';
import HowToVolunteerModal from '../HowToUseModal';


export default function CategoryList({ visible, setVisible }) {
    const [howToCreateHelpModalVisible, setHowToCreateHelpModalVisible] = useState(false);
    const [howToOfferHelpModalVisible, setHowToOfferHelpModalVisible] = useState(false);
    const [howToChoseHelpOfferModalVisible, setHowToChoseHelpOfferModalVisible] = useState(false);
    const [howToVolunteerModalVisible, setHowToVolunteerModalVisible] = useState(false);
    


return (
    <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => {
                setVisible(false);
            }}>
          <ImageBackground
                source={require('../../../images/catPhoto.png')}
                style={styles.image}>
            <ScrollView>
                <View style={styles.modalContent}>
                    <View style={styles.contentHeader}>
                    <Text style={styles.title}>Como usar o Mia Ajuda</Text>

                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false);
                        }}
                        style={styles.closeIcon}>
                        <Icon
                            name="times-circle"
                            type="font-awesome"
                            color={colors.primary}
                            size={35}
                        />
                        </TouchableOpacity>
                    </View>

                        <TouchableOpacity
                            onPress={() => {
                                setHowToCreateHelpModalVisible(
                                    !howToCreateHelpModalVisible,
                                );
                            }}
                            style={styles.textButtons}
                            >
                                <Text style={styles.textContent}>Como criar uma ajuda?</Text>

                                <Icon
                                style={styles.arrowIcon}
                                name='arrow-right'
                                type="font-awesome"
                                color={colors.light}
                                size={35}/>
                           
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setHowToOfferHelpModalVisible(
                                    !howToOfferHelpModalVisible,
                                );
                            }}
                            style={styles.textButtons}>
                                <Text style={styles.textContent}>Como criar uma oferta de ajuda?</Text>
                                <Icon
                                style={styles.arrowIcon}
                                name='arrow-right'
                                type="font-awesome"
                                color={colors.light}
                                size={35}/>
                           
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setHowToChoseHelpOfferModalVisible(
                                    !howToChoseHelpOfferModalVisible,
                                );
                            }}
                            style={styles.textButtons}
                            >
                                <Text style={styles.textContent}>Como escolher uma oferta de ajuda?</Text>
                                <Icon
                                style={styles.arrowIcon}
                                name='arrow-right'
                                type="font-awesome"
                                color={colors.light}
                                size={35}/>
                           
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setHowToVolunteerModalVisible(
                                    !howToVolunteerModalVisible,
                                );
                            }}
                            style={styles.textButtons}
                            >
                                <Text style={styles.textContent}>Como ser um voluntário?</Text>
                                <Icon
                                style={styles.arrowIcon}
                                name='arrow-right'
                                type="font-awesome"
                                color={colors.light}
                                size={35}/>
                           
                        </TouchableOpacity>
                </View>
            </ScrollView>
            </ImageBackground>
        </TouchableOpacity>
        <HowToCreateHelpModal
            visible={howToCreateHelpModalVisible}
            setVisible={setHowToCreateHelpModalVisible}
        />
        <HowToOfferHelpModal
            visible={howToOfferHelpModalVisible}
            setVisible={setHowToOfferHelpModalVisible}
        />
        <HowToChoseHelpOfferModal
            visible={howToChoseHelpOfferModalVisible}
            setVisible={setHowToChoseHelpOfferModalVisible}
        />
        <HowToVolunteerModal
            visible={howToVolunteerModalVisible}
            setVisible={setHowToVolunteerModalVisible}
        />
    </Modal>
);
}