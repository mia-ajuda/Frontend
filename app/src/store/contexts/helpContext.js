import React, { createContext, useReducer, useContext, useEffect } from "react";
import helpReducer from "../reducers/helpReducer";
<<<<<<< HEAD
import { LocationContext } from "./locationContext";
=======
import { UserContext } from "./userContext";
>>>>>>> 90f7ae4e3a23ebbfdc2cce45f68bb512def9463e
import actions from "../actions";
import HelpService from "../../services/Help"
import { connect, disconnect, subscribeToNewHelps, subscribeToDeleteHelp } from '../../services/socket'
export const HelpContext = createContext();

export default function HelpContextProvider(props) {
  const { location } = useContext(LocationContext);
  const { user } = useContext(UserContext);
  const [helpList, dispatch] = useReducer(helpReducer, []);

  useEffect(() => {
    if(user.info && location) {
      getHelpList();
      setupWebSocket();
    }
  }, [location, user]);

  useEffect(() => {
    subscribeToNewHelps(help => {
      const helpListArray = [...helpList, help]
      dispatch({ type: actions.help.addHelp, helps: helpListArray })
    })
    subscribeToDeleteHelp(helpId => {
      let helpListArray = helpList.filter(help => {
        return help._id != helpId
      })
      dispatch({ type: actions.help.addHelp, helps: helpListArray })
    })
  }, [helpList])

  async function getHelpList() {
    if (location) {
      try {
        const { _id: userId } = user.info;
        let helpListArray = await HelpService.getNearHelp(location, userId);
        if(helpList.length > 0) {
          helpListArray = [...helpList, ...helpListArray]
          helpListArray = getUnique(helpListArray, '_id')
        } 
        dispatch({ type: actions.help.addHelp, helps: helpListArray });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function getUnique(arr, comp) {

    const unique = arr
      .map(e => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
  }

  function setupWebSocket() {
    disconnect()
    connect(location.latitude, location.longitude)
  }

  return (
    <HelpContext.Provider value={{ helpList, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
}
