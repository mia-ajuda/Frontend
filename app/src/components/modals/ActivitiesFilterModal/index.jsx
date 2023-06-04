import React, { useRef, useState } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwindConfig from '../../../../tailwind.config';
import { Chips } from '../../atoms/Chips';
import { DefaultButton } from '../../atoms/DefaultButton';

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
    filterSelection,
    setFilterSelection,
}) => {
    const bottomSheetRef = useRef(null);

    const activities = {
        Campanha: 'campaign',
        Ofertas: 'offer',
        Pedidos: 'help',
    };

    const categories = [
        'Apoio Físico',
        'Apoio Psicológico',
        'Apoio Social',
        'Higiene Pessoal',
        'Itens de Proteção',
        'Pequenos Serviços',
        'Suprimentos Básicos',
        'Transporte de Emergência',
    ];

    const handleWithSelection = (activity, type) => {};

    const mapChips = (list) => {
        const isArray = Array.isArray(list);
        const customStyle = 'mt-2 mr-2 border border-gray-500';

        return (
            <View className="flex-row flex-wrap">
                {isArray
                    ? list.map((activity, index) => (
                          <Chips
                              title={activity}
                              key={index}
                              customStyle={customStyle}
                              type="filter"
                              icon="check"
                              onPress={handleWithSelection(
                                  activity,
                                  'categories',
                              )}
                          />
                      ))
                    : Object.keys(list).map((activity, index) => (
                          <Chips
                              title={activity}
                              key={index}
                              customStyle={customStyle}
                              type="filter"
                              icon="check"
                              onPress={handleWithSelection(
                                  activity,
                                  'activities',
                              )}
                          />
                      ))}
            </View>
        );
    };

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            snapPoints={['80%']}
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
            <DefaultButton title="Aplicar" disabled={filterSelection == null} />
        </BaseBottomSheet>
    );
};
