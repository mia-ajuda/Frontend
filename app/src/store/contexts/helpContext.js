import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import helpReducer from "../reducers/helpReducer";
import { LocationContext } from "./locationContext";
import { UserContext } from "./userContext";
import { CategoryContext } from "./categoryContext";
import actions from "../actions";
import HelpService from "../../services/Help"
import { connect, disconnect, subscribeToNewHelps, subscribeToDeleteHelp } from '../../services/socket'
import { calculateDistance } from '../../utils/helpDistance';
export const HelpContext = createContext();
let activeLocations = []

export default function HelpContextProvider(props) {
  const { location } = useContext(LocationContext);
  const { selectedCategories } = useContext(CategoryContext)
  const { user, currentRegion } = useContext(UserContext);
  const [helpList, dispatch] = useReducer(helpReducer, []);

  useEffect(() => {
    if(location && user.info && currentRegion) {
      if(shouldRequest(location)) {
        activeLocations.push(location)
        setupWebSocket();
        if(selectedCategories.length) {
          getHelpListWithCategories()
        } else {
          getHelpList();
        }
      }
    }
  }, [location, user]);

  useEffect(() => {
    if(selectedCategories && selectedCategories.length &&location && user.info && currentRegion) {
      activeLocations = [location]

      setupWebSocket();
      getHelpListWithCategories();
    }
    if(!selectedCategories.length && location && user.info) {
      activeLocations = [location];

      setupWebSocket();
      getHelpList();
    }
  }, [selectedCategories])

  useEffect(() => {
    subscribeToNewHelps(help => {
      const helpListArray = [...helpList, help]
      dispatch({ type: actions.help.storeList, helps: helpListArray })
    })
    subscribeToDeleteHelp(helpId => {
      let helpListArray = helpList.filter(help => {
        return help._id != helpId
      })
      dispatch({ type: actions.help.storeList, helps: helpListArray })
    })
  }, [helpList])

  async function getHelpList() {
    if (location) {
      try {
        const { _id: userId } = user.info;
        let helpListArray = await HelpService.getNearHelp(location, userId);
        if(activeLocations.length > 1) {
          helpListArray = [...helpList, ...helpListArray]
          helpListArray = getUnique(helpListArray, '_id')
        } 
        dispatch({ type: actions.help.storeList, helps: helpListArray });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getHelpListWithCategories() {
    if(location && selectedCategories.length) {
      try {
        const { _id: userId } = user.info;
        let helpListFiltered = await HelpService.getAllHelpForCategory(
        location,
        selectedCategories,
        userId
        )
        if(activeLocations.length > 1) {
          helpListFiltered = [...helpList, ...helpListFiltered]
          helpListFiltered = getUnique(helpListFiltered, '_id')
        }
        dispatch({ type: actions.help.storeList, helps: helpListFiltered });
      } catch (error) {
        console.log(error)
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
    connect(JSON.stringify(activeLocations), JSON.stringify(currentRegion), JSON.stringify(selectedCategories))
  }

  function shouldRequest({latitude, longitude}) {
    let should = true;
    if(activeLocations) {
        activeLocations.every(element => {
            const distance = calculateDistance({latitude, longitude}, element)
            if(distance < 2) {
                should = false
                return false 
            }
            return true
        })
    }
    return should;
}

  return (
    <HelpContext.Provider value={{ helpList, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
}
