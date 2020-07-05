import React, { useState, createContext, useContext, useEffect } from 'react';
import { UserContext } from './userContext';

export const LocationContext = createContext();

export default function LocationContextProvider(props) {
    const { userPosition } = useContext(UserContext);
    const [location, setLocation] = useState(userPosition);

    useEffect(() => {
        if (userPosition) {
            setLocation(userPosition);
        }
    }, [userPosition]);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {props.children}
        </LocationContext.Provider>
    );
}
