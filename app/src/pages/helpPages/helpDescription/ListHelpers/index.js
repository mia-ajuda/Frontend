import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Badge } from "react-native-elements";
import ListHelperModal from "./ListHelperModal/index";
import moment from "moment";

import styles from "./styles";

export default function ListHelpers({
  clickAction,
  stateAction,
  possibleHelpers
}) {
  const [visible, setVisible] = useState(false);
  const [currentHelper, setCurrentHelper] = useState(null);

  const chooseHelper = () => {

  };

  return (
    <View
      style={[
        styles.container,
        stateAction
          ? { justifyContent: "flex-start" }
          : { justifyContent: "flex-end" }
      ]}
    >
      <TouchableOpacity
        style={styles.buttonHelpers}
        onPress={() => clickAction(!stateAction)}
      >
        <Text style={styles.textBtn}>Possíveis ajudantes</Text>
        {possibleHelpers.length !== 0 ? (
          <Badge
            value={
              <Text style={styles.labelBadge}>{possibleHelpers.length}</Text>
            }
            badgeStyle={styles.badgeStyle}
            containerStyle={styles.containerBadge}
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      {stateAction ? (
        <View style={styles.listPossibleHelpers}>
          <ScrollView>
            {possibleHelpers.map(helper => (
              <TouchableOpacity
                key={helper._id}
                onPress={() => {
                  setVisible(true);
                  setCurrentHelper(helper._id);
                }}
              >
                <View style={styles.helper}>
                  <Image
                    style={styles.imageProfile}
                    source={{
                      uri: helper.photo
                    }}
                  />
                  <View>
                    <Text
                      style={[
                        styles.infoText,
                        { fontFamily: "montserrat-semibold" }
                      ]}
                    >
                      {helper.name}
                    </Text>
                    <Text>
                      <Text
                        style={[
                          styles.infoText,
                          { fontFamily: "montserrat-semibold" }
                        ]}
                      >
                        Idade:{" "}
                      </Text>
                      {moment().diff(helper.birthday, "year")}
                    </Text>
                    <Text>
                      <Text
                        style={[
                          styles.infoText,
                          { fontFamily: "montserrat-semibold" }
                        ]}
                      >
                        Cidade:{" "}
                      </Text>
                      {helper.address.city}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <></>
      )}
      <ListHelperModal
        visible={visible}
        setVisible={setVisible}
        chooseHelper={chooseHelper}
      />
    </View>
  );
}
