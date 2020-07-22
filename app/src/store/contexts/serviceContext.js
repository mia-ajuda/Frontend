import React, { createContext } from 'react';
import { alertError, alertMessageEmailVerification } from '../../utils/Alert';
export const ServiceContext = createContext();

export default function ServiceContextProvider(props) {
    async function useService(service, functionName, params, errorMessage) {
        try {
            let functionReturn = await service[functionName](...params);
            return functionReturn;
        } catch (error) {
            if (error.code == 'auth/email-not-verified') {
                alertMessageEmailVerification(error.message);
            } else {
                alertError(error, errorMessage);
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
