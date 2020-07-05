import React, { createContext, useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export const DeviceInformation = createContext();

export default function DeviceInfoProvider({ children }) {
    const [keyboardInformation, setKeyboardInformation] = useState({
        visible: false,
        hide: Keyboard.dismiss,
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
        <DeviceInformation.Provider
            value={{
                operationalSystem,
                keyboard: keyboardInformation,
            }}>
            {children}
        </DeviceInformation.Provider>
    );
}
