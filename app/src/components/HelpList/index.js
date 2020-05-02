import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Image,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import ListCard from "../ListCard";

import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

export default function HelpList({ helps, visible, setVisible, navigation }) {
  const [iconName, setIconName] = useState("caret-up");
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(40));

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy < 0) {
          if (!visible) {
            setVisible(true);
          }
        } else {
          if (!visible) {
            setVisible(false);
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy < 0) {
          if (!visible) {
            setVisible(true);
          }
        } else {
          if (!visible) {
            setVisible(false);
          }
        }
      },
    })
  ).current;

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
      {...panResponder.panHandlers}
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
              {helps.map((help, i) => (
                <ListCard
                  key={help._id}
                  profilePhoto={help.user.photo}
                  helpId={help._id}
                  deleteVisible={false}
                  helpTitle={help.title}
                  helpDescription={help.description}
                  categoryName={help.category[0].name}
                  userName={help.user.name}
                  birthday={help.user.birthday}
                  city={help.user.address.city}
                  navigation={navigation}
                  pageName="helpDescription"
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
