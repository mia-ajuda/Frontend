import React, { createContext, useContext, useMemo } from 'react';
import { UserContext } from './userContext';
import callService from '../../services/callService';
import HelpService from '../../services/Help';

export const HelpContext = createContext();

export default function HelpContextProvider(props) {
    const { user } = useContext(UserContext);

    async function finishHelpByOwner(helpId) {
        const finishHelpRequest = await callService(
            HelpService,
            'finishHelpByOwner',
            [helpId, user._id],
        );
        if (!finishHelpRequest.error) {
            return true;
        }
        return false;
    }

    const contextValue = useMemo(() => {
        return {
            finishHelpByOwner,
        };
    }, [finishHelpByOwner]);

    return (
        <HelpContext.Provider value={{ contextValue }}>
            {props.children}
        </HelpContext.Provider>
    );
}
