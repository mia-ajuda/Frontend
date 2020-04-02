import React, { Component, version } from "react";
import { View, Text } from "react-native";
import { ListCard } from "../ListCard"

import styles from "./styles";

const list = [
  {
    title: "Preciso de comida",
    description: "lorrane vekadrane stefany boeni smity de haha de raio lazer bala skits tem 60 anos e está precisando de ajuda para comprar comida no mercadim",
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
    description: "lorrane vekadrane stefany boeni smity de haha de raio lazer bala skits tem 60 anos e está precisando de ajuda para comprar comida no mercadim",
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
  
  
  
  render() {
    return (
      <View style={styles.listContainer}>
          list.map((item, i) => (
            <ListCard 
              key={i}
              helpInfo={item}
            />
          ))
      </View>
    );
  }
}
