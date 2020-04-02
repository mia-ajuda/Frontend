import React, { Component, version } from "react";
import { View, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import ListCard from "../ListCard"

import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

const list = [
  {
    title: "Preciso de comida",
    description: "lorrane vekadrane",
    category: {
      title:"Compras",
      description:"Quero mercadin",
    }
  },
  {
    title: "Preciso de pão",
    description: "lorrane vekadrane stefany boeni smity de haha de raio lazer bala skits tem 60 anos e está precisando de ajuda para comprar comida no mercadim",
    category: {
      title:"Psicológico",
      description:"Quero café",
    }
  },
  {
    title: "Preciso de ajuda",
    description: "lorrane vekadrane stefany boeni smity de haha de raio lazer",
    category: {
      title:"Atenção",
      description:"Quero arte",
    }
  },
  {
    title: "Preciso de status",
    description: "lorrane vekadrane stefany boeni smity de haha de raio lazer bala skits tem 60 anos e está precisando de ajuda para comprar comida no mercadim",
    category: {
      title:"Psicológico",
      description:"Quero café",
    }
  }
]

export default class HelpList extends Component {
  
  getFormattedDescription(text) {
    if(text.length > 110){
      let formattedDescription = text.substring(0, 109) + '...'
      return formattedDescription 
    }
    else {
      return text
    }
  }
  
  render() {
    return (
      <View style={styles.helpListContainer}>
        <ScrollView style={styles.listContent}>
          {
            list.map((item, i) => (
              <ListCard 
                key={i}
                helpTitle={item.title}
                helpDescription={this.getFormattedDescription(item.description)}
                helpCategory={item.category.title}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}
