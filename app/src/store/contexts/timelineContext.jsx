import React, { createContext, useContext, useMemo } from 'react';
import callService from '../../services/callService';
import { LoadingContext } from './loadingContext';
import { UserContext } from './userContext';
import timelineService from '../../services/Timeline';

export const TimelineContext = createContext({});

export const TimelineContextProvider = ({ children }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const getTimelineItems = async () => {
        setIsLoading(true);
        const response = await callService(
            timelineService,
            'getTimelineByUserId',
            [user._id],
        );
        setIsLoading(false);
        return response;
    };

    const contextValue = useMemo(() => {
        return {
            getTimelineItems,
        };
    }, [getTimelineItems]);

    return (
        <TimelineContext.Provider value={contextValue}>
            {children}
        </TimelineContext.Provider>
    );
};
