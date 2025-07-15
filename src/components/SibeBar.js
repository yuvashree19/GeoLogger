import { Outlet } from "react-router"
import AppNav from "./AppNav"
import Footer from "./Footer"
import Logo from "./Logo"
import styles from "./SideBar.module.css"
export default function SideBar(){
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <Footer></Footer>
        </div>
    )

}