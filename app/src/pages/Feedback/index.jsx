import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import colors from '../../../colors';
import { FeedbackContext } from '../../store/contexts/feedbackContext';
import { UserContext } from '../../store/contexts/userContext';
import { useFocusEffect } from '@react-navigation/native';
import formatDate from '../../utils/formatDate';
import { NotFound } from '../../components/organisms/NotFound';
import { FeedbackItem } from './FeedbackItem';
import { LoadingContext } from '../../store/contexts/loadingContext';

export const FeedbackScreen = () => {
    const { getFeedbackByReceiverId } = useContext(FeedbackContext);
    const { user } = useContext(UserContext);
    const { isLoading } = useContext(LoadingContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const hasFeedbacks = feedbacks.length > 0;

    const getData = async () => {
        const data = await getFeedbackByReceiverId(user._id);
        setFeedbacks(data);
    };

    useFocusEffect(
        useCallback(() => {
            getData();
        }, []),
    );

    const mappedFeedbacks = feedbacks.map((feedback) => ({
        title: feedback.sender.name,
        description: feedback.message,
        time: formatDate(feedback.creationDate, '-').slice(0, 5),
        icon: feedback.sender.photo,
    }));

    const renderContent = (data, sectionID) => (
        <FeedbackItem data={data} key={sectionID} />
    );

    return (
        <View className="flex-1  h-full p-4">
            {hasFeedbacks && (
                <Timeline
                    data={mappedFeedbacks}
                    lineWidth={4}
                    lineColor={colors.primary[300]}
                    circleColor={colors.primary.DEFAULT}
                    timeStyle={{
                        backgroundColor: colors.primary.DEFAULT,
                        padding: 4,
                        borderRadius: 12,
                        color: colors.light,
                        fontFamily: 'montserrat-semibold',
                    }}
                    renderDetail={renderContent}
                />
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
