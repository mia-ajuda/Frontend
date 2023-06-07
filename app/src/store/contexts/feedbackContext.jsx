import React, { createContext, useContext, useMemo } from 'react';
import callService from '../../services/callService';
import feedbackService from '../../services/Feedback';
import { LoadingContext } from './loadingContext';

export const FeedbackContext = createContext({});

export const FeedbackContextProvider = ({ children }) => {
    const { setIsLoading } = useContext(LoadingContext);
    const createFeedback = async (senderId, receiverId, body) => {
        setIsLoading(true);
        const response = await callService(feedbackService, 'createFeedback', [
            senderId,
            receiverId,
            body,
        ]);
        setIsLoading(false);
        return response;
    };

    const getFeedbackByReceiverId = async (receiverId) => {
        setIsLoading(true);
        const response = await callService(
            feedbackService,
            'getFeedbackByReceiverId',
            [receiverId],
        );
        setIsLoading(false);
        return response;
    };

    const contextValue = useMemo(() => {
        return {
            createFeedback,
            getFeedbackByReceiverId,
        };
    }, [createFeedback, getFeedbackByReceiverId]);

    return (
        <FeedbackContext.Provider value={contextValue}>
            {children}
        </FeedbackContext.Provider>
    );
};
