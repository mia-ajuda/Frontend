import React, { useContext, useEffect, useRef, useState } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { UserContext } from '../../../store/contexts/userContext';
import { ActivitiesContext } from '../../../store/contexts/activitiesContext';
import { UserActivity } from './UserActivity';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { EntityActivity } from './EntityActivity';
import colors from '../../../../colors';

export const ActivityBottomSheet = ({
    selectedActivity,
    setShowModal,
    isRiskGroup,
}) => {
    const { fetchUserInfo } = useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { getActitivtieById } = useContext(ActivitiesContext);
    const [ownerInfo, setOwnerInfo] = useState();
    const [activityInfo, setActivityInfo] = useState();
    const bottomSheetRef = useRef();
    const isCampaign = selectedActivity.type === 'campaign';

    const getInfos = async () => {
        setIsLoading(true);
        const owner = await fetchUserInfo(selectedActivity.ownerId);
        setOwnerInfo(owner);
        const activity = await getActitivtieById(
            selectedActivity.type,
            selectedActivity.id,
        );
        setActivityInfo(activity);
        setIsLoading(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getInfos();
    }, []);

    return (
        <BaseBottomSheet
            bottomSheetRef={bottomSheetRef}
            handleCloseModal={handleCloseModal}
            snapPoints={isCampaign ? ['75%'] : ['70%']}
            background={colors.new_background}
            coverPhoto={isCampaign && ownerInfo?.photo}
        >
            {isCampaign ? (
                <EntityActivity
                    activityInfo={activityInfo}
                    ownerInfo={ownerInfo}
                />
            ) : (
                <UserActivity
                    activityType={selectedActivity.type}
                    activityInfo={activityInfo}
                    ownerInfo={ownerInfo}
                    isRiskGroup={isRiskGroup}
                    setShowModal={setShowModal}
                />
            )}
        </BaseBottomSheet>
    );
};
