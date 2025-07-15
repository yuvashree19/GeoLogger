import { useParams, useSearchParams } from "react-router"
import styles from "./City.module.css"
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";

const formatDate = (date)=> new Intl.DateTimeFormat("en",{
    day:"numeric",
    month:"long",
    year:"numeric",
    weekday:"long"
}).format(new Date(date))
export default function City(){
    const {id}=useParams();
    const {getCity,currentCity,isLoading}=useCities();
    // const [searchParams,setSearchParams]=useSearchParams();
    const {cityName,date,emoji,notes}=currentCity;
   
    useEffect(function(){
        getCity(id);
    },[id])
    if (isLoading) return <Spinner/>;
    return (
        
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City Name</h6>
                <h3>
          <span>{emoji}</span> {cityName}
        </h3>
            </div>
            <div className={styles.row}>
                <h6>You went to {cityName} on </h6>
                <p> { formatDate(date || null)}</p>
            </div>
            {notes && <div className={styles.row}>
                <h6>Notes</h6>
                <p>{notes}</p>
            </div>}
            <div className={styles.row}>
                <h6>Learn More..</h6>
                <a href={`https://en.wikipedia.org/wiki/${cityName}`}
                target="_blank"
                rel="noreferrer">
                    Check out {cityName} on Wikipedia &rarr;
                </a>
            </div>
            <div className={styles.row}>
               <BackButton> &larr; Back</BackButton>
            </div>
        </div>
    )
}