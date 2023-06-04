import React, { useContext, useEffect, useRef } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwindConfig from '../../../../tailwind.config';
import { Chips } from '../../atoms/Chips';
import { DefaultButton } from '../../atoms/DefaultButton';
import { CategoryContext } from '../../../store/contexts/categoryContext';

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

export const AcitivitiesFilterModal = ({ handleCloseModal }) => {
    const bottomSheetRef = useRef(null);
    const {
        categories,
        selectedCategories,
        setSelectedCategories,
        setShouldFilter,
    } = useContext(CategoryContext);

    const activities = {
        Campanha: 'campaign',
        Ofertas: 'offer',
        Pedidos: 'help',
    };

    useEffect(() => {
        console.log(selectedCategories);
    }, [selectedCategories]);

    const handleWithSelection = (activity, type) => {
        if (selectedCategories[type].includes(activity)) {
            const removeCategory = selectedCategories.filter(
                (categoryFromState) => categoryFromState !== activity,
            );
            selectedCategories[type] = removeCategory;
            setSelectedCategories({ ...selectedCategories });
        } else {
            if (type === 'activities') {
                selectedCategories[type].push(activities[type]);
                setSelectedCategories(selectedCategories);
            } else {
                selectedCategories[type].push(activity._id);
            }
        }
    };

    const mapChips = (list) => {
        const isArray = Array.isArray(list);
        const customStyle = 'mt-2 mr-2 border border-gray-500';

        return (
            <View className="flex-row flex-wrap">
                {isArray
                    ? list.map((activity, index) => (
                          <Chips
                              title={activity.name}
                              key={index}
                              customStyle={customStyle}
                              type="filter"
                              icon="check"
                              onPress={() =>
                                  handleWithSelection(activity, 'categories')
                              }
                          />
                      ))
                    : Object.keys(list).map((activity, index) => (
                          <Chips
                              title={activity}
                              key={index}
                              customStyle={customStyle}
                              type="filter"
                              icon="check"
                              onPress={() =>
                                  handleWithSelection(activity, 'activities')
                              }
                          />
                      ))}
            </View>
        );
    };

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            snapPoints={['70%']}
            scrollable={false}
            handleCloseModal={handleCloseModal}
        >
            <Text className="absolute -top-8 right-1/2 font-ms-bold text-xl">
                Filtro
            </Text>
            <ViewWithDivider>
                {filterTitle('Atividades', 'local-activity')}
                {mapChips(activities)}
            </ViewWithDivider>
            <ViewWithDivider>
                {filterTitle('Categorias', 'category')}
                {mapChips(categories)}
            </ViewWithDivider>
            <DefaultButton
                title="Aplicar"
                disabled={
                    selectedCategories['categories'].length <= 0 &&
                    selectedCategories['activities'].length <= 0
                }
                onPress={() => setShouldFilter(true)}
            />
        </BaseBottomSheet>
    );
};
