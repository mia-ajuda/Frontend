import React, { createContext, useMemo, useState } from 'react';
import { styles } from './styles';
import { StatusBar, View } from 'react-native';
import tailwindConfig from '../../../../tailwind.config';

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
                backgroundColor={
                    tailwindConfig.theme.extend.colors.new_background
                }
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
