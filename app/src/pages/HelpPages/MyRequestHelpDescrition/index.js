import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';

import styles from './styles';
import HelperCard from './HelperCard';
import { UserContext } from '../../../store/contexts/userContext';
import getYearsSince from '../../../utils/getYearsSince';

export default function HelpDescription({ route, navigation }) {
    const { user } = useContext(UserContext);

    const { help } = route.params;

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

    const renderHelpOwnerInfo = () => (
        <View style={styles.userInfo}>
            <Image
                source={{
                    uri: `data:image/png;base64,${userProfilephoto}`,
                }}
                style={styles.profileImage}
            />
            <View style={styles.infoTextView}>
                <Text style={[styles.infoText, styles.infoTextFont]}>
                    {help.user.name}
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

    const renderHelpInfo = () => (
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.titleFont}>{help.title}</Text>
                    <View style={styles.categoryWarning}>
                        <Text style={styles.categoryName}>
                            {help.category[0].name}
                        </Text>
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
