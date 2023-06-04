import React, { createContext, useMemo } from 'react';
import callService from '../../services/callService';
import feedbackService from '../../services/Feedback';

export const FeedbackContext = createContext({});

export const FeedbackContextProvider = ({ children }) => {
    const createFeedback = async (senderId, receiverId, body) => {
        const response = await callService(feedbackService, 'createFeedback', [
            senderId,
            receiverId,
            body,
        ]);
        return response;
    };

    const getFeedbackByReceiverId = async (receiverId) => {
        const response = await callService(
            feedbackService,
            'getFeedbackByReceiverId',
            [receiverId],
        );
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
