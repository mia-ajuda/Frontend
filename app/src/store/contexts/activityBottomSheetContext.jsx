import React, { createContext, useEffect, useMemo, useState } from 'react';

export const ActivityBottomSheetContext = createContext({});

export const ActivityBottomSheetContextProvider = ({ children }) => {
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityInfo, setActivityInfo] = useState();

    const handleShowModal = (id, ownerId, type) => {
        setActivityInfo({ id, ownerId, type });
        setShowActivityModal(true);
    };

    useEffect(() => {
        if (!showActivityModal) setActivityInfo();
    }, [showActivityModal]);

    const contextValue = useMemo(() => {
        return {
            handleShowModal,
            setShowActivityModal,
            showActivityModal,
            activityInfo,
        };
    }, [
        handleShowModal,
        setShowActivityModal,
        showActivityModal,
        activityInfo,
    ]);

    return (
        <ActivityBottomSheetContext.Provider value={contextValue}>
            {children}
        </ActivityBottomSheetContext.Provider>
    );
};
