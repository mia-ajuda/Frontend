import { Image, AsyncStorage, View, StatusBar } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

import Onboarding from 'react-native-onboarding-swiper';

export default function IntroSlides() {
    const completeIntroSlide = async () => {
        await AsyncStorage.setItem('firstTimeUsingApp', 'true');
        // const value = await AsyncStorage.getItem('hasOnborded');
        //await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
        // console.log(value);
        // console.log('Done');
    };

    const Done = ({ ...props }) => (
        <Button
            title={'Entrar/Cadastrar'}
            buttonStyle={{
                backgroundColor: 'transparent',
            }}
            containerViewStyle={{
                marginVertical: 10,
                width: 100,
            }}
            titleStyle={{ color: '#4B8AB9', fontFamily: 'montserrat-semibold' }}
            {...props}
        />
    );

    const Skip = ({ ...props }) => (
        <Button
            title={'Pular'}
            buttonStyle={{
                backgroundColor: 'transparent',
            }}
            containerViewStyle={{
                marginVertical: 10,
                width: 70,
            }}
            textStyle={{ color: '#4B8AB9' }}
            {...props}
            titleStyle={{
                color: '#4B8AB9',
                fontFamily: 'montserrat-semibold',
            }}></Button>
    );

    const Next = ({ ...props }) => (
        <Button
            title={'Proximo'}
            buttonStyle={{
                backgroundColor: 'transparent',
            }}
            containerViewStyle={{
                marginVertical: 10,
                width: 70,
                backgroundColor: 'transparent',
            }}
            textStyle={{ color: '#4B8AB9' }}
            titleStyle={{ color: '#4B8AB9', fontFamily: 'montserrat-semibold' }}
            {...props}
        />
    );
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Onboarding
                //onDone={() => console.log('done')}
                titleStyles={{
                    color: '#4B8AB9',
                    fontFamily: 'montserrat-semibold',
                }}
                subTitleStyles={{
                    fontFamily: 'montserrat-semibold',
                }}
                controlStatusBar={false}
                NextButtonComponent={Next}
                SkipButtonComponent={Skip}
                DoneButtonComponent={Done}
                onDone={completeIntroSlide}
                pages={[
                    {
                        title: 'Precisando de Ajuda ou querendo oferecer?',
                        backgroundColor: '#fff',
                        image: (
                            <Image
                                source={require('../../../assets/images/TutorialImages/tela01.png')}
                            />
                        ),
                        subtitle:
                            'O Mia Ajuda possibilita que você solicite e oferte ajuda. Desde uma simples conversa até itens de necessidade básica.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <Image
                                source={require('../../../assets/images/TutorialImages/tela02.png')}
                            />
                        ),
                        title: 'Não sabe como ajudar?',
                        subtitle:
                            'Conte uma história! Cante para alguém! Encontre um amigo para conversar! Doe um alimento! Colabore como queira! O importante é ajudar!',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <Image
                                source={require('../../../assets/images/TutorialImages/tela03.png')}
                            />
                        ),
                        title: 'Você é uma ONG?',
                        subtitle:
                            'Temos uma parte especial para ONGs. Venha ser um apoiador e torne o mundo cada vez melhor por meio da solidariedade!',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <Image
                                source={require('../../../assets/images/TutorialImages/tela04.png')}
                            />
                        ),
                        title:
                            'Ajude pessoas perto de você é espalhe amor pelo mundo',
                        subtitle: '',
                        titleStyles: {
                            color: 'rgba(0,0,0, 0.7)',
                            fontSize: 20,
                            marginTop: -50,
                        },
                    },
                ]}
            />
        </View>
    );
}
///
///*{isUserAuthenticated ? <BottomTab /> : <AuthRoutes />}*/
/// Esse trecho pertence a pasta Navegatation
