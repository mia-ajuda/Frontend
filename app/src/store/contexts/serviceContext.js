import React, { useState, createContext, useEffect } from 'react';
import { Alert } from 'react-native';
import translateFirebaseError from '../../utils/translateFirebaseAuthError';

export const ServiceContext = createContext();

export default function ServiceContextProvider(props) {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    useEffect(() => {
        if (showError) {
            Alert.alert('Houve um erro:', errorMessage, [
                {
                    text: 'OK',
                    onPress: () => {
                        setShowError(false);
                    },
                },
            ]);
        }
    }, [showError]);
    async function useService(
        service,
        functionName,
        params,
        hasErrorMessage = false,
    ) {
        try {
            console.log(service);
            console.log(functionName);
            console.log(params);
            return await service[functionName](...params);
        } catch (error) {
            let errorMessage;
            if (error.code) {
                errorMessage = translateFirebaseError[error.code];
            } else {
                errorMessage = error.response.data.error;
            }
            if (!hasErrorMessage) {
                setErrorMessage(
                    errorMessage |
                        'Algo deu errado, tente novamente mais tarde',
                );
                setShowError(true);
            }
            return false;
        }
    }
    return (
        <ServiceContext.Provider value={{ useService }}>
            {props.children}
        </ServiceContext.Provider>
    );
}
