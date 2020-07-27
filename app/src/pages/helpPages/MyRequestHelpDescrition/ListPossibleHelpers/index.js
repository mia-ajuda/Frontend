import React from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import getYearsSince from '../../../../utils/getYearsSince';
import styles from './styles';

export default function ListPossibleHelpers({ navigation, route }) {
    const { help } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {help.possibleHelpers.map((helper) => (
                <TouchableOpacity
                    key={helper._id}
                    onPress={() => {
                        navigation.goBack();
                        // openModal('choose', helper._id);
                    }}>
                    <View style={styles.helper}>
                        <Image
                            style={styles.imageProfile}
                            source={{
                                uri: `data:image/png;base64,${helper.photo}`,
                            }}
                        />
                        <View>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}>
                                {helper.name}
                            </Text>
                            <Text>
                                <Text
                                    style={[
                                        styles.infoText,
                                        styles.infoTextFont,
                                    ]}>
                                    Idade:{' '}
                                </Text>
                                {getYearsSince(helper.birthday)}
                            </Text>
                            <Text>
                                <Text
                                    style={[
                                        styles.infoText,
                                        styles.infoTextFont,
                                    ]}>
                                    Cidade:{' '}
                                </Text>
                                {helper.address.city}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
