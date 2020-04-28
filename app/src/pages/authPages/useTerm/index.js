import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles"
import { ScrollView } from "react-native-gesture-handler";
import UseTermService from "../../../services/UseTerm"

export default function UseTerm({navigation}) {

  return (
    <View style={styles.safeAreaView}>
      <View style={styles.backButon}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Icon
            name={"arrow-back"}
            color={"black"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
      <Text style={styles.text1}>
      Termos de uso e Política de Privacidade
     </Text>
      <Text>
      {UseTermService.useTerm()}
     </Text>
      </ScrollView>
    </View>
  )
}