import React, { createContext, useMemo } from 'react';
import callService from '../../services/callService';
import badgeService from '../../services/Badge';
export const BadgeContext = createContext();

export default function BadgeContextProvider({ children }) {
    async function getUserBadges(userId) {
        return await callService(badgeService, 'getUserBadges', [userId]);
    }

    async function getBadgesHistory(userId) {
        return await callService(badgeService, 'getBadgesHistory', [userId]);
    }
    async function increaseUserBadge(userId, category) {
        return await callService(badgeService, 'increaseUserBadge', [
            userId,
            category,
        ]);
    }

    const contextValue = useMemo(() => {
        return {
            getUserBadges,
            getBadgesHistory,
            increaseUserBadge,
        };
    }, [getUserBadges, getBadgesHistory, increaseUserBadge]);

    return (
        <BadgeContext.Provider value={contextValue}>
            {children}
        </BadgeContext.Provider>
    );
}
