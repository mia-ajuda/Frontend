import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useState,
} from 'react';
import helpReducer from '../reducers/helpReducer';
import { UserContext } from './userContext';
import { CategoryContext } from './categoryContext';
import actions from '../actions';
import HelpService from '../../services/Help';
import {
    connect,
    disconnect,
    subscribeToNewHelps,
    subscribeToDeleteHelp,
    changeCategories,
} from '../../services/socket';
export const HelpContext = createContext();

export default function HelpContextProvider(props) {
    const { selectedCategories } = useContext(CategoryContext);
    const { user, userPosition } = useContext(UserContext);
    const [helpList, dispatch] = useReducer(helpReducer, []);
    const [loadingHelps, setLoadingHelps] = useState(false);

    useEffect(() => {
        setLoadingHelps(true);
        if (userPosition && user._id) {
            getHelpList(userPosition);
            setupWebSocket();
        }
    }, [user._id, userPosition]);

    useEffect(() => {
        subscribeToNewHelps((help) => {
            if (help.ownerId !== user._id) {
                const helpListArray = [...helpList, help];
                helpListArray.sort((a, b) => {
                    if (a.distanceValue < b.distanceValue) {
                        return -1;
                    }
                    if (a.distanceValue > b.distanceValue) {
                        return 1;
                    }
                    return 0;
                });
                dispatch({
                    type: actions.help.storeList,
                    helps: helpListArray,
                });
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
        if (userPosition) {
            if (selectedCategories.length) {
                getHelpListWithCategories(userPosition);
            } else {
                getHelpList(userPosition);
            }
            changeCategories(selectedCategories);
        }
    }, [selectedCategories]);

    async function getHelpList(loc) {
        if (loc) {
            try {
                const { _id: userId } = user;
                let helpListArray = await HelpService.getNearHelp(loc, userId);
                setLoadingHelps(false);
                dispatch({
                    type: actions.help.storeList,
                    helps: helpListArray,
                });
            } catch (error) {
                console.log(error);
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
                    userId,
                );
                dispatch({
                    type: actions.help.storeList,
                    helps: helpListFiltered,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    function setupWebSocket() {
        disconnect();
        const { _id: userId } = user;
        connect(JSON.stringify(userPosition), userId);
    }

    return (
        <HelpContext.Provider value={{ helpList, dispatch, loadingHelps }}>
            {props.children}
        </HelpContext.Provider>
    );
}
