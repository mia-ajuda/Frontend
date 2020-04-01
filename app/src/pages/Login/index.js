import React from 'react';
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Login(){
    return (
      <KeyboardAvoidingView style={styles.background}> 
        <View style={styles.logo}>
          <Image style= {{flex: 1, resizeMode: 'contain', marginTop: 30}} 
          source={require('../../images/logo.png')}/>
          />
        </View>
          
        <View style={styles.container}>
          <TextInput style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput style={styles.input}
            secureTextEntry
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TouchableOpacity style={styles.login}>
            <Text style={styles.text}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUP}>
            <Text style={styles.signupText} >Não tem uma conta?</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    );
}
