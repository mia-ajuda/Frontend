import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../MyRequests/styles';
import HistoricCard from '../../../../components/HistoricCard';
import { UserContext } from '../../../../store/contexts/userContext';
import NoHelps from '../../../../components/NoHelps';
import helpService from '../../../../services/Help';
import colors from '../../../../../assets/styles/colorVariables';
import callService from '../../../../services/callService';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingContext } from '../../../../store/contexts/loadingContext';
export default function AskedHelps({ navigation }) {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myFinishedHelps, setMyFinishedHelps] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setIsLoading(true);
        const helps = await callService(helpService, 'getHelpMultipleStatus', [
            user._id,
            'finished',
            true,
        ]);
        if (!helps.error) {
            setMyFinishedHelps(helps);
        }
        setIsLoading(false);
    }

    const renderHelpList = () => {
        if (myFinishedHelps.length > 0) {
            return (
                <ScrollView>
                    {myFinishedHelps.map((help) => (
                        <TouchableOpacity
                            key={help._id}
                            onPress={() =>
                                navigation.navigate('OfferDescription', {
                                    help,
                                })
                            }
                        >
                            <HistoricCard object={help} />
                        </TouchableOpacity>
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
        <View style={styles.helpList}>{!isLoading && renderHelpList()}</View>
    );
}
