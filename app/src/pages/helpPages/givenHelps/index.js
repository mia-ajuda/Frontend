import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import { HelpContext } from "../../../store/contexts/helpContext";
import ListCard from "../../../components/ListCard";
import { UserContext } from "../../../store/contexts/userContext";
import NoHelps from "../../../components/NoHelps";
export default function AskedHelps({ navigation }) {
  const { helpList } = useContext(HelpContext);
  const { user } = useContext(UserContext);
  const [myHelps, setMyHelps] = useState(
    helpList.filter((help) => help.helperId == user.info._id)
  );

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
              profilePhoto={help.user[0].photo}
              helpId={help._id}
              helpTitle={help.title}
              helpDescription={help.description}
              categoryName={help.category[0].name}
              userName={help.user[0].name}
              birthday={help.user[0].birthday}
              city={help.user[0].address.city}
              navigation={navigation}
              helperId={help.helperId}
              userPhone={help.user[0].phone}
              userLocation={help.user[0].location.coordinates}
            />
          ))}
        </ScrollView>
      ) : (
        <NoHelps title="Você não está ajudando ninguém até o momento" />
      )}
    </View>
  );
}
