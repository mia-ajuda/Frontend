import React, { Fragment } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomMap from '../../CustomMap';
import { Icon } from 'react-native-elements';
import { CategoriesList } from '../../molecules/CategoriesList';
import { BordedScreenLayout } from '../BordedScreenLayout';
import { InformativeField } from '../../atoms/InformativeField';
import { ActivityMarker } from '../../molecules/ActivityMarker';

export function HelpScreenLayout({
    help,
    children,
    navigation,
    isNotOwner,
    route,
}) {
    const navigateToSelectedHelpOnMap = (helpLocationCoordinates) => {
        navigation.navigate('selectedHelpOnMap', {
            help: help,
            helpLocationCoordinates: helpLocationCoordinates,
        });
    };

    const informationFieldVariant = {
        myOfferHelpDescription:
            'O dono da oferta aceitou seu pedido e logo entrará em contato',
        myRequestHelpDescription:
            'O dono do pedido aceitou sua oferta e logo entrará em contato',
    };

    const activityMarkerTitle = {
        myOfferHelpDescription: isNotOwner ? 'Oferta' : 'Sua oferta',
        myRequestHelpDescription: isNotOwner ? 'Pedido' : 'Seu pedido',
    };

    const isNotOwnerScreenLayout = {
        photo: isNotOwner && help.user.photo,
        displayName: isNotOwner && help.user.name,
        additionalStyles: 'mt-12',
    };

    const renderHelpInformation = () => (
        <Fragment>
            <Text className="text-2xl text-center font-ms-semibold text-black">
                {help.title}
            </Text>
            <View className="flex flex-row w-full justify-center flex-wrap mt-4">
                <CategoriesList categories={help.categories} />
            </View>
            {isNotOwner && (
                <InformativeField text={informationFieldVariant[route.name]} />
            )}
            <View className="border border-gray-contrast py-4 px-[10] relative rounded-lg mt-6">
                <Text className="absolute -top-4 text-lg bg-white px-1 font-ms-semibold text-black">
                    Descrição
                </Text>
                <Text className="text-justify text-sm text-black">
                    {help.description}
                </Text>
            </View>
        </Fragment>
    );

    const renderOfferLocation = () => {
        const helpLocationCoordinates = {
            latitude: help.location.coordinates[1],
            latitudeDelta: 0.025,
            longitude: help.location.coordinates[0],
            longitudeDelta: 0.025,
        };
        return (
            <View className="mt-4">
                <Text className="text-lg font-ms-semibold text-black">
                    Localização
                </Text>
                <View className="relative w-full h-28 rounded-xl overflow-hidden mt-2">
                    <CustomMap initialRegion={helpLocationCoordinates}>
                        <ActivityMarker
                            title={activityMarkerTitle[route.name]}
                            activity={help}
                            activityType={'offer'}
                            disabled={isNotOwner}
                        />
                    </CustomMap>
                    <TouchableOpacity
                        onPress={() =>
                            navigateToSelectedHelpOnMap(helpLocationCoordinates)
                        }
                        className="absolute bottom-2 bg-secondary left-2 rounded-full p-1"
                    >
                        <Icon name="fullscreen" type="material-icons" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <BordedScreenLayout size="sm" {...isNotOwnerScreenLayout}>
                {renderHelpInformation()}
                {renderOfferLocation()}
                {children}
            </BordedScreenLayout>
        </ScrollView>
    );
}
