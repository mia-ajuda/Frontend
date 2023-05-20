import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useEffect } from 'react'
import { FloatingIconButton } from '../../molecules/FloatingIconButton';
import { View } from 'native-base';

export const BaseBottomSheet = ({ bottomSheetRef, scrollable, snapPoints, handleCloseModal, children, overDragResistanceFactor = 7, handleComponent=null, background = 'white' }) => {

    useEffect(()=> {
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
                backgroundStyle={{backgroundColor: background}}
            >
                <BottomSheetScrollView scrollEnabled={scrollable}>
                    <FloatingIconButton
                        iconName={'close'}
                        onPress={handleCloseModal}
                    />
                    <View className='flex-1 px-6 my-12 h-full'>
                        {children}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}
