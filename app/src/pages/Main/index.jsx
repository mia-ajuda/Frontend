import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements';
import CreateHelpButtons from '../../components/CreateHelpButtons';
import CategoryListModal from '../../components/modals/category/CategoryList';
import { HelpContext } from '../../store/contexts/helpContext';
import { CampaignContext } from '../../store/contexts/campaignContext';
import { UserContext } from '../../store/contexts/userContext';
import { HelpOfferContext } from '../../store/contexts/helpOfferContext';
import HelpList from '../../components/HelpList';
import createInteraction from '../../utils/createInteraction';
import CustomMap from '../../components/CustomMap';
import { BadgeContext } from '../../store/contexts/badgeContext';
import { ActivityMarker } from '../../components/molecules/ActivityMarker';
import colors from '../../../colors';
import { ActivityBottomSheetContext } from '../../store/contexts/activityBottomSheetContext';
import navigateToDescription from '../../utils/navigateToDescription';

export default function Main({ navigation }) {
    const [region, setRegion] = useState(null);
    const [helpListVisible, setHelpListVisible] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState([]);
    const { helpList } = useContext(HelpContext);
    const { userPosition, user, isEntity, env } = useContext(UserContext);
    const { campaignList } = useContext(CampaignContext);
    const { helpOfferList } = useContext(HelpOfferContext);
    const { increaseUserBadge } = useContext(BadgeContext);
    const { handleShowModal, showActivityModal } = useContext(
        ActivityBottomSheetContext
    );

    useEffect(() => {
        setRegion(null);
    }, [region]);

    useEffect(() => {
        if (!env.production && !isEntity) {
            increaseUserBadge(user._id, 'tester');
        }
    }, []);

    const renderCampaignMarkers = () => {
        return campaignList.map((campaign, i) => {
            return (
                <ActivityMarker
                    key={campaign._id}
                    activity={campaign}
                    activityType={'campaign'}
                    index={i + 1}
                    onPress={() =>
                        navigateToDescription(
                            user,
                            navigation,
                            campaign._id,
                            campaign.ownerId,
                            'campaign',
                            handleShowModal,
                        )
                    }
                />
            );
        });
    };

    const renderHelpMakers = () => {
        return helpList.map((help, i) => {
            return (
                <ActivityMarker
                    key={help._id}
                    activity={help}
                    activityType={'help'}
                    index={i + 1}
                    onPress={() =>
                        navigateToDescription(
                            user,
                            navigation,
                            help._id,
                            help.ownerId,
                            'help',
                            handleShowModal,
                        )
                    }
                />
            );
        });
    };

    const renderHelpOfferMakers = () => {
        return helpOfferList.map((helpOffer, i) => {
            return (
                <ActivityMarker
                    key={helpOffer._id}
                    activity={helpOffer}
                    activityType={'offer'}
                    index={i + 1}
                    onPress={() =>
                        navigateToDescription(
                            user,
                            navigation,
                            helpOffer._id,
                            helpOffer.ownerId,
                            'offer',
                            handleShowModal,
                        )
                    }
                />
            );
        });
    };

    const markersStrategy = {
        1: renderHelpMakers(),
        2: renderHelpOfferMakers(),
        3: renderCampaignMarkers(),
    };

    const renderMarkers = () => {
        if (selectedMarker.length) {
            return selectedMarker.map((marker) => {
                return markersStrategy[marker];
            });
        } else {
            return [
                renderHelpMakers(),
                renderHelpOfferMakers(),
                renderCampaignMarkers(),
            ];
        }
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

    const renderActivitiesInteractions = () => (
        <>
            {renderCreateRequestButton()}
            {renderFilterButton()}
            <View style={styles.helpList}>
                <HelpList
                    helps={helpList}
                    visible={helpListVisible}
                    setVisible={setHelpListVisible}
                    navigation={navigation}
                />
            </View>
        </>
    );
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

            {!showActivityModal && renderActivitiesInteractions()}
        </>
    );
}
