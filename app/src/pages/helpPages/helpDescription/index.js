import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import Button from "../../../components/UI/button";
import moment from "moment";
import { UserContext } from "../../../store/contexts/userContext";
import HelpService from "../../../services/Help";
import ConfirmationModal from "./confirmationModal";
import colors from "../../../../assets/styles/colorVariables";
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

  console.log(userLocation);

  async function chooseHelp() {
    try {
      console.log("helpId", helpId);
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

  function openMaps() {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${userLocation[1]},${userLocation[0]}`;
    const label = "Pedido de Ajuda de " + userName;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  }

  function openWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${"5561996997082"}&text=${"Olá, precisa de ajuda? estou"}`
    );
  }

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
          {user.info._id == helperId && (
            <Text style={styles.infoText}>
              <Text style={{ fontFamily: "montserrat-semibold" }}>
                Telefone:
              </Text>
              {userPhone}
            </Text>
          )}
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
          <Text style={[styles.infoText, { marginBottom: 50 }]}>
            {helpDescription}
          </Text>
        </View>
        {user.info._id == helperId && (
          <View style={styles.ViewLink}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity onPress={openWhatsapp}>
                <Icon
                  name="whatsapp"
                  type="font-awesome"
                  size={50}
                  color="#25d366"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={openMaps}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  size={50}
                  color={colors.dark}
                />
              </TouchableOpacity>
            </View>

            <Button title="Finalizar ajuda" large press={() => {}} />
          </View>
        )}
        <View style={styles.helpButtons}>
          {user.info._id != helperId && (
            <Button
              title="Oferecer Ajuda"
              large
              press={() => setConfirmationModalVisible(true)}
            />
          )}
        </View>
      </View>
    </View>
  );
}
