import React, { useState, createContext, useContext, useEffect } from 'react';
import { UserContext } from './userContext';

export const LocationContext = createContext();

export default function LocationContextProvider(props) {
    const { currentRegion } = useContext(UserContext);
    const [location, setLocation] = useState(currentRegion);

    useEffect(() => {
        if (currentRegion) {
            setLocation(currentRegion);
        }
    }, [currentRegion]);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {props.children}
        </LocationContext.Provider>
    );
}
