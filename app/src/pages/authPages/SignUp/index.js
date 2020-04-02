import React from 'react';
import { View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function SignUp (){
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.viewText}>
        <Text style={styles.text}>Precisamos de algumas informações para poder realizar seu cadastro!! Pode me dizer seu nome e data de nascimento?</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>Nome Completo</Text>
        <TextInput style={styles.input}
          placeholder="Insira seu Nome Completo"
          placeholderTextColor={'#BDBDBD'}
        />
        <Text style={styles.inputText}>Data de Nascimento</Text>
        <TextInput style={styles.input}
          placeholder="00/00/0000"
          placeholderTextColor={'#BDBDBD'}
        />
        <Text style={styles.inputText}>CPF</Text>
        <TextInput style={styles.input}
          placeholder="000000000-00"
          placeholderTextColor={'#BDBDBD'}
        />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.login}>
            <Text style={styles.btnText}>ENTRAR</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}