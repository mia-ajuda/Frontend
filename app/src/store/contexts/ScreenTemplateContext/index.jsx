import React, { createContext, useMemo, useState } from 'react';
import { styles } from './styles';
import { StatusBar, View } from 'react-native';
import colors from '../../../../colors';

export const ScreenTemplateContext = createContext({});

export const ScreenTemplateContextProvider = ({ children }) => {
    const [useSafeAreaView, setUseSafeAreaView] = useState(true);

    const contextValue = useMemo(() => {
        return {
            setUseSafeAreaView,
        };
    }, [setUseSafeAreaView]);

    return (
        <ScreenTemplateContext.Provider value={contextValue}>
            <StatusBar
                backgroundColor={colors.new_background}
                barStyle={'dark-content'}
                translucent
            />
            <View
                style={
                    useSafeAreaView
                        ? styles.templateContainerWithMargin
                        : styles.templateContainer
                }
            >
                {children}
            </View>
        </ScreenTemplateContext.Provider>
    );
};
