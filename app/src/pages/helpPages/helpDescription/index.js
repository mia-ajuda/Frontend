import React, { useContext, useState } from "react";
import { View, Text, Image, Alert,Linking, TouchableOpacity } from "react-native";
import styles from "./styles";
import Button from "../../../components/UI/button";
import moment from "moment";
import { UserContext } from "../../../store/contexts/userContext";
import HelpService from "../../../services/Help";
import ConfirmationModal from "./confirmationModal";
export default function HelpDescription({ route, navigation }) {
  const { user } = useContext(UserContext);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const {
    helpDescription,
    categoryName,
    helpId,
    userName,
    birthday,
    city,
    profilePhoto,
    helperId,
    userPhone,
    userLocation,
  } = route.params;

  const currentYear = moment().format("YYYY");
  const birthYear = moment(birthday).format("YYYY");

  const age = currentYear - birthYear;

  //console.log(userLocation+' ok')

  async function chooseHelp() {
    try {
      //console.log("helpId", helpId);
      //console.log("userID", user.info._id);
      await HelpService.chooseHelp(helpId, user.info._id, user.accessToken);
      setConfirmationModalVisible(false);
      navigation.goBack();
      Alert.alert(
        "Sucesso",
        "Oferta enviada com sucesso e estará no aguardo para ser aceita",
        [{ title: "OK" }]
      );
    } catch (error) {
      console.log(error);
      navigation.goBack();
      Alert.alert(
        "Erro",
        "Houve um erro ao tentar processar sua oferta de ajuda, tente novamente mais tarde",
        [{ title: "OK" }]
      );
    }
  }
  //console.log('https://www.google.com.br/maps/@' + userLocation[1] + ',' + userLocation[0])
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${userLocation[1]},${userLocation[0]}`;
  const label = 'Pedido de Ajuda de '+userName;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  });


  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={confirmationModalVisible}
        setVisible={setConfirmationModalVisible}
        chooseHelp={chooseHelp}
      />
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: profilePhoto,
          }}
          style={styles.profileImage}
        />
        <View style={styles.infoTextView}>
          <Text
            style={[styles.infoText, { fontFamily: "montserrat-semibold" }]}
          >
            {userName}
          </Text>
          <Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>Idade: </Text>
            {age}
          </Text>
          <Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>Cidade: </Text>
            {city}
          </Text>
          {user.info._id == helperId && (<Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>Telefone: </Text>
            {userPhone}
          </Text>)}
        </View>
      </View>
      <View style={styles.helpInfo}>
        <View style={styles.helpInfoText}>
          <Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>
              Categoria:{" "}
            </Text>
            {categoryName}
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                fontFamily: "montserrat-semibold",
                marginTop: 20,
                marginBottom: 10,
              },
            ]}
          >
            Descrição:
          </Text>
          <Text style={styles.infoText}>{helpDescription}</Text>
        </View>
        {user.info._id == helperId && (<View style = {styles.ViewLink}>
          <Button
            title="Link para o Google Maps"
            large
            press={() => Linking.openURL(url)}
          />
        </View>)}
        <View style={styles.helpButtons}>
          {user.info._id!=helperId &&(
            <Button
            title="Oferecer Ajuda"
            large
            press={() => setConfirmationModalVisible(true)}
          />)}
        </View>
      </View>
    </View>
  );
}
