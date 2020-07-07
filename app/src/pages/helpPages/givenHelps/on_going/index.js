import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../MyRequests/styles';
import HelpCard from '../../../../components/HelpCard';
import { UserContext } from '../../../../store/contexts/userContext';
import NoHelps from '../../../../components/NoHelps';
import colors from '../../../../../assets/styles/colorVariables';
import helpService from '../../../../services/Help';
export default function AskedHelps({ navigation }) {
    const { user } = useContext(UserContext);
    const [myHelps, setMyHelps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setLoading(true);
        let filteredHelps = await helpService.getHelpMultipleStatus(
            user._id,
            ['on_going', 'owner_finished', 'waiting'],
            true,
        );
        setMyHelps(filteredHelps);
        setLoading(false);
    }

    return (
        <View style={styles.helpList}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : myHelps.length ? (
                <ScrollView>
                    {myHelps.map((help) => (
                        <HelpCard key={help._id} help={help} />
                    ))}
                </ScrollView>
            ) : (
                <NoHelps title="Você não está ajudando ninguém até o momento" />
            )}
        </View>
    );
}
