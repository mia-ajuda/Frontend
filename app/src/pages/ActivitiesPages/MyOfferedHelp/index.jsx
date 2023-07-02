import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import MyRequestHelpCard from '../../../components/MyRequestCard';
import { UserContext } from '../../../store/contexts/userContext';
import helpService from '../../../services/Help';
import styles from '../styles';
import NoHelps from '../../../components/NoHelps';
import callService from '../../../services/callService';
import PlusIconTextButton from '../../../components/PlusIconTextButton';
import createInteraction from '../../../utils/createInteraction';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { Dialog } from '../../../components/molecules/Dialog';

export default function HelpsFinished({ navigation }) {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [finishedHelpList, setFinishedHelpList] = useState([]);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [helpToDelete, setHelpToDelete] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(true);

    useEffect(() => {
        if (shouldUpdate) loadOnGoingOffers(setIsLoading);
    }, []);

    async function loadOnGoingOffers(loadingSetter) {
        loadingSetter(true);
        const { _id: userId } = user;
        const resFinished = await callService(helpService, 'listHelpOffer', [
            userId,
            true,
        ]);
        if (!resFinished.error) {
            setFinishedHelpList(resFinished);
        }
        loadingSetter(false);
        setShouldUpdate(false);
    }

    async function excludeHelp() {
        const validDeleteRequest = await callService(
            helpService,
            'deleteHelp',
            ['helpOffer', helpToDelete],
        );
        if (!validDeleteRequest.error) {
            const updatedArray = finishedHelpList.filter((help) => {
                return help._id !== helpToDelete;
            });
            setFinishedHelpList(updatedArray);
        }
        setConfirmationModalVisible(false);
        setShouldUpdate(true);
    }

    const renderCards = ({ item }) => (
        <TouchableOpacity
            key={item._id}
            onPress={() =>
                navigation.navigate('myOfferHelpDescription', {
                    helpId: item._id,
                    routeId: 'HelpOffer',
                })
            }
        >
            <MyRequestHelpCard
                object={item}
                possibleInterestedList={[
                    ...item.possibleHelpedUsers,
                    ...item.helpedUserId,
                ]}
                setConfirmationModalVisible={setConfirmationModalVisible}
                setSelectedHelp={setHelpToDelete}
            />
        </TouchableOpacity>
    );

    const renderHelpList = () => {
        if (finishedHelpList.length > 0) {
            return (
                <View style={styles.helpList}>
                    <FlatList
                        data={finishedHelpList}
                        renderItem={renderCards}
                        key={(item) => item._id}
                        refreshing={isRefreshing}
                        onRefresh={() => loadOnGoingOffers(setIsRefreshing)}
                    />
                </View>
            );
        } else {
            return <NoHelps title={'Você não possui nenhuma oferta criada'} />;
        }
    };
    return (
        <View style={styles.container}>
            <PlusIconTextButton
                text="Criar oferta"
                onPress={() =>
                    createInteraction(user, navigation, 'createHelpOffer')
                }
            />
            <Dialog
                isVisible={confirmationModalVisible && !isLoading}
                title="Deletar oferta de ajuda?"
                description="Você deseja deletar essa oferta de ajuda?"
                cancelText="Não"
                confirmText="Sim"
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={excludeHelp}
            />
            {!isLoading && renderHelpList()}
        </View>
    );
}
