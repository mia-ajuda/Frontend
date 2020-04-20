import React, {useState, createContext, useContext, useEffect} from "react"
import { UserContext } from "./userContext";
import { calculateDistance } from '../../utils/helpDistance';

export const LocationContext = createContext();

export default function LocationContextProvider(props) {
    const { currentRegion } = useContext(UserContext);
    const [location, setLocation] = useState(currentRegion)
    const [activeLocations, setActiveLocations] = useState(null)

    useEffect(() => {
        if(currentRegion) {
            // setLocation(currentRegion)
            const obj = createObj(currentRegion)
            setActiveLocations(obj)
        }
    }, [currentRegion])

    useEffect(() => {
        if(location) {
            if(shouldRequest(location)) {
                const obj = createObj(location)
                setActiveLocations({...activeLocations, ...obj})
            }
        }
    }, [location])

    function createKey({latitude, longitude}) {
        return `lat:${latitude},long:${longitude}`
    }

    function createObj({latitude, longitude}) {
        const key = createKey({latitude, longitude})
        return {
            [key]: {
                latitude,
                longitude
            }
        }
    }

    function shouldRequest({latitude, longitude}) {
        let should = true;
        if(activeLocations[createKey({latitude, longitude})]) {
            return false;
        }
        if(activeLocations) {
            Object.entries(activeLocations).every(element => {
                const distance = calculateDistance({latitude, longitude}, element[1])
                if(distance < 2) {
                    should = false
                    return false 
                }
                return true
            })
        }
        return should;
    }

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {props.children}
        </LocationContext.Provider>
    )
}