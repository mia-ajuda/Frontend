import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import useService from '../../../services/useService';
import helpService from '../../../services/Help';
import colors from '../../../../assets/styles/colorVariables';
import NoHelps from '../../../components/NoHelps';
import HistoricCard from '../../../components/HistoricCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OfferHelpPage = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [myOfferedHelp, setMyOfferedHelps] = useState([]);
    const [loadingOfferedHelps, setLoadingOfferedHelps] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setLoadingOfferedHelps(true);
        const filteredHelps = await useService(
            helpService,
            'getHelpMultipleStatus',
            [user._id, ['on_going', 'owner_finished', 'waiting'], true],
        );
        if (!filteredHelps.error) {
            setMyOfferedHelps(filteredHelps);
        }
        setLoadingOfferedHelps(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderHelpRequestsList = () => {
        if (myOfferedHelp.length > 0) {
            return (
                <ScrollView>
                    {myOfferedHelp.map((help) => {
                        return (
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate(
                                        'MyOfferHelpDescription',
                                        {
                                            helpId: help._id,
                                            routeId: 'Help',
                                        },
                                    )
                                }>
                                <HistoricCard object={help} />
                            </TouchableOpacity>
                        );
                    })}
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
            {loadingOfferedHelps
                ? renderLoadingIndicator()
                : renderHelpRequestsList()}
        </View>
    );
};

export default OfferHelpPage;
