import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityCard } from '../ActivityCard';
import { NotFound } from '../NotFound';

export const ActivitiesList = ({ activities }) => {
    const activitiesTypes = Object.keys(activities);
    const activitiesCount = activitiesTypes.reduce((currentValue, newValue) => {
        return currentValue + activities[newValue].length;
    }, 0);
    return activitiesCount > 0 ? (
        <ScrollView
            className="w-full max-h-44"
            horizontal
            contentContainerStyle={{
                alignItems: 'center',
            }}
        >
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
        </ScrollView>
    ) : (
        <NotFound title="Usuário não possui atividades" size="small" />
    );
};
