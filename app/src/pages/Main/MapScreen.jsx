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
import { FlatList, StatusBar, View } from 'react-native';
import { ScreenTemplateContext } from '../../store/contexts/ScreenTemplateContext';
import { FloatingIconButton } from '../../components/molecules/FloatingIconButton';
import { ActivityCard } from '../../components/organisms/ActivityCard';
import { Chips } from '../../components/atoms/Chips';
import { AcitivitiesFilterModal } from '../../components/modals/ActivitiesFilterModal';
import { CategoryContext } from '../../store/contexts/categoryContext';
import sortActivitiesByDistance from '../../utils/sortActivitiesByDistance';
import { useFocusEffect } from '@react-navigation/native';
import { CampaignContext } from '../../store/contexts/campaignContext';
import { HelpOfferContext } from '../../store/contexts/helpOfferContext';
import { HelpContext } from '../../store/contexts/helpContext';

export default function MapScreen({ navigation }) {
    const { campaignList } = useContext(CampaignContext);
    const { helpOfferList } = useContext(HelpOfferContext);
    const { userPosition } = useContext(UserContext);
    const { helpList } = useContext(HelpContext);
    const { setUseSafeAreaView } = useContext(ScreenTemplateContext);
    const { filterCategories, selectedCategories, setSelectedCategories } =
        useContext(CategoryContext);
    const [focusedCardLocation, setFocusedCardLocation] = useState();
    const [visibleItemData, setVisibleItemData] = useState();
    const [shouldRenderFilter, setShouldRenderFilter] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [activities, setActivities] = useState([]);

    const markersStrategy = {
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
            if (filterCategories && selectedActivities.length > 0) {
                const argObj = {
                    limit: false,
                };

                selectedActivities.forEach((key) => {
                    const expectedKey = markersStrategy[key].name;
                    argObj[expectedKey] = markersStrategy[key].value;
                });

                setActivities(sortActivitiesByDistance(argObj));
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
        }, [selectedActivities]),
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
        setSelectedActivities([]);
        setSelectedCategories([]);
        setActivities(
            sortActivitiesByDistance({
                helpList,
                helpOfferList,
                campaignList,
                limit: false,
            }),
        );
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
            />
        </View>
    );

    const memoizedFlatListItem = useCallback(renderCards, [activities]);

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
                customTop="top-10"
                iconSize="2xl"
                color="bg-white"
                onPress={goBackButtonAction}
            />
            <View className="absolute bottom-3 left-4 mr-4">
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
                <FlatList
                    data={activities}
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
                    onViewableItemsChanged={onViewableItemsChanged.current}
                />
            </View>
            {shouldRenderFilter && (
                <AcitivitiesFilterModal
                    handleCloseModal={() => setShouldRenderFilter(false)}
                    setSelectedActivities={setSelectedActivities}
                    selectedActivities={selectedActivities}
                />
            )}
        </Fragment>
    );
}
