import React, { createContext } from 'react';
import { alertError } from '../../utils/Alert';
export const ServiceContext = createContext();

export default function ServiceContextProvider(props) {
    async function useService(service, functionName, params, errorMessage) {
        try {
            let functionReturn = await service[functionName](...params);
            if (!functionReturn) functionReturn = true;
            return functionReturn;
        } catch (error) {
            alertError(error, errorMessage);
            return false;
        }
    }
    return (
        <ServiceContext.Provider value={{ useService }}>
            {props.children}
        </ServiceContext.Provider>
    );
}
