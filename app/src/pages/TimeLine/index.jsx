import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { DefaultTimeline } from '../../components/organisms/DefaultTimeline';
import { useFocusEffect } from '@react-navigation/native';
import { TimelineContext } from '../../store/contexts/timelineContext';
import { Icon } from 'react-native-elements';
import colors from '../../../colors';
import formatDate from '../../utils/formatDate';

export const Timeline = () => {
    const [timelineItems, setTimelineItems] = useState([]);
    const { getTimelineItems } = useContext(TimelineContext);

    useFocusEffect(
        useCallback(() => {
            const fetchTimelineItems = async () => {
                const response = await getTimelineItems();
                setTimelineItems(response);
            };
            fetchTimelineItems();
        }, []),
    );

    const parsedTimelineItems = timelineItems.map((item) => {
        const { title, description, iconName } = item.template;
        const time = formatDate(item.createdAt, '-').slice(0, 5);
        return {
            title,
            description,
            icon: (
                <View className="bg-light rounded-full p-1 border-[0.5px] border-black-100">
                    <Icon
                        name={iconName}
                        type="material-community"
                        color={colors.primary.DEFAULT}
                        size={22}
                    />
                </View>
            ),
            time,
        };
    });

    return (
        <View className="bg-new_background flex-1 px-4 py-6">
            <DefaultTimeline data={parsedTimelineItems} useIcon />
        </View>
    );
};
