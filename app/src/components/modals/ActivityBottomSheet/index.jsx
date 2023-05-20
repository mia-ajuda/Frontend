import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../../store/contexts/userContext'
import { BaseBottomSheet } from '../BaseBottomSheet'
import { ActivitiesContext } from '../../../store/contexts/activitiesContext'
import { UserActivity } from './UserActivity'
import { LoadingContext } from '../../../store/contexts/loadingContext'

export const ActivityBottomSheet = ({ selectedActivity, setShowModal, isRiskGroup }) => {
    const { fetchUserInfo } = useContext(UserContext)
    const { setIsLoading } = useContext(LoadingContext)
    const { getActitivtieById } = useContext(ActivitiesContext)
    const [ownerInfo, setOwnerInfo] = useState()
    const [activityInfo, setActivityInfo] = useState()
    const bottomSheetRef = useRef()

    const getInfos = async () => {
        setIsLoading(true)
        const owner = await fetchUserInfo(selectedActivity.info.ownerId)
        setOwnerInfo(owner)
        const activity = await getActitivtieById(selectedActivity.type, selectedActivity.info._id)
        setActivityInfo(activity)
        setIsLoading(false)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        getInfos()
    }, [])


    return (
        <BaseBottomSheet bottomSheetRef={bottomSheetRef} handleCloseModal={handleCloseModal} snapPoints={['75%']} background='#F2F2F7'>
            <UserActivity activityType={selectedActivity.type} activityInfo={activityInfo} ownerInfo={ownerInfo} isRiskGroup={isRiskGroup} />
        </BaseBottomSheet>
    )
}
