import React, { createContext, useMemo, useState } from 'react';
import callService from '../../services/callService';
import badgeService from '../../services/Badge';
import { BadgeEarnModal } from '../../components/modals/BadgeEarnModal';
export const BadgeContext = createContext();

export default function BadgeContextProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [badge, setBadge] = useState();
    const [navigation, setNavigation] = useState();
    async function getUserBadges(userId) {
        return await callService(badgeService, 'getUserBadges', [userId]);
    }

    async function getBadgesHistory(userId) {
        return await callService(badgeService, 'getBadgesHistory', [userId]);
    }
    async function increaseUserBadge(userId, category, navigationObject) {
        const response = await callService(badgeService, 'increaseUserBadge', [
            userId,
            category,
        ]);
        if (!response.error) {
            setNavigation(navigationObject);
            setBadge({
                ...response.badge,
                recentUpdated: response.recentUpdated,
            });
            setShowModal(response.recentUpdated);
        }
        return response;
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
            {showModal && (
                <BadgeEarnModal
                    badge={badge.template}
                    setIsVisible={setShowModal}
                    isVisible={showModal}
                    navigation={navigation}
                />
            )}
        </BadgeContext.Provider>
    );
}
