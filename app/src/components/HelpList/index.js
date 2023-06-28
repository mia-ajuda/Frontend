import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityCard } from '../organisms/ActivityCard';
import colors from '../../../colors';
import { Icon } from 'react-native-elements';

export default function HelpList({
    helps,
    filterModalVisible,
    setFilterModalVisible,
}) {
    const renderFilterButton = () => (
        <TouchableOpacity
            style={styles.filter}
            onPress={() => {
                setFilterModalVisible(!filterModalVisible);
            }}
        >
            <Icon
                name="filter"
                type="font-awesome"
                color={colors.black.DEFAULT}
                size={20}
            />
        </TouchableOpacity>
    );

    const renderHelpList = () => {
        return (
            <FlatList
                data={helps}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={{ marginHorizontal: 8 }}
                renderItem={({ item, index }) => {
                    const isRiskGroup = !!item.user.riskGroup.length;
                    return (
                        <ActivityCard
                            variant="help"
                            count={index + 1}
                            id={item._id}
                            isRiskGroup={isRiskGroup}
                            ownerId={item.ownerId}
                            title={item.title}
                            description={item.description}
                            badges={item.categories}
                            distance={item.distance}
                            creationDate={item.creationDate}
                            userId={item.user._id}
                        />
                    );
                }}
            />
        );
    };

    return (
        <View style={styles.helpListContainer}>
            {renderFilterButton()}
            {helps.length > 0 && renderHelpList()}
        </View>
    );
}
