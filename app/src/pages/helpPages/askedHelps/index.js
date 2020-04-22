import React,{useContext,useEffect} from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import {HelpContext} from "../../../store/contexts/helpContext";
import ListCard from "../../../components/ListCard"
import { UserContext } from "../../../store/contexts/userContext";
export default function AskedHelps() {
  
  const {helpList} = useContext(HelpContext);
  const {user} = useContext(UserContext);
  //console.log(user.info._id)
  return (
    <View style={styles.container}>
      {helpList.map(help =>{
        //console.log(help)
        if(help.helperId == user.info._id){

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
          />
        }

      })}
      <ListCard 
      
      ></ListCard>
    </View>
  );
}
