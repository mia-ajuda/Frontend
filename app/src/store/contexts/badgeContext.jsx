import React, { createContext, useMemo, useState } from 'react';
import callService from '../../services/callService';
import badgeService from '../../services/Badge';
import { BadgeEarnModal } from '../../components/modals/BadgeEarnModal';
export const BadgeContext = createContext();

export default function BadgeContextProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [badges, setBadges] = useState();

    const showUpdatedBadges = (updatedBadges) => {
        if (updatedBadges.length > 0) {
            setBadges(updatedBadges);
            setShowModal(true);
        }
    };
    async function getUserBadges(userId) {
        return await callService(badgeService, 'getUserBadges', [userId]);
    }

    async function getBadgeList(userId) {
        const badgeList = await callService(badgeService, 'getBadgeList', [
            userId,
        ]);
        const updatedBadges = badgeList.filter(
            (badge) =>
                !badge.visualizedAt || badge.visualizedAt > badge.updatedAt,
        );
        console.log(updatedBadges);
        showUpdatedBadges(updatedBadges);
    }

    async function getBadgesHistory(userId) {
        return await callService(badgeService, 'getBadgesHistory', [userId]);
    }

    async function increaseUserBadge(userId, category) {
        const response = await callService(badgeService, 'increaseUserBadge', [
            userId,
            category,
        ]);
        return response;
    }

    async function viewBadge(userId, badgeId) {
        const response = await callService(badgeService, 'viewBadge', [
            userId,
            badgeId,
        ]);
        return response;
    }

    const contextValue = useMemo(() => {
        return {
            getUserBadges,
            getBadgesHistory,
            increaseUserBadge,
            getBadgeList,
            showUpdatedBadges,
            viewBadge,
        };
    }, [
        getUserBadges,
        getBadgesHistory,
        increaseUserBadge,
        getBadgeList,
        showUpdatedBadges,
    ]);

    return (
        <BadgeContext.Provider value={contextValue}>
            {children}
            {showModal && (
                <BadgeEarnModal
                    badges={badges}
                    setIsVisible={setShowModal}
                    isVisible={showModal}
                    onviewBadge={viewBadge}
                />
            )}
        </BadgeContext.Provider>
    );
}
