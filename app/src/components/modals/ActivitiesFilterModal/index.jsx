import React, { useContext, useRef, useState } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { Dimensions, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Chips } from '../../atoms/Chips';
import { DefaultButton } from '../../atoms/DefaultButton';
import { CategoryContext } from '../../../store/contexts/categoryContext';
import filterButtonTypes from '../../../docs/filterMarkers';
import colors from '../../../../colors';

const filterTitle = (title, icon) => (
    <View className="flex-row space-x-2 items-center">
        <Icon name={icon} color={colors.primary.DEFAULT} />
        <Text className="font-ms-medium text-base">{title}</Text>
    </View>
);

const ViewWithDivider = ({ children }) => (
    <View className="border-b border-b-gray-200 py-4">{children}</View>
);

export const AcitivitiesFilterModal = ({
    handleCloseModal,
    setSelectedActivities,
    selectedActivities,
}) => {
    const bottomSheetRef = useRef(null);
    const {
        categories,
        selectedCategories,
        setSelectedCategories,
        setFilterCategories,
    } = useContext(CategoryContext);
    const { height } = Dimensions.get('window');
    const isBigPhone = height > 720;
    const [shouldClose, setShouldClose] = useState(false);
    const [inputedActivities, setInputedActivities] = useState([]);
    const [inputedCategories, setInputedCategories] = useState([]);

    const removeFromState = (id, list, setter) => {
        const removeId = list.filter((idFromState) => idFromState !== id);
        setter(removeId);
    };

    const chipsSelection = (id, list, setter) => {
        if (list.includes(id)) removeFromState(id, list, setter);
        else setter([...list, id]);
    };

    const filterButtonAction = () => {
        setShouldClose(true);
        setSelectedActivities(inputedActivities);
        setSelectedCategories(inputedCategories);
        setFilterCategories(true);
    };

    const mapChips = (list, type) => {
        return (
            <View className="flex-row flex-wrap">
                {list.map((activity, index) => {
                    const isDisabled =
                        type === 'categorias' &&
                        inputedCategories.length >= 3 &&
                        !inputedCategories.includes(activity._id);

                    const selected =
                        list.includes(activity._id) ||
                        selectedActivities.includes(activity._id) ||
                        selectedCategories.includes(activity._id);

                    return (
                        <Chips
                            title={activity.name}
                            key={index + activity._id}
                            customStyle="mt-2 mr-2 border border-gray-500"
                            type="filter"
                            icon="check"
                            onPress={() =>
                                type == 'categorias'
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
            snapPoints={isBigPhone ? ['60%'] : ['70%']}
            scrollable={false}
            handleCloseModal={handleCloseModal}
            shouldClose={shouldClose}
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
                onPress={filterButtonAction}
                disabled={
                    inputedCategories.length <= 0 &&
                    inputedActivities.length <= 0 &&
                    selectedActivities.length <= 0 &&
                    selectedCategories.length <= 0
                }
            />
        </BaseBottomSheet>
    );
};
