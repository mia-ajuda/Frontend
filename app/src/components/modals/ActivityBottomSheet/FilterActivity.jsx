import React, { useContext, useRef, useState } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { Dimensions, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Chips } from '../../atoms/Chips';
import { DefaultButton } from '../../atoms/DefaultButton';
import { CategoryContext } from '../../../store/contexts/categoryContext';
import filterButtonTypes from '../../../docs/filterMarkers';
import colors from '../../../../colors';
import { ActivitiesContext } from '../../../store/contexts/activitiesContext';

const filterTitle = (title, icon) => (
    <View className="flex-row space-x-2 items-center">
        <Icon name={icon} color={colors.primary.DEFAULT} />
        <Text className="font-ms-medium text-base">{title}</Text>
    </View>
);

const ViewWithDivider = ({ children }) => (
    <View className="border-b border-b-gray-200 py-4">{children}</View>
);

export const ActivitiesFilterBottomSheet = ({
    handleCloseModal,
    storedActivities,
    storedCategories,
    storeFilterSelection,
}) => {
    const bottomSheetRef = useRef(null);
    const { categories } = useContext(CategoryContext);
    const { getActivityList } = useContext(ActivitiesContext);
    const { height } = Dimensions.get('window');
    const isBigPhone = height > 720;
    const [isLoading, setIsLoading] = useState(false);
    const [inputedActivities, setInputedActivities] =
        useState(storedActivities);
    const [inputedCategories, setInputedCategories] =
        useState(storedCategories);

    const removeFromState = (id, list, setter) => {
        const removeId = list.filter((idFromState) => idFromState !== id);
        setter(removeId);
    };

    const chipsSelection = (id, list, setter) => {
        if (list.includes(id)) removeFromState(id, list, setter);
        else setter([...list, id]);
    };

    const updateActivitiesList = async () => {
        const categories = inputedCategories.length ? inputedCategories : null;
        const activities = inputedActivities.length ? inputedActivities : null;
        await getActivityList(categories, activities);
        setIsLoading(false);
    };

    const filterButtonAction = async () => {
        setIsLoading(true);

        setTimeout(() => {
            storeFilterSelection(inputedActivities, inputedCategories);
            (async () => {
                await updateActivitiesList();
                bottomSheetRef.current.dismiss();
            })();
        }, 0);
    };

    const mapChips = (list, type) => {
        const activityArray =
            type === 'categorias' ? inputedCategories : inputedActivities;
        return (
            <View className="flex-row flex-wrap">
                {list.map((activity) => {
                    const isDisabled =
                        type === 'categorias' &&
                        inputedCategories.length >= 3 &&
                        !inputedCategories.includes(activity._id);

                    const selected = activityArray.includes(activity._id);

                    return (
                        <Chips
                            title={activity.name}
                            key={activity._id + activityArray}
                            customStyle="mt-2 mr-2 border border-gray-500"
                            type="filter"
                            icon="check"
                            onPress={() =>
                                type === 'categorias'
                                    ? chipsSelection(
                                          activity._id,
                                          inputedCategories,
                                          setInputedCategories,
                                      )
                                    : chipsSelection(
                                          activity._id,
                                          inputedActivities,
                                          setInputedActivities,
                                      )
                            }
                            disabled={isDisabled}
                            selected={selected}
                            hiddenIcon={!selected}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            snapPoints={isBigPhone ? ['57%'] : ['70%']}
            scrollable={false}
            handleCloseModal={handleCloseModal}
        >
            <Text className="absolute -top-8 right-1/2 font-ms-bold text-xl">
                Filtro
            </Text>
            <ViewWithDivider>
                {filterTitle('Atividades', 'local-activity')}
                {mapChips(filterButtonTypes, 'atividades')}
            </ViewWithDivider>
            <ViewWithDivider>
                {filterTitle('Categorias (Até 3)', 'category')}
                {mapChips(categories, 'categorias')}
            </ViewWithDivider>
            <DefaultButton
                title="Aplicar"
                onPress={() => filterButtonAction()}
                disabled={
                    inputedCategories.length <= 0 &&
                    inputedActivities.length <= 0
                }
                isLoading={isLoading}
            />
        </BaseBottomSheet>
    );
};
