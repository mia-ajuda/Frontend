import React, { createContext, useReducer, useContext, useEffect } from "react";
import helpReducer from "../reducers/helpReducer";
import { UserContext } from "./userContext";
import getHelpDistance from "../../utils/helpDistance";
import actions from "../actions";
import HelpService from "../../services/Help";

export const HelpContext = createContext();

export default function HelpContextProvider(props) {
  const { currentRegion } = useContext(UserContext);
  const [helpList, dispatch] = useReducer(helpReducer, []);

  useEffect(() => {
    async function getHelpList() {
      if (currentRegion) {
        try {
          let helpListArray = await HelpService.getNearHelp(currentRegion);

          helpListArray = helpListArray.map((help) => {
            //insert help distance to the list
            const helpCoords = {
              latitude: help.user[0].location.coordinates[1],
              longitude: help.user[0].location.coordinates[0],
            };
            help.distance = getHelpDistance(currentRegion, helpCoords);

            return help;
          });

          dispatch({ type: actions.help.addHelp, helps: helpListArray });
        } catch (error) {
          console.log(error);
        }
      }
    }
    getHelpList();
  }, [currentRegion]);

  return (
    <HelpContext.Provider value={{ helpList, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
}
