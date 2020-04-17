import React, { createContext, useReducer, useContext, useEffect } from "react";
import helpReducer from "../reducers/helpReducer";
import { UserContext } from "./userContext";
import actions from "../actions";
import HelpService from "../../services/Help";

export const HelpContext = createContext();

export default function HelpContextProvider(props) {
  const { currentRegion, user } = useContext(UserContext);
  const [helpList, dispatch] = useReducer(helpReducer, []);

  useEffect(() => {
    if (user) getHelpList();
  }, [currentRegion, user]);

  async function getHelpList() {
    if (currentRegion) {
      console.log("currentRegion", currentRegion);
      try {
        const userId = user.data.info._id;
        let helpListArray = await HelpService.getNearHelp(
          currentRegion,
          userId
        );

        dispatch({ type: actions.help.addHelp, helps: helpListArray });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <HelpContext.Provider value={{ helpList, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
}
