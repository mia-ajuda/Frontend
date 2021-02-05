import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestHelpCard from '../../../components/MyRequestHelpCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import styles from '../styles';
import colors from '../../../../assets/styles/colorVariables';

import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import useService from '../../../services/useService';

export default function MyOfferedHelp({ navigation }) {
    const [helpList, setHelpList] = useState([]);
    const [loadingHelpRequests, setLoadingHelpRequests] = useState(false);

    const { user } = useContext(UserContext);
    useFocusEffect(
        useCallback(() => {
            loadOnGoingOffers();
        }, [navigation]),
    );

    async function loadOnGoingOffers() {
        setLoadingHelpRequests(true);
        const { _id: userId } = user;
        const resFinished = await useService(
            helpService,
            'listHelpOfferByOwnerId',
            [userId],
        );
        console.log(userId, '<<<<<<<<<<<<<<<<<-');
        if (!resFinished.error) {
            setHelpList(resFinished);
        }
        setLoadingHelpRequests(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderHelpList = () => {
        if (helpList.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {helpList.map((helpOffer) => {
                            return (
                                <TouchableOpacity
                                    key={helpOffer._id}
                                    onPress={() =>
                                        navigation.navigate(
                                            'MyOfferHelpDescription',
                                            {
                                                helpOffer,
                                            },
                                        )
                                    }>
                                    <MyRequestHelpCard help={helpOffer} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui nenhuma oferta criada'} />;
        }
    };
    return (
        <View>
            {loadingHelpRequests ? renderLoadingIndicator() : renderHelpList()}
        </View>
    );
}
