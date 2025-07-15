import styles from "./CityList.module.css"
import Spinner from "./Spinner"
import CityItem from "./CityItem"
import Message from "./Message"
import { useCities } from "../contexts/CitiesContext"

export default function CityList(){
    const {cities,isLoading}=useCities()
   if(isLoading){
        return <Spinner/>
    }
    if(cities.length === 0){
        return <Message>Add your first city by clicking on the map!</Message>
    }
    return <ul className={styles.countryList}>
        {cities.map(city=><CityItem city={city} key={city.id}/>)}
    </ul>
}