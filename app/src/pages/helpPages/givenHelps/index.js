import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import { HelpContext } from "../../../store/contexts/helpContext";
import ListCard from "../../../components/ListCard";
import { UserContext } from "../../../store/contexts/userContext";
import NoHelps from "../../../components/NoHelps";
import helpService from "../../../services/Help"
export default function AskedHelps({ 
  navigation, 
}) {
  const { helpList } = useContext(HelpContext);
  const { user } = useContext(UserContext);
  const [myHelps, setMyHelps] = useState(
    helpList.filter((help) => help.helperId == user.info._id)
  );
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus",()=>{
      console.log("1");
      getHelps();  
    })
    return unsubscribe;
  },[navigation])

  
  async function getHelps(){
    const helps = await helpService.getAllHelpForHelper(user.info._id,"on_going");
    console.log(JSON.stringify(helps)+'ieie')
  }

  useEffect(() => {
    setMyHelps(helpList.filter((help) => help.helperId == user.info._id));
  }, [helpList]);
  return (
    <View style={styles.container}>
      {myHelps.length ? (
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
            />
          ))}
        </ScrollView>
      ) : (
        <NoHelps title="Você não está ajudando ninguém até o momento" />
      )}
    </View>
  );
}
