import { useState } from "react";

export function useGeolocation(defaultPosition = null){
    const [isLoading,setIsLoading]=useState();
    const [position,setPosition]= useState(defaultPosition);
    const [error,setError]=useState();
    function getGeoLocation(){
            if(!navigator.geolocation){
        return setError("Your browser doesn't support geolocation")
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
        (pos)=>{
            setError("")
            setPosition({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            })
            setIsLoading(false)
        },
        (error)=>{
            setError(error.message)
            setIsLoading(false)
        }
    )
   

    }
    return {isLoading,error,position,getGeoLocation};
}
