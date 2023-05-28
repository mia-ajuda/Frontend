import React, { useContext, useEffect } from 'react';
import CustomMap from '../../components/CustomMap';
import { ActivityMarker } from '../../components/molecules/ActivityMarker';
import { UserContext } from '../../store/contexts/userContext';
import { StatusBar } from 'react-native';
import { ScreenTemplateContext } from '../../store/contexts/ScreenTemplateContext';

export default function MapScreen({ route, navigation }) {
    const { allActivities, focusedCardLocation, visibleItemData } =
        route.params;
    const { userPosition } = useContext(UserContext);
    const { setUseSafeAreaView } = useContext(ScreenTemplateContext);

    useEffect(() => {
        setUseSafeAreaView(false);
        navigation.addListener('beforeRemove', () => {
            setUseSafeAreaView(true);
            return;
        });
    }, []);

    return (
        <CustomMap
            initialRegion={userPosition}
            animateToRegion={focusedCardLocation}
        >
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            {allActivities.map((activity, i) => {
                const focused = visibleItemData?._id == activity._id;
                return (
                    <ActivityMarker
                        key={activity._id + `${focused}`}
                        activity={activity}
                        activityType={activity.type}
                        index={i + 1}
                        focused={focused}
                    />
                );
            })}
        </CustomMap>
    );
}
