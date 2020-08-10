import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';

import styles from './styles';
import HelperCard from './HelperCard';
import { UserContext } from '../../../store/contexts/userContext';
import getYearsSince from '../../../utils/getYearsSince';
import shortenName from '../../../utils/shortenName';

export default function HelpDescription({ route, navigation }) {
    const { user } = useContext(UserContext);

    const { help } = route.params;
    console.log(help.categories);
    const userProfilephoto = help.user.photo || user.photo;

    const renderPossibleHelpersButton = () => (
        <TouchableOpacity
            style={styles.buttonHelpers}
            onPress={() =>
                navigation.navigate('listPossibleHelpers', { help })
            }>
            <Text style={styles.textBtn}>Possíveis Ajudantes</Text>
            <Badge
                value={
                    <Text style={styles.labelBadge}>
                        {help.possibleHelpers.length}
                    </Text>
                }
                badgeStyle={styles.badgeStyle}
                containerStyle={styles.containerBadge}
            />
        </TouchableOpacity>
    );

    const renderHelpOwnerInfo = () => {
        const ownerNameFormated = shortenName(help.user.name);

        return (
            <View style={styles.userInfo}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${userProfilephoto}`,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.infoTextView}>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {ownerNameFormated}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Idade: </Text>
                        {getYearsSince(help.user.birthday)}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Cidade: </Text>
                        {help.user.address.city}
                    </Text>
                </View>
            </View>
        );
    };

    const renderHelpInfo = () => (
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.titleFont}>{help.title}</Text>
                <View style={styles.categoryContainer}>
                    {help.categories.map((category) => (
                        <View key={category._id} style={styles.categoryWarning}>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.infoText, styles.infoTextBottom]}>
                    {help.description}
                </Text>
            </View>
        </View>
    );

    const renderMyHelper = () => {
        if (help.status != 'finished') return <HelperCard help={help} />;
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {renderHelpOwnerInfo()}
                {renderHelpInfo()}
                <View style={styles.helpButtons}>
                    {help.helperId
                        ? renderMyHelper()
                        : renderPossibleHelpersButton()}
                </View>
            </View>
        </ScrollView>
    );
}
