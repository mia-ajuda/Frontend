import React, {
    useState,
    useContext,
    useEffect,
    Fragment,
    useRef,
} from 'react';
import { View, Text, FlatList, Pressable, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import CategoryListModal from '../../components/modals/category/CategoryList';
import { UserContext } from '../../store/contexts/userContext';
import { HelpOfferContext } from '../../store/contexts/helpOfferContext';
import createInteraction from '../../utils/createInteraction';
import CustomMap from '../../components/CustomMap';
import { BadgeContext } from '../../store/contexts/badgeContext';
import { ActivityMarker } from '../../components/molecules/ActivityMarker';
import { DefaultButton } from '../../components/atoms/DefaultButton';
import { firstName } from '../../utils/shortenName';
import { ActivityCard } from '../../components/organisms/ActivityCard';
import sortActivitiesByDistance from '../../utils/sortActivitiesByDistance';
import colors from '../../../colors';
import { ActivityBottomSheetContext } from '../../store/contexts/activityBottomSheetContext';
import { ActivityBottomSheet } from '../../components/modals/ActivityBottomSheet';
import navigateToDescription from '../../utils/navigateToDescription';
import { ActivityFlatList } from '../../components/atoms/ActivityFlatList';

export default function Main({ navigation, route }) {
    const [region, setRegion] = useState(null);
    const [helpListVisible, setHelpListVisible] = useState(false);
    const { helpList } = useContext(HelpContext);
    const { userPosition, user, isEntity, env } = useContext(UserContext);
    const { increaseUserBadge } = useContext(BadgeContext);
    const [focusedCardLocation, setFocusedCardLocation] = useState({});
    const [visibleItemData, setVisibleItemData] = useState(null);
    const {
        handleShowModal,
        showActivityModal,
        activityInfo,
        setShowActivityModal,
    } = useContext(ActivityBottomSheetContext);
    const allActivities = sortActivitiesByDistance({
        helpList,
        helpOfferList,
        campaignList,
        limit: false,
    });

    useEffect(() => {
        setRegion(null);
    }, [region]);

    useEffect(() => {
        if (!env.production && !isEntity) {
            increaseUserBadge(user._id, 'tester');
        }
    }, []);

    const navigateToCreatePage = (page) => {
        const creationPage =
            page == 'help' ? 'createHelpRequest' : 'createHelpOffer';
        createInteraction(user, navigation, creationPage);
    };

    // const renderCampaignMarkers = () => {
    //     return campaignList.map((campaign, i) => {
    //         const focused = visibleItemData?._id == campaign._id;
    //         return (
    //             <ActivityMarker
    //                 key={campaign._id + `${focused}`}
    //                 activity={campaign}
    //                 activityType={'campaign'}
    //                 index={i + 1}
    //                 focused={focused}
    //             />
    //         );
    //     });
    // };

    // const renderHelpMakers = () => {
    //     return helpList.map((help, i) => {
    //         const focused = visibleItemData?._id == help._id;
    //         return (
    //             <ActivityMarker
    //                 key={help._id + `${focused}`}
    //                 activity={help}
    //                 activityType={'help'}
    //                 index={i + 1}
    //                 focused={focused}
    //             />
    //         );
    //     });
    // };

    // const renderHelpOfferMakers = () => {
    //     return helpOfferList.map((helpOffer, i) => {
    //         const focused = visibleItemData?._id == helpOffer._id;
    //         return (
    //             <ActivityMarker
    //                 key={helpOffer._id + `${focused}`}
    //                 activity={helpOffer}
    //                 activityType={'offer'}
    //                 index={i + 1}
    //                 focused={focused}
    //             />
    //         );
    //     });
    // };

    // const markersStrategy = {
    //     1: renderHelpMakers(),
    //     2: renderHelpOfferMakers(),
    //     3: renderCampaignMarkers(),
    // };

    // const renderMarkers = () => {
    //     if (selectedMarker.length) {
    //         return selectedMarker.map((marker) => {
    //             return markersStrategy[marker];
    //         });
    //     } else {
    //         return [
    //             renderHelpMakers(),
    //             renderHelpOfferMakers(),
    //             renderCampaignMarkers(),
    //         ];
    //     }
    // };

    // const renderFilterButton = () => (
    //     <TouchableOpacity
    //         style={styles.filter}
    //         onPress={() => {
    //             setFilterModalVisible(!filterModalVisible);
    //         }}
    //     >
    //         <Icon
    //             name="filter"
    //             type="font-awesome"
    //             color={colors.dark}
    //             size={20}
    //         />
    //     </TouchableOpacity>
    // );

    const renderHelpButtons = () => {
        return (
            <Fragment>
                {renderWelcomeText()}
                <View className="flex-row space-x-2 justify-center">
                    <View className="w-1/2 px-1">
                        <DefaultButton
                            title="Criar pedido"
                            variant="elevated"
                            size="md"
                            onPress={() => navigateToCreatePage('help')}
                        />
                    </View>
                    <View className="w-1/2 px-1">
                        <DefaultButton
                            title="Criar oferta"
                            variant="elevated"
                            size="md"
                            onPress={() => navigateToCreatePage('offer')}
                        />
                    </View>
                </View>
            </Fragment>
        );
    };

    // const renderCreateRequestButton = () => {
    //     if (isEntity) {
    //         return (
    //             <TouchableOpacity
    //                 style={styles.campaignButton}
    //                 onPress={() => {
    //                     createInteraction(user, navigation, 'createCampaign');
    //                 }}
    //             >
    //                 <Icon
    //                     name="plus"
    //                     type="font-awesome"
    //                     color={colors.light}
    //                     size={30}
    //                 />
    //             </TouchableOpacity>
    //         );
    //     } else renderHelpButtons();
    // };

    const renderWelcomeText = () => {
        return (
            <View className="mt-4 mb-3">
                <Text className="font-ms-regular text-lg text-black leading-6">
                    <Text className="font-ms-bold">
                        Olá {firstName(user.name)},
                    </Text>
                    {'\n'}o que vamos fazer hoje?
                </Text>
            </View>
        );
    };

    const renderHelpCards = () => {
        const activitiesList = sortActivitiesByDistance({
            helpList,
            campaignList,
            helpOfferList,
            limit: true,
        });

        const onViewableItemsChanged = useRef(({ viewableItems }) => {
            if (viewableItems && viewableItems.length > 0) {
                const visibleItem = viewableItems[0].item;
                setVisibleItemData(visibleItem);
                setFocusedCardLocation({
                    latitudeDelta: 0.0015,
                    longitudeDelta: 0.0015,
                    longitude: visibleItem.location.coordinates[0],
                    latitude: visibleItem.location.coordinates[1],
                });
            }
        });

        return (
            <View className="mt-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-black text-lg font-ms-bold">
                        Próximos a você
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('mapScreen')}
                        android_ripple={{ color: colors.gray.DEFAULT }}
                        className="p-1"
                    >
                        <Text className="text-primary font-ms-bold">
                            VER MAIS
                        </Text>
                    </Pressable>
                </View>
                <ActivityFlatList
                    list={activitiesList}
                    onViewableItemsChanged={onViewableItemsChanged}
                />
            </View>
        );
    };

    const mapHeight = Dimensions.get('window').height * 0.32;

    return (
        <View className="px-6">
            {/* <CategoryListModal
                visible={filterModalVisible}
                setVisible={setFilterModalVisible}
                isHistoryPage={false}
                setSelectedMarker={setSelectedMarker}
                selectedMarker={selectedMarker}
              /> */}
            {renderHelpButtons()}
            <View className="mt-4">
                <Text className="text-lg font-ms-bold text-black">Mapa</Text>
                <View
                    className="mt-2 rounded-2xl overflow-hidden"
                    style={{ height: mapHeight }}
                >
                    <CustomMap
                        initialRegion={userPosition}
                        region={region}
                        setHelpListVisible={setHelpListVisible}
                        animateToRegion={focusedCardLocation}
                    >
                        {allActivities.map((activity, i) => {
                            const focused =
                                visibleItemData?._id == activity._id;
                            return (
                                <ActivityMarker
                                    key={activity._id + `${focused}`}
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
                                    focused={focused}
                                />
                            );
                        })}
                    </CustomMap>
                </View>
            </View>
            {renderHelpCards()}
            {showActivityModal && (
                <ActivityBottomSheet
                    navigation={navigation}
                    isRiskGroup={false}
                    setShowModal={setShowActivityModal}
                    selectedActivity={activityInfo}
                />
            )}
            {/* {renderFilterButton()} */}

            {/* <View style={styles.helpList}>
                <HelpList
                    helps={helpList}
                    visible={helpListVisible}
                    setVisible={setHelpListVisible}
                    navigation={navigation}
                />
            </View> */}
        </View>
    );
}
