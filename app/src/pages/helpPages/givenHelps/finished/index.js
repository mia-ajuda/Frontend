import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../MyRequests/styles';
import ListCard from '../../../../components/ListCard';
import { UserContext } from '../../../../store/contexts/userContext';
import NoHelps from '../../../../components/NoHelps';
import helpService from '../../../../services/Help';
import colors from '../../../../../assets/styles/colorVariables';
import useService from '../../../../services/useService';

export default function AskedHelps({ navigation }) {
    const { user } = useContext(UserContext);
    const [myFinishedHelps, setMyFinishedHelps] = useState([]);
    const [loadingFinishedHelps, setLoadingFinishedHelps] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setLoadingFinishedHelps(true);
        const helps = await useService(helpService, 'getHelpMultipleStatus', [
            user._id,
            'finished',
            true,
        ]);
        if (!helps.message) {
            setMyFinishedHelps(helps);
        }
        setLoadingFinishedHelps(false);
    }

    const renderLoadigIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
    const renderHelpList = () => {
        if (myFinishedHelps.length > 0) {
            return (
                <ScrollView>
                    {myFinishedHelps.map((help) => (
                        <ListCard
                            key={help._id}
                            profilePhoto={help.user.photo}
                            helpId={help._id}
                            helpTitle={help.title}
                            helpDescription={help.description}
                            categoryName={help.category[0].name}
                            userName={help.user.name}
                            birthday={help.user.birthday}
                            city={help.user.address.city}
                            navigation={navigation}
                            helperId={help.helperId}
                            userPhone={help.user.phone}
                            userLocation={help.user.location.coordinates}
                            helpStatus={help.status}
                            pageName="OfferDescription"
                        />
                    ))}
                </ScrollView>
            );
        } else {
            return (
                <NoHelps title="Você não está ajudando ninguém até o momento" />
            );
        }
    };
    return (
        <View style={styles.helpList}>
            {loadingFinishedHelps ? renderLoadigIndicator() : renderHelpList()}
        </View>
    );
}
