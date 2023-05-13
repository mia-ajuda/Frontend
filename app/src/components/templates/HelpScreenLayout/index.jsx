import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomMap from '../../CustomMap';
import { Icon } from 'react-native-elements';
import { CategoriesList } from '../../molecules/CategoriesList';
import HelpOfferMarker from '../../../pages/Main/HelpOfferMarker';
import { BordedScreenLayout } from '../BordedScreenLayout';

export function HelpScreenLayout({ help, children, navigation }) {
    const navigateToSelectedHelpOnMap = (helpLocationCoordinates) => {
        navigation.navigate('selectedHelpOnMap', {
            help: help,
            helpLocationCoordinates: helpLocationCoordinates,
        });
    };

    const renderHelpInformation = () => (
        <View>
            <Text className="text-2xl text-center font-ms-semibold">
                {help.title}
            </Text>
            <View className="flex flex-row w-full mb-[32] justify-center flex-wrap mt-[16]">
                <CategoriesList categories={help.categories} />
            </View>
            <View className="border border-[#D2D2D2] py-[16] px-[10] relative rounded-lg">
                <Text className="absolute -top-4 text-lg bg-white px-1 font-ms-semibold">
                    Descrição
                </Text>
                <Text className="text-justify text-sm">{help.description}</Text>
            </View>
        </View>
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
                <Text className="text-lg font-ms-semibold">Localização</Text>
                <View className="relative w-full h-28 rounded-xl overflow-hidden mt-2">
                    <CustomMap initialRegion={helpLocationCoordinates}>
                        <HelpOfferMarker key={help._id} helpOffer={help} />
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
            <BordedScreenLayout size="sm">
                {renderHelpInformation()}
                {renderOfferLocation()}
                {children}
            </BordedScreenLayout>
        </ScrollView>
    );
}
