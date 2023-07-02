import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import NoHelps from '../../../components/NoHelps';
import HistoricCard from '../../../components/HistoricCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingContext } from '../../../store/contexts/loadingContext';

const OfferHelpPage = ({ navigation }) => {
    const { user, userPosition } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [myOfferedHelp, setMyOfferedHelps] = useState([]);

    useEffect(() => {
        if (user._id && userPosition) {
            getHelps(setIsLoading);
        }
    }, [user._id, userPosition]);

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
    }

    const renderHelpRequestsList = () => {
        if (myOfferedHelp.length > 0) {
            return (
                <FlatList
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
                    keyExtractor={(help) => help._id}
                    refreshing={isRefreshing}
                    onRefresh={async () => getHelps(setIsRefreshing)}
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
