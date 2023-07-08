import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import NoHelps from '../../../components/NoHelps';
import HistoricCard from '../../../components/HistoricCard';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { ActivityCard } from '../../../components/organisms/ActivityCard';

const OfferHelpPage = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myOfferedHelp, setMyOfferedHelps] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setIsLoading(true);
        const filteredHelps = await callService(
            helpService,
            'getHelpMultipleStatus',
            [user._id, ['on_going', 'owner_finished', 'waiting'], true],
        );
        if (!filteredHelps.error) {
            setMyOfferedHelps(filteredHelps);
        }
        setIsLoading(false);
    }

    const renderHelpRequestsList = () => {
        if (myOfferedHelp.length > 0) {
            return (
                <FlatList
                    data={myOfferedHelp}
                    style={{ marginHorizontal: 8, marginTop: 8 }}
                    renderItem={({ item, index }) => (
                        <ActivityCard
                            variant={item.type}
                            id={item._id}
                            ownerId={item.ownerId}
                            count={index + 1}
                            title={item.title}
                            description={item.description}
                            badges={item.categories}
                            distance={item.distance}
                            creationDate={item.creationDate}
                            userId={item.ownerId}
                            size='large'
                        />
                    )}
                    keyExtractor={(item) => item._id}
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
