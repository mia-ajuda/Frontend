import React, { createContext, useMemo, useState } from 'react';
import { ActivityBottomSheet } from '../../components/modals/ActivityBottomSheet';

export const ActivityBottomSheetContext = createContext({});

export const ActivityBottomSheetContextProvider = ({ children }) => {
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityInfo, setActivityInfo] = useState();

    const handleShowModal = (id, ownerId, type) => {
        setActivityInfo({ id, ownerId, type });
        setShowActivityModal(true);
    };

    const handleHideModal = () => {
        setShowActivityModal(false);
        setActivityInfo();
    };

    const contextValue = useMemo(() => {
        return {
            handleHideModal,
            handleShowModal,
            setShowActivityModal,
        };
    }, [handleHideModal, handleShowModal, setShowActivityModal]);

    return (
        <ActivityBottomSheetContext.Provider value={contextValue}>
            {children}
            {showActivityModal && (
                <ActivityBottomSheet
                    selectedActivity={activityInfo}
                    setShowModal={setShowActivityModal}
                />
            )}
        </ActivityBottomSheetContext.Provider>
    );
};
