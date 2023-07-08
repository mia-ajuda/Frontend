import React, { useCallback, useContext, useState } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import NoHelps from '../../../components/NoHelps';
import HistoricCard from '../../../components/HistoricCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { MyActivitiesFlatList } from '../../../components/molecules/MyActivitiesFlatList';
import { useFocusEffect } from '@react-navigation/native';

const OfferHelpPage = ({ navigation, route }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myOfferedHelp, setMyOfferedHelps] = useState([]);

    useFocusEffect(
        useCallback(() => {
            if (route.params.shouldUpdate) {
                getHelps(setIsLoading);
            }
        }, [route.params.shouldUpdate]),
    );

    async function getHelps(loadingSetter) {
        loadingSetter(true);
        const filteredHelps = await callService(
            helpService,
            'getHelpMultipleStatus',
            [user._id, ['on_going', 'owner_finished', 'waiting'], true],
        );
        if (!filteredHelps.error) {
            setMyOfferedHelps(filteredHelps);
        }
        loadingSetter(false);
        navigation.setParams({ shouldUpdate: false });
    }

    const renderHelpRequestsList = () => {
        if (myOfferedHelp.length > 0) {
            return (
                <MyActivitiesFlatList
                    data={myOfferedHelp}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item._id}
                            onPress={() =>
                                navigation.navigate('myOfferHelpDescription', {
                                    helpId: item._id,
                                    routeId: 'Help',
                                })
                            }
                        >
                            <HistoricCard object={item} />
                        </TouchableOpacity>
                    )}
                    loadOnGoingActivity={getHelps}
                />
            );
        } else {
            return (
                <NoHelps title="Você não está ajudando ninguém até o momento" />
            );
        }
    };

    return (
        <View style={styles.helpList}>
            {!isLoading && renderHelpRequestsList()}
        </View>
    );
};

export default OfferHelpPage;
