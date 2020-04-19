import React, { createContext, useReducer, useContext, useEffect } from "react";
import helpReducer from "../reducers/helpReducer";
import { UserContext } from "./userContext";
import actions from "../actions";
import HelpService from "../../services/Help"
import { connect, disconnect, subscribeToNewHelps, subscribeToDeleteHelp } from '../../services/socket'
export const HelpContext = createContext();

export default function HelpContextProvider(props) {
  const { currentRegion } = useContext(UserContext);
  const [helpList, dispatch] = useReducer(helpReducer, []);

  useEffect(() => {
    getHelpList();
    if(currentRegion) {
      setupWebSocket();
    }
  }, [currentRegion]);

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
    if (currentRegion) {
      try {
        let helpListArray = await HelpService.getNearHelp(currentRegion);
        dispatch({ type: actions.help.addHelp, helps: helpListArray });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function setupWebSocket() {
    disconnect()
    connect(currentRegion.latitude, currentRegion.longitude)
  }

  return (
    <HelpContext.Provider value={{ helpList, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
}
