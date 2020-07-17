import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Button from '../../../components/UI/button';
import styles from './styles';
import SessionService from '../../../services/Session';
import { Icon } from 'react-native-elements';
import colors from '../../../../assets/styles/colorVariables';
import riskGroups from '../../../utils/riskGroupsObject';
import { alertSuccess, alertError } from '../../../utils/Alert';

export default function RiskGroup({ route, navigation }) {
    const { userData } = route.params;
    const [loading, setLoading] = useState(false);
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
            ...userData,
            riskGroup: newDisease,
        };

        try {
            setLoading(true);
            await SessionService.signUp(completeRegistragionData);
            navigation.navigate('login');
            alertSuccess(
                'Seu cadastro foi realizado com sucesso! Um email de verificação foi enviado para sua caixa de entrada',
            );
        } catch (err) {
            navigation.navigate('login');
            alertError(err);
        }
    };
    return (
        <View style={styles.container}>
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

            <View style={styles.input}>
                {Object.entries(riskGroups).map(([key, value]) => {
                    return (
                        <View key={key} style={styles.inputItem}>
                            <Button
                                type={!disease[key] ? 'notSelected' : null}
                                press={() => onRiskGroupSelection(key)}
                                large
                                title={value}
                            />
                        </View>
                    );
                })}
            </View>
            <View style={styles.btnView}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                    <Button title="Concluir" large press={confirmSignUp} />
                )}
            </View>
        </View>
    );
}
