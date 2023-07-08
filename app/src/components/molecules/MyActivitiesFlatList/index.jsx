import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import MyRequestCard from '../../MyRequestCard';

export function MyActivitiesFlatList({
    data,
    loadOnGoingActivity,
    navigation,
    setConfirmationModalVisible,
    setHelpToDelete,
    renderItem,
    type,
}) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const navigateProps = {
        offer: {
            screen: 'myOfferHelpDescription',
            routeId: 'HelpOffer',
        },
        help: {
            screen: 'myRequestHelpDescription',
            routeId: 'Help',
        },
    };

    const renderCards = ({ item }) => {
        const possibleInterestedList =
            type == 'help'
                ? item.possibleHelpers
                : [...item.possibleHelpedUsers, ...item.helpedUserId];
        return (
            <TouchableOpacity
                key={item._id}
                onPress={() =>
                    navigation.navigate(navigateProps[type].screen, {
                        helpId: item._id,
                        routeId: navigateProps[type].routeId,
                    })
                }
            >
                <MyRequestCard
                    object={item}
                    setConfirmationModalVisible={setConfirmationModalVisible}
                    setSelectedHelp={setHelpToDelete}
                    possibleInterestedList={possibleInterestedList}
                />
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem || renderCards}
            key={(item) => item._id}
            refreshing={isRefreshing}
            onRefresh={async () => loadOnGoingActivity(setIsRefreshing)}
        />
    );
}
