import React, { useContext } from 'react';
import CustomMap from '../../CustomMap';
import { ActivityMarker } from '../../molecules/ActivityMarker';
import navigateToDescription from '../../../utils/navigateToDescription';
import { UserContext } from '../../../store/contexts/userContext';
import { ActivityBottomSheetContext } from '../../../store/contexts/activityBottomSheetContext';

export function AnimatedMap({
    list,
    navigation,
    focusedCardLocation,
    visibleItemData,
}) {
    const { user, userPosition } = useContext(UserContext);
    const { handleShowModal } = useContext(ActivityBottomSheetContext);
    return (
        <CustomMap
            initialRegion={userPosition}
            animateToRegion={focusedCardLocation}
        >
            {list.map((activity) => {
                const focused = visibleItemData?._id == activity._id;
                return (
                    <ActivityMarker
                        key={activity._id + `${focused}`}
                        activity={activity}
                        activityType={activity.type}
                        index={activity.index}
                        onPress={() =>
                            navigateToDescription(
                                user,
                                navigation,
                                activity._id,
                                activity.ownerId,
                                activity.type,
                                handleShowModal,
                            )
                        }
                        focused={focused}
                    />
                );
            })}
        </CustomMap>
    );
}
