import { useNavigate } from "react-router"
import styles from "./BackButton.module.css"
export default function BackButton({children}){
    const navigate=useNavigate();
    function handleBackButton(e){
        e.preventDefault()
        navigate(-1)
    }
    return (
        <button className={`${styles.btn} ${styles.back}`} onClick={handleBackButton}>{children}</button>
    )
} 