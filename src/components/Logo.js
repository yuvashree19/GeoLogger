import { Link } from "react-router"
import styles from "./Logo.module.css"
export default function Logo(){
    return <Link to="/">
    <img src="../../logo.png" alt="GeoLogger Logo" className={styles.logo}></img></Link>
    
}