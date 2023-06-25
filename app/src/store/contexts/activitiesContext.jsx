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
        }
    }, [user._id, userPosition]);

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
        };
    }, [
        getActitivtieById,
        interactWithActivity,
        activitiesList,
        loadingActivities,
    ]);

    return (
        <ActivitiesContext.Provider value={contextValue}>
            {children}
        </ActivitiesContext.Provider>
    );
};
