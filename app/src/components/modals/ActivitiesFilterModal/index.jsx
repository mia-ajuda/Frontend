import React, { useContext, useRef } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { Dimensions, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwindConfig from '../../../../tailwind.config';
import { Chips } from '../../atoms/Chips';
import { DefaultButton } from '../../atoms/DefaultButton';
import { CategoryContext } from '../../../store/contexts/categoryContext';
import filterButtonTypes from '../../../docs/filterMarkers';

const filterTitle = (title, icon) => (
    <View className="flex-row space-x-2 items-center">
        <Icon
            name={icon}
            color={tailwindConfig.theme.extend.colors.primary.DEFAULT}
        />
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

    const selectableChipsAction = (id, list, type) => {
        const isCategory = type === 'categorias';
        if (list.includes(id)) {
            const removeId = list.filter((idFromState) => idFromState !== id);
            isCategory
                ? setSelectedCategories(removeId)
                : setSelectedActivities(removeId);
        } else {
            isCategory
                ? setSelectedCategories([...list, id])
                : setSelectedActivities([...list, id]);
        }
    };

    const mapChips = (list) => {
        const isArray = Array.isArray(list);
        const customStyle = 'mt-2 mr-2 border border-gray-500';

        return (
            <View className="flex-row flex-wrap">
                {isArray
                    ? list.map((category, index) => (
                          <Chips
                              title={category.name}
                              key={index + category._id}
                              customStyle={customStyle}
                              type="filter"
                              icon="check"
                              onPress={() =>
                                  selectableChipsAction(
                                      category._id,
                                      selectedCategories,
                                      'categorias',
                                  )
                              }
                          />
                      ))
                    : Object.keys(list).map((activity, index) => (
                          <Chips
                              title={activity}
                              key={index + activity}
                              customStyle={customStyle}
                              type="filter"
                              icon="check"
                              onPress={() =>
                                  selectableChipsAction(
                                      list[activity].id,
                                      selectedActivities,
                                      'atividades',
                                  )
                              }
                          />
                      ))}
            </View>
        );
    };

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            snapPoints={isBigPhone ? ['60%'] : ['70%']}
            scrollable={false}
            handleCloseModal={handleCloseModal}
        >
            <Text className="absolute -top-8 right-1/2 font-ms-bold text-xl">
                Filtro
            </Text>
            <ViewWithDivider>
                {filterTitle('Atividades', 'local-activity')}
                {mapChips(filterButtonTypes)}
            </ViewWithDivider>
            <ViewWithDivider>
                {filterTitle('Categorias', 'category')}
                {mapChips(categories)}
            </ViewWithDivider>
            <DefaultButton
                title="Aplicar"
                onPress={() => setFilterCategories(true)}
                disabled={
                    selectedCategories.length <= 0 &&
                    selectedActivities.length <= 0
                }
            />
        </BaseBottomSheet>
    );
};
