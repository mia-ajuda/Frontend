import React, { useCallback, useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import colors from '../../../colors';
import { Divider } from '../../components/atoms/Divider';
import { FeedbackContext } from '../../store/contexts/feedbackContext';
import { UserContext } from '../../store/contexts/userContext';
import { useFocusEffect } from '@react-navigation/native';
import formatDate from '../../utils/formatDate';

export const FeedbackScreen = () => {
    const { getFeedbackByReceiverId } = useContext(FeedbackContext);
    const { user } = useContext(UserContext);
    const [feedbacks, setFeedbacks] = useState([]);

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

    const renderContent = (data) => (
        <View className="-mt-2 mb-2 w-full">
            <View className="flex-row mb-2">
                <Image
                    source={{
                        uri: `data:image/png;base64,${data.icon}`,
                    }}
                    className="rounded-full h-10 w-10"
                />
                <View className="flex-1 ml-2">
                    <Text className="font-ms-bold text-black mb-[0.5px]">
                        {data.title}
                    </Text>
                    <Text className="font-ms-regular text-black text-xs">
                        {data.description}
                    </Text>
                </View>
            </View>
            <Divider marginHorizontal={4} />
        </View>
    );

    return (
        <View className="flex-1  h-full p-4">
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
        </View>
    );
};
