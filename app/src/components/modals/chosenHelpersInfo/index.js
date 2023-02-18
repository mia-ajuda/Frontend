import React, { useEffect, useRef } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import HelpersInfo from '../../HelpersInfo';

export default function ChosenHelpersInfo({ user, showModal, setShowModal }) {
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            bottomSheetRef.current?.present();
        }
    }, [showModal]);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={[380]}
                onDismiss={() => setShowModal(false)}
                enablePanDownToClose
            >
                <HelpersInfo userId={user._id} />
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
