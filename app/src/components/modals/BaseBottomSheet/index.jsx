import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { FloatingIconButton } from '../../molecules/FloatingIconButton';
import { ActivityIndicator, Image, View } from 'react-native';
import colors from '../../../../colors';

export const BaseBottomSheet = ({
    bottomSheetRef,
    scrollable,
    snapPoints,
    handleCloseModal,
    coverPhoto,
    children,
    overDragResistanceFactor = 7,
    handleComponent = null,
    shouldClose,
    background = 'white',
    isLoading,
}) => {
    useEffect(() => {
        bottomSheetRef.current?.present();
    }, []);

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
        />
    );

    useEffect(() => {
        if (shouldClose) bottomSheetRef.current?.dismiss();
    }, [shouldClose]);

    const margin = coverPhoto ? 'mt-4' : 'mt-12';

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                onDismiss={handleCloseModal}
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                handleComponent={handleComponent}
                overDragResistanceFactor={overDragResistanceFactor}
                backgroundStyle={{ backgroundColor: background }}
            >
                <FloatingIconButton
                    iconName={'close'}
                    onPress={() => bottomSheetRef.current.dismiss()}
                />
                {isLoading && (
                    <ActivityIndicator
                        size="large"
                        color={colors.primary.DEFAULT}
                        className="top-1/2"
                    />
                )}
                <BottomSheetScrollView scrollEnabled={scrollable}>
                    {coverPhoto && (
                        <Image
                            className="w-full h-36"
                            source={{
                                uri: `data:image/png;base64,${coverPhoto}`,
                            }}
                        />
                    )}
                    <View className={`flex-1 px-6 h-full ${margin}`}>
                        {!isLoading && children}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};
