import React, {useState, createContext, useContext, useEffect} from "react"
import { UserContext } from "./userContext";

export const LocationContext = createContext();

export default function LocationContextProvider(props) {
    const { currentRegion, user } = useContext(UserContext);
    const [location, setLocation] = useState(currentRegion)

    useEffect(() => {
        if(user.info) {
            setLocation(currentRegion)
        }
    }, [currentRegion, user])

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {props.children}
        </LocationContext.Provider>
    )
}