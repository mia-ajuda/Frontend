import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements';
import CreateHelpButtons from '../../components/CreateHelpButtons';
import CategoryListModal from '../../components/modals/category/CategoryList';
import { UserContext } from '../../store/contexts/userContext';
import HelpList from '../../components/HelpList';
import createInteraction from '../../utils/createInteraction';
import CustomMap from '../../components/CustomMap';
import { BadgeContext } from '../../store/contexts/badgeContext';
import { ActivityMarker } from '../../components/molecules/ActivityMarker';
import colors from '../../../colors';
import { ActivityBottomSheetContext } from '../../store/contexts/activityBottomSheetContext';
import navigateToDescription from '../../utils/navigateToDescription';
import { ActivityBottomSheet } from '../../components/modals/ActivityBottomSheet';
import { ActivitiesContext } from '../../store/contexts/activitiesContext';

export default function Main({ navigation }) {
    const [region, setRegion] = useState(null);
    const [helpListVisible, setHelpListVisible] = useState(false);
    const { activitiesList } = useContext(ActivitiesContext);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState([]);
    const { userPosition, user, isEntity, env } = useContext(UserContext);
    const { increaseUserBadge } = useContext(BadgeContext);
    const {
        handleShowModal,
        showActivityModal,
        activityInfo,
        setShowActivityModal,
    } = useContext(ActivityBottomSheetContext);

    useEffect(() => {
        setRegion(null);
    }, [region]);

    useEffect(() => {
        if (!env.production && !isEntity) {
            increaseUserBadge(user._id, 'tester');
        }
    }, []);

    const renderMarkers = () => {
        return activitiesList.map((activity, i) => {
            return (
                <ActivityMarker
                    key={activity._id}
                    activity={activity}
                    activityType={activity.type}
                    index={i + 1}
                    onPress={() =>
                        navigateToDescription(
                            user,
                            navigation,
                            activity._id,
                            activity.ownerId,
                            activity.type,
                            handleShowModal,
                        )
                    }
                />
            );
        });
    };

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
                color={colors.dark}
                size={20}
            />
        </TouchableOpacity>
    );

    const renderCreateRequestButton = () => {
        if (isEntity) {
            return (
                <TouchableOpacity
                    style={styles.campaignButton}
                    onPress={() => {
                        createInteraction(user, navigation, 'createCampaign');
                    }}
                >
                    <Icon
                        name="plus"
                        type="font-awesome"
                        color={colors.light}
                        size={30}
                    />
                </TouchableOpacity>
            );
        } else return <CreateHelpButtons />;
    };

    const renderActivitiesInteractions = () => {
        const helps = activitiesList.filter(
            (activity) => activity.type == 'help',
        );
        return (
            <>
                {renderCreateRequestButton()}
                {renderFilterButton()}
                {activitiesList.length > 0 && (
                    <View style={styles.helpList}>
                        <HelpList
                            helps={helps}
                            visible={helpListVisible}
                            setVisible={setHelpListVisible}
                            navigation={navigation}
                        />
                    </View>
                )}
            </>
        );
    };
    return (
        <>
            <StatusBar backgroundColor={'transparent'} />
            <CategoryListModal
                visible={filterModalVisible}
                setVisible={setFilterModalVisible}
                isHistoryPage={false}
                setSelectedMarker={setSelectedMarker}
                selectedMarker={selectedMarker}
            />
            <CustomMap
                initialRegion={userPosition}
                region={region}
                setHelpListVisible={setHelpListVisible}
            >
                {renderMarkers()}
            </CustomMap>
            {showActivityModal && (
                <ActivityBottomSheet
                    navigation={navigation}
                    isRiskGroup={false}
                    setShowModal={setShowActivityModal}
                    selectedActivity={activityInfo}
                />
            )}
            {!showActivityModal && renderActivitiesInteractions()}
        </>
    );
}
