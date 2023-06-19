import React, { useContext, useEffect, useRef, useState } from 'react';
import { BaseBottomSheet } from '../BaseBottomSheet';
import { UserContext } from '../../../store/contexts/userContext';
import { ActivitiesContext } from '../../../store/contexts/activitiesContext';
import { UserActivity } from './UserActivity';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { EntityActivity } from './EntityActivity';
import colors from '../../../../colors';
import { Dimensions } from 'react-native';

export const ActivityBottomSheet = ({
    selectedActivity,
    setShowModal,
    isRiskGroup,
    navigation,
}) => {
    const { fetchUserInfo } = useContext(UserContext);
    const { getActitivtieById } = useContext(ActivitiesContext);
    const [ownerInfo, setOwnerInfo] = useState();
    const [activityInfo, setActivityInfo] = useState();
    const bottomSheetRef = useRef();
    const [modalLoading, setModalLoading] = useState(false);
    const isCampaign = selectedActivity.type === 'campaign';
    const { height } = Dimensions.get('window');
    const isBigPhone = height > 720;
    const entitySnapPoints = isBigPhone ? ['70%'] : ['80%'];
    const userSnapPoints = isBigPhone ? ['65%'] : ['75%'];

    const getInfos = async () => {
        setModalLoading(true);
        const owner = await fetchUserInfo(selectedActivity.ownerId);
        setOwnerInfo(owner);
        const activity = await getActitivtieById(
            selectedActivity.type,
            selectedActivity.id,
        );
        setActivityInfo(activity);
        setModalLoading(false);
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
            snapPoints={isCampaign ? entitySnapPoints : userSnapPoints}
            background={colors.new_background}
            coverPhoto={isCampaign && ownerInfo?.photo}
            isLoading={modalLoading}
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
                    navigation={navigation}
                />
            )}
        </BaseBottomSheet>
    );
};
