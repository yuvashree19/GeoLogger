import { Link } from "react-router";
import styles from "./CityItem.module.css"
import { useCities } from "../contexts/CitiesContext";
const formatDate=(date)=>{
    new Intl.DateTimeFormat("en",{
        day:"numeric",
        month:"long",
        year:"numeric",
    }).format(new Date(date))
}
export default function CityItem({city}){
    const {cityName,emoji,date,id,position}=city;
    const {currentCity,deleteCity} = useCities();
    function handleDeleteCity(e){
        e.preventDefault()
        deleteCity(id)
    }
    return <Link  className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : "" }`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>&times;</button>
   </Link>
}   