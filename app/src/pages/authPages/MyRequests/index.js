import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import styles from "./styles";
import Header from "../../../components/Header";
import ListCard from "../../../components/ListCard";
import { Icon } from "react-native-elements";
import helpService from "../../../services/Help";

export default class MyRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpList: [],
    };

    helpService
      .getAllHelps("5e8b75d0472afe002600abda")
        .then((data) => {
          this.setState({ helpList: data });
        });
  };

  getFormattedTitle = (title) => {
    let res = title.length > 20 ? title.substring(0, 16) + "..." : title;
    return res;
  };

  getFormattedDescription = (text) => {
    let res = text.length > 110 ? text.substring(0, 106) + "..." : text;
    return res;
  };

  render() {
    return(
      <View style={styles.container}>
          <Header
            headerTitle="Meus Pedidos"
          />
          <ScrollView>
              <View style={styles.listContent}>
                {this.state.helpList.map((item, i) => (
                  <ListCard
                    key={i}
                    helpTitle={this.getFormattedTitle(item.title)}
                    helpDescription={this.getFormattedDescription(item.description)}
                    helpCategory="bafafa"
                  />
                ))}
              </View>
          </ScrollView>
      </View>
    );
  };
};