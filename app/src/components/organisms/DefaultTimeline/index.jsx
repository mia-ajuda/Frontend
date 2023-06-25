import React from 'react';
import Timeline from 'react-native-timeline-flatlist';
import colors from '../../../../colors';
import { TimelineItem } from '../../molecules/TimelineItem';

export const DefaultTimeline = ({
    data,
    lineWidth = 4,
    hasImage = false,
    useIcon = false,
}) => {
    const renderContent = (data, sectionID) => (
        <TimelineItem data={data} key={sectionID} hasImage={hasImage} />
    );

    return (
        <Timeline
            data={data}
            lineWidth={lineWidth}
            lineColor={colors.primary[300]}
            circleColor={useIcon ? 'transparent' : colors.primary.DEFAULT}
            circleSize={useIcon ? 32 : 24}
            innerCircle={useIcon ? 'icon' : 'none'}
            timeStyle={{
                backgroundColor: colors.primary.DEFAULT,
                padding: 4,
                borderRadius: 12,
                color: colors.light,
                fontFamily: 'montserrat-semibold',
                fontSize: 12,
                textAlign: 'center',
            }}
            renderDetail={renderContent}
        />
    );
};
