import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import ListCard from "../ListCard";

import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

export default function HelpList({ helps, visible, setVisible }) {
  const [iconName, setIconName] = useState("caret-up");
  const [animatedValue] = useState(new Animated.Value(40));

  useEffect(() => {
    switch (visible) {
      case true:
        setIconName("caret-down");
        Animated.spring(animatedValue, {
          toValue: helps.length > 0 ? 400 : 300,
          tension: 10,
        }).start();
        break;

      case false:
        setIconName("caret-up");
        Animated.spring(animatedValue, {
          toValue: 40,
        }).start();
        break;
    }
  }, [visible]);

  return (
    <Animated.View
      style={[styles.helpListContainer, { height: animatedValue }]}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
        <View style={styles.buttonStyle}>
          <Icon
            size={25}
            name={iconName}
            type="font-awesome"
            color={colors.light}
          />
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <>
          {helps.length > 0 ? (
            <ScrollView
              style={styles.listContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollStyle}
            >
              {helps.map((item, i) => (
                <ListCard
                  key={i}
                  helpTitle={item.title}
                  helpDescription={item.description}
                  categoryName={item.category[0].name}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyList}>
              <Image
                source={require("../../../assets/images/whiteCat.png")}
                style={styles.emptyListImage}
              />
              <Text style={styles.emptyListText}>Não há ajudas próximas </Text>
            </View>
          )}
        </>
      )}
    </Animated.View>
  );
}
