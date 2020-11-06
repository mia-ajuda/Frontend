import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestCard from '../../../components/MyRequestCard';
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
            loadOnGoingOffers();
        }, [navigation]),
    );

    async function loadOnGoingOffers() {
        setLoadingHelpRequests(true);
        const { _id: userId } = user;
        const resFinished = await useService(
            helpService,
            'listHelpOfferFromOwner',
            [userId],
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
                        {finishedHelpList.map((help) => {
                            if (help.ownerId === user._id) {
                                return (
                                    <TouchableOpacity
                                        key={help._id}
                                        onPress={() =>
                                            navigation.navigate(
                                                'MyOfferHelpDescription',
                                                {
                                                    help,
                                                },
                                            )
                                        }>
                                        {/* Tirar isEntityUser depois */}
                                        <MyRequestCard
                                            object={help}
                                            isEntityUser={true}
                                        />
                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <NoHelps
                                        title={
                                            'Você não possui nenhuma oferta criada'
                                        }
                                    />
                                );
                            }
                        })}
                        {/*TODO: O `if` foi adicionado porque as ajudas estavam aparecendo mesmo se voce nao for dono... Rever essa logica para uma mais escalavel.*/}
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
