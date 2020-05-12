import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import helpReducer from "../reducers/helpReducer";
import { LocationContext } from "./locationContext";
import { UserContext } from "./userContext";
import { CategoryContext } from "./categoryContext";
import actions from "../actions";
import HelpService from "../../services/Help";
import {
  connect,
  disconnect,
  subscribeToNewHelps,
  subscribeToDeleteHelp,
  changeCategories,
  changeLocations,
} from "../../services/socket";
import { calculateDistance } from "../../utils/helpDistance";
import firebase from "firebase";
export const HelpContext = createContext();
let activeLocations = [];

export default function HelpContextProvider(props) {
  const { location } = useContext(LocationContext);
  const { selectedCategories } = useContext(CategoryContext);
  const { user, currentRegion,firebaseUser} = useContext(UserContext);
  const [helpList, dispatch] = useReducer(helpReducer, []);
  const [ loadingHelps, setLoadingHelps ] = useState(false);
  useEffect(() => {
    setLoadingHelps(true);
    if (currentRegion && user._id && firebase.auth().currentUser) {
      activeLocations.push(currentRegion);
      getHelpList(currentRegion);
      setupWebSocket();
    }
  }, [user._id,currentRegion,firebaseUser]);

  useEffect(() => {
    subscribeToNewHelps((help) => {
      if (help.ownerId !== user._id) {
        const helpListArray = [...helpList, help];
        dispatch({ type: actions.help.storeList, helps: helpListArray });
      }
    });

    subscribeToDeleteHelp((helpId) => {
      let helpListArray = helpList.filter((help) => {
        return help._id != helpId;
      });
      dispatch({ type: actions.help.storeList, helps: helpListArray });
    });
  }, [helpList]);

  useEffect(() => {
    if (location) {
      activeLocations = [location];
      if (selectedCategories.length) {
        getHelpListWithCategories(location);
      } else {
        getHelpList(location);
      }
      changeCategories(selectedCategories);
      changeLocations(activeLocations);
    }
  }, [selectedCategories]);

  useEffect(() => {
    if(location)
    { 
      var latValidation = (location.latitude*10000)-(currentRegion.latitude*10000);
      var longValidation = (location.longitude * 10000) - (currentRegion.longitude * 10000);
      longValidation = Math.abs(longValidation)
      latValidation = Math.abs(latValidation)

      if (location && shouldRequest(location) && (latValidation>1 || longValidation>1)){
        activeLocations.push(location);
        if (selectedCategories.length) {
          getHelpListWithCategories(location);
        } else {
          getHelpList(location);
        }
        changeLocations(activeLocations);
      }
    }
  }, [location]);

  async function getHelpList(loc) {
    if (loc) {
      try {
        const { _id: userId } = user;
        let helpListArray = await HelpService.getNearHelp(loc, userId);
        if (activeLocations.length > 1) {
          helpListArray = [...helpList, ...helpListArray];
          helpListArray = getUnique(helpListArray, "_id");
        }
        setLoadingHelps(false);
        dispatch({ type: actions.help.storeList, helps: helpListArray });
      } catch (error) {
        console.log(error +' error da getlist');
      }
    }
  }

  async function getHelpListWithCategories(loc) {
    if (loc && selectedCategories.length) {
      try {
        const { _id: userId } = user;
        let helpListFiltered = await HelpService.getAllHelpForCategory(
          loc,
          selectedCategories,
          userId
        );
        if (activeLocations.length > 1) {
          helpListFiltered = [...helpList, ...helpListFiltered];
          helpListFiltered = getUnique(helpListFiltered, "_id");
        }
        dispatch({ type: actions.help.storeList, helps: helpListFiltered });
      } catch (error) {
        console.log(error + "error da LIstacategoria");
      }
    }
  }

  function getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  function setupWebSocket() {
    disconnect();
    const { _id: userId } = user;
    connect(JSON.stringify(currentRegion), userId);
  }

  function shouldRequest({ latitude, longitude }) {
    let should = true;
    if (activeLocations) {
      activeLocations.every((element) => {
        const distance = calculateDistance({ latitude, longitude }, element);
        if (distance < 1) {
          should = false;
          return false;
        }
        return true;
      });
    }
    return should;
  }

  return (
    <HelpContext.Provider value={{ helpList, dispatch, loadingHelps }}>
      {props.children}
    </HelpContext.Provider>
  );
}
