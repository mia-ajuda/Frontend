import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useEffect } from 'react'
import { FloatingIconButton } from '../../molecules/FloatingIconButton';
import { View } from 'native-base';
import { Image } from 'react-native';

export const BaseBottomSheet = ({ bottomSheetRef, scrollable, snapPoints, handleCloseModal, coverPhoto, children, overDragResistanceFactor = 7, handleComponent = null, background = 'white' }) => {

    useEffect(() => {
        bottomSheetRef.current?.present()
    }, [])

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
        />
    );

    const margin = coverPhoto ? 'mt-4' : 'mt-12'

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
                <BottomSheetScrollView scrollEnabled={scrollable}>
                    {coverPhoto && <Image className='w-full h-36' source={{ uri: `data:image/png;base64,${coverPhoto}`, }} />}
                    <FloatingIconButton
                        iconName={'close'}
                        onPress={handleCloseModal}
                    />
                    <View className={`flex-1 px-6 h-full ${margin}`}>
                        {children}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}
