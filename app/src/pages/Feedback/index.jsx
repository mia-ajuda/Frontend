import React from 'react';
import { Image, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import colors from '../../../colors';
import { Divider } from '../../components/atoms/Divider';

export const FeedbackScreen = () => {
    const feedbacks = [
        {
            id: 1,
            title: 'Carlos Dias',
            description:
                'Muito bom o aplicativo, me ajudou muito a encontrar o que eu precisava',
            time: '01.05',
            icon: (
                <Image
                    source={{
                        uri: 'https://criticalhits.com.br/wp-content/uploads/2019/01/naruto-uzumaki_qabz.png',
                    }}
                    className="rounded-full h-8 w-8"
                />
            ),
        },
        {
            id: 2,
            title: 'Carlos Dias',
            description:
                'Muito bom o aplicativo, me ajudou muito a encontrar o que eu precisava aso dk dsao kda skod  d',
            time: '01.05',
            icon: (
                <Image
                    source={{
                        uri: 'https://criticalhits.com.br/wp-content/uploads/2019/01/naruto-uzumaki_qabz.png',
                    }}
                    className="rounded-full h-8 w-8"
                />
            ),
        },
        {
            id: 3,
            title: 'Carlos Dias',
            description:
                'Muito bom o aplicativo, me ajudou muito a encontrar o que eu precisava',
            time: '01.05',
            icon: (
                <Image
                    source={{
                        uri: 'https://criticalhits.com.br/wp-content/uploads/2019/01/naruto-uzumaki_qabz.png',
                    }}
                    className="rounded-full h-8 w-8"
                />
            ),
        },

        {
            id: 4,
            title: 'Carlos Dias',
            description:
                'Muito bom o aplicativo, me ajudou muito a encontrar o que eu precisava',
            time: '01.05',
            icon: (
                <Image
                    source={{
                        uri: 'https://criticalhits.com.br/wp-content/uploads/2019/01/naruto-uzumaki_qabz.png',
                    }}
                    className="rounded-full h-8 w-8"
                />
            ),
        },
    ];

    const renderContent = (data) => (
        <View className="flex-1 -mt-2 ml-2">
            <Text className="font-ms-bold text-black">{data.title}</Text>
            <Text className="font-ms-regular text-black">
                {data.description}
            </Text>
            <Divider />
        </View>
    );

    return (
        <View className="flex-1 w-full h-full py-2 px-4">
            <Timeline
                data={feedbacks}
                circleSize={32}
                innerCircle="icon"
                lineColor={colors.primary[400]}
                timeStyle={{
                    backgroundColor: colors.primary.DEFAULT,
                    padding: 4,
                    borderRadius: 12,
                    color: colors.light,
                    fontFamily: 'montserrat-semibold',
                    marginRight: 4,
                }}
                renderDetail={renderContent}
            />
        </View>
    );
};
