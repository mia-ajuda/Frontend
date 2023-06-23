import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityCard } from '../../organisms/ActivityCard';

export const ActivityFlatList = ({ list, onViewableItemsChanged }) => {
    const renderCards = ({ item, index }) => (
        <View className="mt-2 h-44 w-[300]">
            <ActivityCard
                key={item._id}
                variant={item.type}
                id={item._id}
                count={index + 1}
                title={item.title}
                description={item.description || item.categories.description}
                badges={item.categories}
                distance={item.distance}
                creationDate={item.creationDate}
                ownerId={item.ownerId}
            />
        </View>
    );

    const memoizedFlatListItem = useCallback(renderCards, [list]);

    return (
        <FlatList
            data={list}
            removeClippedSubviews
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            snapToInterval={300}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 300,
            }}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            showsHorizontalScrollIndicator={false}
            renderItem={memoizedFlatListItem}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged?.current}
        />
    );
};
