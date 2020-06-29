import React, { useState, createContext, useEffect } from 'react';
import { Alert } from 'react-native';

export const ServiceContext = createContext();

export default function ServiceContextProvider(props) {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    useEffect(() => {
        if (showError) {
            Alert.alert('Erro:', errorMessage);
        }
    });
    async function useService(serviceFunction, params) {
        const newFunction = async function () {
            try {
                console.log("Service Function");
                console.log(serviceFunction);
                console.log(params);
                console.log("Service");
                const serviceReturn = await serviceFunction(params);
                console.log(serviceReturn);
                return serviceReturn;
            } catch (error) {
                console.log(error);
                setShowError(true);
                setErrorMessage(error.message);
            }
        };
        return await newFunction();
    }
    return (
        <ServiceContext.Provider value={{ useService }}>
            {props.children}
        </ServiceContext.Provider>
    );
}
