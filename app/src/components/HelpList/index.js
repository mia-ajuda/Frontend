import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "react-native-elements";
import ListCard from "../ListCard";

import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

import helpService from "../../services/Help";

export default class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconName: "caret-up",
      helpList: [],
    };

    helpService.getAllHelps().then((data) => {
      this.setState({ helpList: data });
    });

    this.handlePress = this.handlePress.bind(this);
    this.animatedValue = new Animated.Value(0);
  }

  handlePress() {
    switch (this.state.iconName) {
      case "caret-up":
        this.setState({ iconName: "caret-down" });
        Animated.timing(this.animatedValue, {
          toValue: 400,
          duration: 400,
        }).start();
        break;

      case "caret-down":
        this.setState({ iconName: "caret-up" });
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 400,
        }).start();
        break;
    }
  }

  getFormattedTitle = (title) => {
    let res = title.length > 20 ? title.substring(0, 16) + "..." : title;
    return res;
  };

  getFormattedDescription = (text) => {
    let res = text.length > 110 ? text.substring(0, 106) + "..." : text;
    return res;
  };

  render() {
    const animatedStyle = {
      height: this.animatedValue,
    };

    return (
      <View style={styles.helpListContainer}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.buttonStyle}>
            <Icon
              size={25}
              name={this.state.iconName}
              type="font-awesome"
              color={colors.light}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.View style={animatedStyle}>
          <ScrollView style={[styles.listContent]}>
            {this.state.helpList.map((item, i) => (
              <ListCard
                key={i}
                helpTitle={this.getFormattedTitle(item.title)}
                helpDescription={this.getFormattedDescription(item.description)}
                helpCategory="bafafa"
              />
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
