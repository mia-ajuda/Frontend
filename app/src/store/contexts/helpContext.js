import React, { createContext, useContext } from 'react';
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

    return (
        <HelpContext.Provider value={{ finishHelpByOwner }}>
            {props.children}
        </HelpContext.Provider>
    );
}
