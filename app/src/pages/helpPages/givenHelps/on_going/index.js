import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import styles from "../../MyRequests/styles";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import NoHelps from "../../../../components/NoHelps";
import colors from "../../../../../assets/styles/colorVariables";
import helpService from "../../../../services/Help";
export default function AskedHelps({ navigation }) {
  const { user } = useContext(UserContext);
  const [myHelps, setMyHelps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getHelps();
    });
    return unsubscribe;
  }, [navigation]);

  async function getHelps() {
    setLoading(true);
    let helpsOnGoing = await helpService.getAllHelpForHelper(
      user._id,
      "on_going"
    );
    
    let helpsOwnerFinished = await helpService.getAllHelpForHelper(
      user._id,
      "owner_finished"
    );
    
    let helps = [...helpsOnGoing,...helpsOwnerFinished];
    
    let filteredHelps = helps.filter(help => help.active === true);
   
    setMyHelps(filteredHelps);
    setLoading(false);
  }


  return (
    <View style={styles.helpList}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : myHelps.length ? (
        <ScrollView>
          {myHelps.map((help) => (
            <ListCard
              key={help._id}
              profilePhoto={help.user.photo}
              helpId={help._id}
              helpTitle={help.title}
              helpDescription={help.description}
              categoryName={help.category[0].name}
              userName={help.user.name}
              birthday={help.user.birthday}
              city={help.user.address.city}
              navigation={navigation}
              helperId={help.helperId}
              userPhone={help.user.phone}
              userLocation={help.user.location.coordinates}
              pageName="Description"
              />
          ))}
        </ScrollView>
      ) : (
        <NoHelps title="Você não está ajudando ninguém até o momento" />
      )}
    </View>
  );
}
