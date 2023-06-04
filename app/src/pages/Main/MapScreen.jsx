import React, {
    Fragment,
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

export default function MapScreen({ route, navigation }) {
    const { allActivities } = route.params;
    const { userPosition } = useContext(UserContext);
    const { setUseSafeAreaView } = useContext(ScreenTemplateContext);
    const [focusedCardLocation, setFocusedCardLocation] = useState();
    const [visibleItemData, setVisibleItemData] = useState();
    const [shouldRenderFilter, setShouldRenderFilter] = useState(false);
    const [filterSelection, setFilterSelection] = useState({
        categories: [],
        activities: [],
    });

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
            <View className="absolute bottom-3 left-4">
                <View className="w-24 items-center">
                    <Chips
                        title="Filtrar"
                        bgColor="bg-white"
                        icon="filter-list"
                        elevated
                        color="bg-white"
                        type="button"
                        onPress={() => setShouldRenderFilter(true)}
                    />
                </View>
                <FlatList
                    data={allActivities}
                    keyExtractor={(item) => item._id}
                    horizontal
                    pagingEnabled
                    snapToInterval={300}
                    viewabilityConfig={{
                        viewAreaCoveragePercentThreshold: 300,
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCards}
                    decelerationRate="fast"
                    onViewableItemsChanged={onViewableItemsChanged.current}
                />
            </View>
            {shouldRenderFilter && (
                <AcitivitiesFilterModal
                    handleCloseModal={() => setShouldRenderFilter(false)}
                    setFilterSelection={setFilterSelection}
                    filterSelection={filterSelection}
                />
            )}
        </Fragment>
    );
}
