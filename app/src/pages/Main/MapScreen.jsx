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
import { StatusBar, View } from 'react-native';
import { ScreenTemplateContext } from '../../store/contexts/ScreenTemplateContext';
import { FloatingIconButton } from '../../components/molecules/FloatingIconButton';
import { Chips } from '../../components/atoms/Chips';
import { ActivitiesFilterBottomSheet } from '../../components/modals/ActivityBottomSheet/FilterActivity';
import { LoadingContext } from '../../store/contexts/loadingContext';
import { ActivityBottomSheetContext } from '../../store/contexts/activityBottomSheetContext';
import { ActivityBottomSheet } from '../../components/modals/ActivityBottomSheet';
import { ActivityFlatList } from '../../components/atoms/ActivityFlatList';
import { ActivitiesContext } from '../../store/contexts/activitiesContext';
import { NotFound } from '../../components/organisms/NotFound';

export default function MapScreen({ navigation }) {
    const { userPosition } = useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { setUseSafeAreaView } = useContext(ScreenTemplateContext);
    const [focusedCardLocation, setFocusedCardLocation] = useState();
    const [visibleItemData, setVisibleItemData] = useState();
    const [shouldRenderFilter, setShouldRenderFilter] = useState(false);
    const { showActivityModal, activityInfo, setShowActivityModal } =
        useContext(ActivityBottomSheetContext);
    const { activitiesList, getActivityList } = useContext(ActivitiesContext);
    const [storedActivities, setStoredActivities] = useState([]);
    const [storedCategories, setStoredCategories] = useState([]);

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

    const storeFilterSelection = (selectedActivities, selectedCategories) => {
        setStoredActivities(selectedActivities);
        setStoredCategories(selectedCategories);
    };

    const clearFilterSelection = () => {
        setIsLoading(true);
        setTimeout(async () => {
            setStoredActivities([]);
            setStoredCategories([]);
            await getActivityList();
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
                {activitiesList.map((activity) => {
                    const focused = visibleItemData?._id == activity._id;
                    return (
                        <ActivityMarker
                            key={activity._id + `${focused}`}
                            activity={activity}
                            activityType={activity.type}
                            index={activity.index}
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
            <View className="absolute bottom-3 ml-2 items-center w-full">
                <View className="w-full pr-2">
                    <View className="flex-row mr-2">
                        <Chips
                            title="Filtrar"
                            icon="filter-list"
                            elevated
                            customStyle="w-20 justify-center ml-1"
                            type="button"
                            onPress={() => setShouldRenderFilter(true)}
                        />
                        {(storedActivities.length > 0 ||
                            storedCategories.length > 0) && (
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
                    {activitiesList.length ? (
                        <ActivityFlatList
                            list={activitiesList}
                            onViewableItemsChanged={onViewableItemsChanged}
                        />
                    ) : (
                        <View className="h-40 bg-white ml-1 rounded-2xl mr-5 mt-2 mb-4">
                            <NotFound
                                body="Nenhuma atividade encontrada para o filtro"
                                size="small"
                            />
                        </View>
                    )}
                </View>
            </View>
            {shouldRenderFilter && (
                <ActivitiesFilterBottomSheet
                    handleCloseModal={() => setShouldRenderFilter(false)}
                    storedActivities={storedActivities}
                    storedCategories={storedCategories}
                    storeFilterSelection={storeFilterSelection}
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
