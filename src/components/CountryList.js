import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from "../contexts/CitiesContext"

export default function CountryList(){
  const {cities,isLoading}=useCities()
    if(isLoading){
        return <Spinner/>
    }
    if(!cities.length){
        return <Message>Add your first city by clicking on the map!</Message>
    }
      const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(countries)

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}