import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { FeedbackContext } from '../../store/contexts/feedbackContext';
import { UserContext } from '../../store/contexts/userContext';
import { useFocusEffect } from '@react-navigation/native';
import formatDate from '../../utils/formatDate';
import { NotFound } from '../../components/organisms/NotFound';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { DefaultTimeline } from '../../components/organisms/DefaultTimeline';

export const FeedbackScreen = () => {
    const { getFeedbackByReceiverId } = useContext(FeedbackContext);
    const { user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const hasFeedbacks = feedbacks.length > 0;
    const mappedFeedbacks = feedbacks.map((feedback) => ({
        title: feedback.sender.name,
        description: feedback.message,
        time: formatDate(feedback.creationDate, '-').slice(0, 5),
        icon: feedback.sender.photo,
    }));

    const getData = async () => {
        const data = await getFeedbackByReceiverId(user._id);
        setFeedbacks(data);
    };

    useFocusEffect(
        useCallback(() => {
            getData();
        }, []),
    );

    return (
        <View className="flex-1  h-full p-4">
            {hasFeedbacks && (
                <DefaultTimeline data={mappedFeedbacks} hasImage />
            )}
            {!hasFeedbacks && !isLoading && (
                <NotFound
                    title="Nenhum feedback recebido"
                    body="Você ainda não recebeu nenhum feedback"
                    size="large"
                />
            )}
        </View>
    );
};
