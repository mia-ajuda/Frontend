import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { HelpContext } from "../../../store/contexts/helpContext";
import styles from "./styles";
import ListCard from "../../../components/ListCard";

export default function MyHelpList({navigation}) {
  const { helpList } = useContext(HelpContext);

  return (
    <View style={styles.container}>
      {helpList.length > 0 ? (
            <ScrollView
              style={styles.listContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollStyle}
            >
              {helpList.map((help, i) => (
                <ListCard
                  key={help._id}
                  profilePhoto={help.user[0].photo}
                  helpId={help._id}
                  helpTitle={help.title}
                  helpDescription={help.description}
                  categoryName={help.category[0].name}
                  userName={help.user[0].name}
                  birthday={help.user[0].birthday}
                  city={help.user[0].address.city}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyList}>
              <Image
                source={require("../../../../assets/images/whiteCat.png")}
                style={styles.emptyListImage}
              />
              <Text style={styles.emptyListText}>Você não tem pedidos de ajuda.</Text>
            </View>
          )}
    </View>
  );
}
