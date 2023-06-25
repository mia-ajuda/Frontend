import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import CustomMap from '../../components/CustomMap';
import { ActivityMarker } from '../../components/molecules/ActivityMarker';
import { UserContext } from '../../store/contexts/userContext';
import { StatusBar, View } from 'react-native';
import { ScreenTemplateContext } from '../../store/contexts/ScreenTemplateContext';
import { FloatingIconButton } from '../../components/molecules/FloatingIconButton';
import { Chips } from '../../components/atoms/Chips';
import { AcitivitiesFilterBottomSheet } from '../../components/modals/ActivityBottomSheet/FilterActivity';
import { CategoryContext } from '../../store/contexts/categoryContext';
import sortActivitiesByDistance from '../../utils/sortActivitiesByDistance';
import { useFocusEffect } from '@react-navigation/native';
import { CampaignContext } from '../../store/contexts/campaignContext';
import { HelpOfferContext } from '../../store/contexts/helpOfferContext';
import { HelpContext } from '../../store/contexts/helpContext';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { ActivityBottomSheetContext } from '../../store/contexts/activityBottomSheetContext';
import { ActivityBottomSheet } from '../../components/modals/ActivityBottomSheet';
import { ActivityFlatList } from '../../components/atoms/ActivityFlatList';

export default function MapScreen({ navigation }) {
    const { campaignList } = useContext(CampaignContext);
    const { helpOfferList } = useContext(HelpOfferContext);
    const { userPosition } = useContext(UserContext);
    const { helpList } = useContext(HelpContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { setUseSafeAreaView } = useContext(ScreenTemplateContext);
    const {
        selectedCategories,
        setSelectedCategories,
        selectedActivities,
        setSelectedActivities,
        setFilterCategories,
        filterCategories,
    } = useContext(CategoryContext);
    const [focusedCardLocation, setFocusedCardLocation] = useState();
    const [visibleItemData, setVisibleItemData] = useState();
    const [shouldRenderFilter, setShouldRenderFilter] = useState(false);
    const [activities, setActivities] = useState([]);
    const { showActivityModal, activityInfo, setShowActivityModal } =
        useContext(ActivityBottomSheetContext);

    const activitiesStrategy = {
        1: {
            name: 'helpList',
            value: helpList,
        },
        2: {
            name: 'helpOfferList',
            value: helpOfferList,
        },
        3: {
            name: 'campaignList',
            value: campaignList,
        },
    };

    useFocusEffect(
        useCallback(() => {
            if (filterCategories) {
                const argObj = {
                    limit: false,
                };

                setTimeout(() => {
                    selectedActivities.forEach((key) => {
                        const expectedKey = activitiesStrategy[key].name;
                        argObj[expectedKey] = activitiesStrategy[key].value;
                    });

                    setFilterCategories(false);
                    setActivities(sortActivitiesByDistance(argObj));
                }, 0);
            } else {
                setActivities(
                    sortActivitiesByDistance({
                        helpList,
                        helpOfferList,
                        campaignList,
                        limit: false,
                    }),
                );
            }
        }, [helpOfferList]),
    );

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

    const clearFilterSelection = () => {
        setIsLoading(true);
        setTimeout(() => {
            const sortedActivities = sortActivitiesByDistance({
                helpList,
                helpOfferList,
                campaignList,
                limit: false,
            });
            setSelectedActivities([]);
            setSelectedCategories([]);
            setActivities(sortedActivities);
            setIsLoading(false);
        }, 0);
    };

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
        <Fragment>
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            <CustomMap
                initialRegion={userPosition}
                animateToRegion={focusedCardLocation}
                showsMyLocationButton={false}
            >
                {activities.map((activity, i) => {
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
                customTop="top-10 z-0"
                iconSize="2xl"
                color="bg-white"
                onPress={goBackButtonAction}
            />
            <View className="absolute bottom-3 left-4 mr-4 border">
                <View className="flex-row mr-2">
                    <Chips
                        title="Filtrar"
                        icon="filter-list"
                        elevated
                        customStyle="w-20 justify-center ml-1"
                        type="button"
                        onPress={() => setShouldRenderFilter(true)}
                    />
                    {(selectedActivities.length > 0 ||
                        selectedCategories.length > 0) && (
                        <Chips
                            title="Limpar filtro"
                            elevated
                            icon="close"
                            customStyle="w-28 justify-center ml-auto"
                            type="input"
                            onPress={clearFilterSelection}
                        />
                    )}
                </View>
                <ActivityFlatList
                    list={activities}
                    onViewableItemsChanged={onViewableItemsChanged}
                />
            </View>
            {shouldRenderFilter && (
                <AcitivitiesFilterBottomSheet
                    handleCloseModal={() => setShouldRenderFilter(false)}
                />
            )}
            {showActivityModal && (
                <ActivityBottomSheet
                    navigation={navigation}
                    isRiskGroup={false}
                    setShowModal={setShowActivityModal}
                    selectedActivity={activityInfo}
                />
            )}
        </Fragment>
    );
}
