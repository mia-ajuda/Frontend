import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import ListCard from '../../../../components/ListCard';
import { UserContext } from '../../../../store/contexts/userContext';
import helpService from '../../../../services/Help';
import styles from '../styles';
import colors from '../../../../../assets/styles/colorVariables';

import NoHelps from '../../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import { ServiceContext } from '../../../../store/contexts/serviceContext';

export default function DoneHelps({ navigation }) {
    const [finishedHelpList, setFinishedHelpList] = useState([]);
    const [loadingHelpRequests, setLoadingHelpRequests] = useState(false);

    const { user } = useContext(UserContext);
    const { useService } = useContext(ServiceContext);
    useFocusEffect(
        useCallback(() => {
            loadFinishedHelps();
        }, [navigation]),
    );

    async function loadFinishedHelps() {
        setLoadingHelpRequests(true);
        const { _id: userId } = user;
        const resFinished = await useService(
            helpService,
            'getHelpMultipleStatus',
            [userId, 'finished'],
        );
        if (!resFinished.message) {
            setFinishedHelpList(resFinished);
        }
        setLoadingHelpRequests(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderHelpList = () => {
        if (finishedHelpList.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {finishedHelpList.map((help) => (
                            <View key={help._id}>
                                <ListCard
                                    helpTitle={help.title}
                                    helpDescription={help.description}
                                    helpStatus={help.status}
                                    categoryName={help.category[0].name}
                                    navigation={navigation}
                                    pageName="RequestDescription"
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui ajudas finalizadas'} />;
        }
    };
    return (
        <View>
            {loadingHelpRequests ? renderLoadingIndicator() : renderHelpList()}
        </View>
    );
}
