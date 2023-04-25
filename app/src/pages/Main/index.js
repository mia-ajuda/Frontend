import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import CreateHelpButtons from '../../components/CreateHelpButtons';
import CategoryListModal from '../../components/modals/category/CategoryList';
import { HelpContext } from '../../store/contexts/helpContext';
import { CampaignContext } from '../../store/contexts/campaignContext';
import { UserContext } from '../../store/contexts/userContext';
import { HelpOfferContext } from '../../store/contexts/helpOfferContext';
import HelpList from '../../components/HelpList';
import CampaignMarker from './CampaignMarker';
import HelpMarker from './HelpMarker';
import HelpOfferMarker from './HelpOfferMarker';
import createInteraction from '../../utils/createInteraction';
import CustomMap from '../../components/CustomMap';
import { BadgeContext } from '../../store/contexts/badgeContext';

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

    useEffect(() => {
        setRegion(null);
    }, [region]);

    useEffect(() => {
        if (!env.production) {
            increaseUserBadge(user._id, 'tester');
        }
    }, []);

    const renderCampaignMarkers = () => {
        return campaignList.map((campaign) => {
            return <CampaignMarker key={campaign._id} campaign={campaign} />;
        });
    };

    const renderHelpMakers = () => {
        return helpList.map((help) => {
            const isRiskGroup = !!help.user.riskGroup.length;

            return (
                <HelpMarker
                    key={help._id}
                    isRiskGroup={isRiskGroup}
                    help={help}
                />
            );
        });
    };

    const renderHelpOfferMakers = () => {
        return helpOfferList.map((helpOffer) => {
            return (
                <HelpOfferMarker key={helpOffer._id} helpOffer={helpOffer} />
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

    return (
        <>
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
}
