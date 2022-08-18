import { useContext, useEffect } from "react"
import { Location, useLocation } from "react-router-dom"
import { GlobalContext } from "../context/GlobalState"

export default function WatchLocation(){
    const {setLocation} = useContext(GlobalContext) 
    const location: Location = useLocation()
    useEffect(()=>{
        setLocation(location)
    }, [location.pathname])
    return <></>
}