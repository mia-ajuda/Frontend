import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import callService from '../../services/callService';
import helpService from '../../services/Help';
import campaignService from '../../services/Campaign';
import { LoadingContext } from './loadingContext';
import { UserContext } from './userContext';
import actions from '../actions';
import helpReducer from '../reducers/helpReducer';
import activityService from '../../services/Activity';
import {
    connect,
    disconnect,
    subscribeToDeleteHelp,
    subscribeToDeleteHelpOffer,
    subscribeToNewHelps,
} from '../../services/socket';

export const ActivitiesContext = createContext({});

export const ActivitiesContextProvider = ({ children }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const { user, userPosition } = useContext(UserContext);
    const [activitiesList, dispatch] = useReducer(helpReducer, []);
    const [loadingActivities, setLoadingActivities] = useState(false);

    useEffect(() => {
        if (userPosition && user._id) {
            setLoadingActivities(true);
            getActivityList();
            setupWebSocket();
        }
    }, [user._id, userPosition]);

    useEffect(() => {
        subscribeToNewHelps((activity) => {
            if (activity.ownerId !== user._id) {
                const activitiesArray = [...activitiesList, activity];
                activitiesArray.sort((a, b) => {
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
                    helps: activitiesArray,
                });
            }
        });

        subscribeToDeleteHelp((activityId) => {
            let activityListArray = activitiesList.filter((help) => {
                return help._id != activityId;
            });
            dispatch({
                type: actions.help.storeList,
                helps: activityListArray,
            });
        });

        subscribeToDeleteHelpOffer((helpOfferId) => {
            let activityListArray = activitiesList.filter((help) => {
                return help._id != helpOfferId;
            });
            dispatch({
                type: actions.help.storeList,
                helps: activityListArray,
            });
        });
    }, []);

    function setupWebSocket() {
        disconnect();
        const { _id: userId } = user;
        connect(JSON.stringify(userPosition), userId);
    }

    const activitiesServices = {
        help: helpService,
        offer: helpService,
        campaign: campaignService,
    };

    const servicesEndpoints = {
        getById: {
            help: 'getHelpWithAggregationById',
            offer: 'getHelpOfferWithAggregationById',
            campaign: 'getCampaignById',
        },
        interact: {
            help: 'offerHelp',
            offer: 'participateHelpOffer',
        },
    };

    async function getActivityList(categoryId = null, activityId = null) {
        const activitiesListResponse = await callService(
            activityService,
            'getActivityList',
            [user._id, userPosition, categoryId, activityId],
        );
        if (!activitiesListResponse.error) {
            dispatch({
                type: actions.help.storeList,
                helps: activitiesListResponse,
            });
        }
        setLoadingActivities(false);
    }

    async function getActitivtieById(activityType, activityId) {
        const activityInfo = await callService(
            activitiesServices[activityType],
            servicesEndpoints.getById[activityType],
            [activityId],
        );
        return activityInfo;
    }

    function removeElementFromMap(activityId) {
        const filteredActivityList = activitiesList.filter(
            (mapHelp) => mapHelp._id != activityId,
        );
        dispatch({ type: actions.help.storeList, helps: filteredActivityList });
    }

    async function interactWithActivity(
        activityType,
        activityId,
        finishLoading = false,
    ) {
        setIsLoading(true);
        const response = await callService(
            activitiesServices[activityType],
            servicesEndpoints.interact[activityType],
            [activityId, user._id],
        );
        if (!response.error) removeElementFromMap(activityId);
        if (finishLoading) setIsLoading(false);
        return response;
    }

    const contextValue = useMemo(() => {
        return {
            getActitivtieById,
            interactWithActivity,
            activitiesList,
            loadingActivities,
            getActivityList,
        };
    }, [
        getActitivtieById,
        interactWithActivity,
        activitiesList,
        loadingActivities,
        getActivityList,
    ]);

    return (
        <ActivitiesContext.Provider value={contextValue}>
            {children}
        </ActivitiesContext.Provider>
    );
};
