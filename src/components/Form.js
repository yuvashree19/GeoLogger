import { useNavigate } from "react-router"
import Button from "./Button"
import BackButton from "./BackButton"
import styles from "./Form.module.css"
import { useEffect, useState } from "react"
import { useUrlPosition } from "../hooks/useUrlPosition"
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext"
export function convertToEmoji(countryCode){
    
    const codePoints=countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);

}
export default function Form(){
    const [lat,lng]=useUrlPosition();
    const [cityName,setCityName]=useState();
    const [country,setCountry]=useState();
    const [date,setDate]=useState(new Date());
    const [notes,setNotes]=useState("");
    const [emoji,setEmoji]=useState();
    const [geoLoading,setGeoLoading]=useState(false);
    const [geoError,setGeoError]=useState("");
    const {createCity}=useCities();
    

    const navigate=useNavigate()
    function handleBack(e){
        e.preventDefault()
        navigate(-1)
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(!cityName || !date) return;
        const newCity={
            cityName,
            country,
            emoji,
            date,
            notes,
            position:{lat,lng}
        }
       await createCity(newCity);
       navigate("/app/cities")
    }
    
    useEffect(function(){
        async function fetchCityData() {
            try{
                setGeoLoading(true)
                const res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
                const data=await res.json()
                if(!data.countryCode && !data.city) throw new Error("Please Click somewhere else on the map!")
                console.log(data)
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName)
                setEmoji(convertToEmoji(data.countryCode));

            }
            catch(error){

                setGeoError(error.message)
                
            }
            finally{
                setGeoLoading(false)
            }
            
        }
        fetchCityData()
    },[lat,lng])
    if(!lat && !lng) return <Message>Start by clicking somewhere on the map!😉</Message>
    if(geoLoading) return (<Spinner/>)
    if(geoError) return <Message> {geoError}</Message>
    
    return (
        
       <form className={styles.form}>
        <div className={styles.row}>
            <label htmlFor="cityName">City Name</label>
            <input type="Text" id="cityName" value={cityName} onChange={(e)=>setCityName(e.target.value)}></input>
        </div>
        {/* <div className={styles.row}>
            <label htmlFor="date">Date</label>
            <input type="Text" id="date" value={date} onChange={(e)=>setDate(e.target.value)}></input>
        </div> */}
        <DatePicker onChange={date=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
        <div className={styles.row}>
            <label htmlFor="notes">Notes</label>
            <input type="Text" id="notes" value={notes} onChange={(e)=>setNotes(e.target.value)}></input>
        </div>
        <div className={styles.buttons}>
           <Button type="primary" onClick={handleSubmit}> Add</Button>
         <BackButton>Back</BackButton>
        </div>
       </form>
    )
}