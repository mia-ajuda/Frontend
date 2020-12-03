import {
    Image,
    AsyncStorage,
    Modal,
    TouchableOpacity,
    Text,
    StatusBar,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import styles from './styles';
import colors from '../../../assets/styles/colorVariables';

const imageFirstSlide = require('../../../assets/images/TutorialImages/tela01.png');
const imageSecondSlide = require('../../../assets/images/TutorialImages/tela02.png');
const imageThirdSlide = require('../../../assets/images/TutorialImages/tela03.png');
const imageFourthSlide = require('../../../assets/images/TutorialImages/tela04.png');

export default function IntroSlides({ finishSlide, setFinishSlide }) {
    const completeIntroSlide = async () => {
        setFinishSlide(true);
        await AsyncStorage.setItem('firstTimeUsingApp', 'true');
    };

    const Done = ({ ...props }) => (
        <TouchableOpacity
            style={styles.buttonBox}
            {...props}
            onPress={() => completeIntroSlide()}>
            <Text style={styles.buttonText}>Concluir</Text>
        </TouchableOpacity>
    );

    const Skip = () => (
        <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => completeIntroSlide()}>
            <Text style={styles.buttonText}>Pular</Text>
        </TouchableOpacity>
    );

    const Next = ({ ...props }) => (
        <TouchableOpacity style={styles.buttonBox} {...props}>
            <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
    );
    return (
        <Modal visible={!finishSlide} animationType="fade">
            <StatusBar barStyle="default" backgroundColor={colors.primary} />
            <Onboarding
                titleStyles={styles.titles}
                subTitleStyles={styles.subtitle}
                imageContainerStyles={styles.images}
                NextButtonComponent={Next}
                SkipButtonComponent={Skip}
                DoneButtonComponent={Done}
                onDone={completeIntroSlide}
                pages={[
                    {
                        title: 'Precisando de Ajuda ou querendo oferecer?',
                        backgroundColor: '#FFF',
                        image: (
                            <Image
                                source={imageFirstSlide}
                                style={styles.image}
                            />
                        ),
                        subtitle:
                            'O Mia Ajuda possibilita que você solicite e oferte ajuda. Desde uma simples conversa até itens de necessidade básica.',
                    },
                    {
                        backgroundColor: '#FFF',
                        image: (
                            <Image
                                source={imageSecondSlide}
                                style={styles.image}
                            />
                        ),
                        title: 'Não sabe como ajudar?',
                        subtitle:
                            'Conte uma história! Cante para alguém! Encontre um amigo para conversar! Doe um alimento! Colabore como queira! O importante é ajudar!',
                    },
                    {
                        backgroundColor: '#FFF',
                        image: (
                            <Image
                                source={imageThirdSlide}
                                style={styles.image}
                            />
                        ),
                        title: 'Você é uma ONG?',
                        subtitle:
                            'Temos uma parte especial para ONGs. Venha ser um apoiador e torne o mundo cada vez melhor por meio da solidariedade!',
                    },
                    {
                        backgroundColor: '#FFF',
                        image: (
                            <Image
                                source={imageFourthSlide}
                                style={styles.image}
                            />
                        ),
                        title:
                            'Ajude pessoas perto de você é espalhe amor pelo mundo',
                        subtitle: '',
                    },
                ]}
            />
        </Modal>
    );
}
