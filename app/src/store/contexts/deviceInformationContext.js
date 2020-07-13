import React, { createContext, useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export const DeviceInformationContext = createContext();

export default function DeviceInfoProvider({ children }) {
    const [keyboardInformation, setKeyboardInformation] = useState({
        visible: false,
        dismiss: Keyboard.dismiss,
    });
    const operationalSystem = Platform.OS;

    //Add keyboardListenters
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardVisible);
        Keyboard.addListener('keyboardDidHide', keyboardHidden);

        return () => {
            Keyboard.removeListener('keyboardDidShow', keyboardVisible);
            Keyboard.removeListener('keyboardDidHide', keyboardHidden);
        };
    }, []);

    const keyboardVisible = () => {
        setKeyboardInformation({ ...keyboardInformation, visible: true });
    };
    const keyboardHidden = () => {
        setKeyboardInformation({ ...keyboardInformation, visible: false });
    };

    return (
        <DeviceInformationContext.Provider
            value={{
                operationalSystem,
                keyboard: keyboardInformation,
            }}>
            {children}
        </DeviceInformationContext.Provider>
    );
}
