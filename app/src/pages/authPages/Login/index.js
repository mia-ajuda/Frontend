import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import UserService from '../../../services/User';
import Button from '../../../components/UI/button';
import { Icon } from 'react-native-elements';
import colors from '../../../../assets/styles/colorVariables';

import styles from './styles';
import { UserContext } from '../../../store/contexts/userContext';
import actions from '../../../store/actions';

export default function Login({ navigation }) {
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
  };

  const passwordHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const loginHandler = async () => {
    const data = { email: email.trim(), password };
    Keyboard.dismiss();

    try {
      setLoading(true);

      const user = await UserService.logIn(data);
      setLoading(false);
      if (user) {
        dispatch({ type: actions.user.storeUserInfo, data: user });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert('Ooops..', err.message, [{ text: 'OK', onPress: () => {} }], {
        cancelable: false,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={styles.logo}>
        <Image
          style={{ flex: 1, resizeMode: 'contain' }}
          source={require('../../../images/logo.png')}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          keyboardType="email-address"
          style={styles.textInput}
          placeholder="Email"
          autoCorrect={false}
          placeholderTextColor="#FFF"
          onChangeText={emailHandler}
          value={email}
        />

        <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholderTextColor="#FFF"
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={passwordHandler}
          value={password}
        />
      </View>
      <View style={styles.viewBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('forgotPassword');
          }}
          style={{ alignSelf: 'flex-end' }}>
          <Text style={styles.forgotPasswordtext}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <View style={styles.login}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.light} />
          ) : (
            <Button
              large
              type="white"
              title="ENTRAR"
              press={loginHandler}
              disabled={buttonDisabled || loading}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.signUP}
          onPress={async () => {
            navigation.navigate('location');
          }}>
          <Text style={styles.signupText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
