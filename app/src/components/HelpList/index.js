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

const list = [
  {
    title: "Preciso de comida",
    description: "lorrane vekadrane",
    category: {
      title: "Compras",
      description: "Quero mercadin",
    },
  },
  {
    title: "Preciso de pão",
    description:
      "lorrane vekadrane stefany boeni smity de haha de raio lazer bala skits tem 60 anos e está precisando de ajuda para comprar comida no mercadim",
    category: {
      title: "Psicológico",
      description: "Quero café",
    },
  },
  {
    title: "Preciso de ajuda",
    description: "lorrane vekadrane stefany boeni smity de haha de raio lazer",
    category: {
      title: "Atenção",
      description: "Quero arte",
    },
  },
  {
    title: "Preciso de status",
    description:
      "lorrane vekadrane stefany boeni smity de haha de raio lazer bala skits tem 60 anos e está precisando de ajuda para comprar comida no mercadim",
    category: {
      title: "Psicológico",
      description: "Quero café",
    },
  },
];

export default class HelpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconName: "caret-up",
    };

    this.handlePress = this.handlePress.bind(this);
    this.animatedValue = new Animated.Value(0);
  }

  handlePress() {
    switch (this.state.iconName) {

      case 'caret-up':
        this.setState({iconName: "caret-down"});
        Animated.timing(this.animatedValue, {
          toValue: 400,
          duration: 500
        }).start();
        break;
        
        case 'caret-down':
          this.setState({iconName: "caret-up"});
          Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 500,
          }).start();
        break;
    
    }
  }

  getFormattedDescription = (text) => {
    let res = text.length > 107 ? text.substring(0, 106) + "..." : text;
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
            {list.map((item, i) => (
              <ListCard
                key={i}
                helpTitle={item.title}
                helpDescription={this.getFormattedDescription(item.description)}
                helpCategory={item.category.title}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
