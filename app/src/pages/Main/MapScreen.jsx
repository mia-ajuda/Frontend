import React, { Fragment, useContext, useEffect } from 'react';
import CustomMap from '../../components/CustomMap';
import { ActivityMarker } from '../../components/molecules/ActivityMarker';
import { UserContext } from '../../store/contexts/userContext';
import { StatusBar } from 'react-native';
import { ScreenTemplateContext } from '../../store/contexts/ScreenTemplateContext';
import { FloatingIconButton } from '../../components/molecules/FloatingIconButton';

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

    const goBackButtonAction = () => {
        setUseSafeAreaView(false);
        navigation.goBack();
    };

    return (
        <Fragment>
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            <CustomMap
                initialRegion={userPosition}
                animateToRegion={focusedCardLocation}
            >
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
            <FloatingIconButton
                iconName="arrow-back"
                customTop="top-10"
                iconSize="2xl"
                color="bg-white"
                onPress={goBackButtonAction}
            />
        </Fragment>
    );
}
