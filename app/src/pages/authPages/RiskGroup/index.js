import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Button from '../../../components/UI/button';
import styles from './styles';
import userService from '../../../services/User';
import { Icon } from 'react-native-elements';
import colors from '../../../../assets/styles/colorVariables';
import riskGroups from '../../../utils/riskGroupsObject';
import { alertSuccess, alertError } from '../../../utils/Alert';

export default function RiskGroup({ route, navigation }) {
    const { userDataFromPhotoPage } = route.params;
    const [loadingUserRegistration, setLoadingUserRegistration] = useState(
        false,
    );
    const [disease, setDisease] = useState({
        dc: false,
        hiv: false,
        diab: false,
        hiperT: false,
        doenCardio: false,
    });

    const onRiskGroupSelection = (id) => {
        if (disease[id] === true) {
            setDisease({ ...disease, [id]: false });
        } else setDisease({ ...disease, [id]: true });
    };

    const confirmSignUp = async () => {
        let newDisease = [];

        for (let prop in disease) {
            if (disease[prop]) {
                newDisease.push(prop);
            }
        }

        const completeRegistragionData = {
            ...userDataFromPhotoPage,
            riskGroup: newDisease,
        };
        try {
            setLoadingUserRegistration(true);
            await userService.signUp(completeRegistragionData);
            navigation.navigate('login');
            alertSuccess('Seu cadastro foi realizado com sucesso');
        } catch (err) {
            navigation.navigate('login');
            alertError(err);
        }
    };

    const renderPageHeader = () => (
        <>
            <View style={styles.backIcon}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.button}>
                    <Icon name={'arrow-back'} color={'black'} />
                </TouchableOpacity>
            </View>
            <View style={styles.viewText}>
                <Text style={styles.text1}>
                    Por último, é importante sabermos se você se encontra em um
                    dos grupos de risco. Selecione caso possua alguma das
                    condições a seguir:
                </Text>
            </View>
        </>
    );

    const renderLoadingIndicator = () => (
        <ActivityIndicator size="large" color={colors.primary} />
    );

    const renderRiskGroupSelection = () => {
        return (
            <View style={styles.input}>
                {Object.entries(riskGroups).map(
                    ([objecKey, riskGroupValue]) => {
                        return (
                            <View key={objecKey} style={styles.inputItem}>
                                <Button
                                    type={
                                        !disease[objecKey]
                                            ? 'notSelected'
                                            : null
                                    }
                                    press={() => onRiskGroupSelection(objecKey)}
                                    large
                                    title={riskGroupValue}
                                />
                            </View>
                        );
                    },
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderPageHeader()}
            {renderRiskGroupSelection()}
            <View style={styles.btnView}>
                {loadingUserRegistration ? (
                    renderLoadingIndicator()
                ) : (
                    <Button title="Concluir" large press={confirmSignUp} />
                )}
            </View>
        </View>
    );
}
