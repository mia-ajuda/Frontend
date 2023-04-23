import React from 'react';
import { ActivityCard } from '../ActivityCard';
import { NotFound } from '../NotFound';
import { HorizontalList } from '../HorizontalList';

export const ActivitiesList = ({ activities }) => {
    const activitiesTypes = Object.keys(activities);
    const activitiesCount = activitiesTypes.reduce((currentValue, newValue) => {
        return currentValue + activities[newValue].length;
    }, 0);
    return activitiesCount > 0 ? (
        <HorizontalList className="max-h-44">
            {Object.keys(activities).map((activitieName) =>
                activities[activitieName].map((activitie, i) => (
                    <ActivityCard
                        key={activitie._id}
                        variant={activitieName.slice(
                            0,
                            activitieName.length - 1,
                        )}
                        id={activitie._id}
                        count={i + 1}
                        title={activitie.title}
                        description={activitie.description}
                        badges={activitie.categories}
                        distance={activitie.distance}
                    />
                )),
            )}
        </HorizontalList>
    ) : (
        <NotFound title="Usuário não possui atividades" size="small" />
    );
};
