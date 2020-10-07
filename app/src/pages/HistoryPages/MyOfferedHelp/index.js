import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import HelpCard from '../../../components/HelpCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import styles from '../styles';
import colors from '../../../../assets/styles/colorVariables';

import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import useService from '../../../services/useService';

export default function HelpsFinished({ navigation }) {
    const [finishedHelpList, setFinishedHelpList] = useState([]);
    const [loadingHelpRequests, setLoadingHelpRequests] = useState(false);

    const { user } = useContext(UserContext);
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
        if (!resFinished.error) {
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
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate(
                                        'MyRequestHelpDescrition',
                                        {
                                            help,
                                        },
                                    )
                                }>
                                <HelpCard help={help} />
                            </TouchableOpacity>
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
