import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles"

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
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam etiam erat velit scelerisque. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Massa ultricies mi quis hendrerit dolor magna eget. Ullamcorper sit amet risus nullam eget felis eget nunc. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Iaculis urna id volutpat lacus laoreet non. In eu mi bibendum neque egestas congue quisque. Egestas maecenas pharetra convallis posuere morbi leo urna molestie at. Arcu ac tortor dignissim convallis aenean et tortor at risus. Sem et tortor consequat id porta nibh venenatis. Cras tincidunt lobortis feugiat vivamus at. Dui nunc mattis enim ut. Id diam vel quam elementum pulvinar etiam non quam lacus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Etiam non quam lacus suspendisse faucibus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Fusce id velit ut tortor.

        Egestas purus viverra accumsan in nisl nisi scelerisque eu. Bibendum enim facilisis gravida neque convallis a cras. Rhoncus urna neque viverra justo nec ultrices. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Fames ac turpis egestas integer eget. Sapien faucibus et molestie ac feugiat. Eget nunc lobortis mattis aliquam faucibus purus. Sit amet volutpat
    </Text>
    </View>
  )
}