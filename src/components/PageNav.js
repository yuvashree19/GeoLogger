import {NavLink } from "react-router";
import styles from "./PagNav.module.css"
import Logo from "./Logo";
export default function PageNav(){
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                 <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}