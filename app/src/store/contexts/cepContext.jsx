import React, { createContext, useMemo } from 'react';
import callService from '../../services/callService';
import ViaCep from '../../ExternalServices/ViaCep';
export const CepContext = createContext();

export default function CepContextProvider({ children }) {
    async function getCepInformation(cep) {
        return await callService(ViaCep, 'getCepInformation', [cep]);
    }

    const contextValue = useMemo(() => {
        return {
            getCepInformation,
        };
    }, [getCepInformation]);

    return (
        <CepContext.Provider value={contextValue}>
            {children}
        </CepContext.Provider>
    );
}
