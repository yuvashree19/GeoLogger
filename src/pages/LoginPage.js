import { useEffect, useState } from "react";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import styles from "./LoginPage.module.css"
import { useAuth } from "../contexts/FakeAuthContext";
import { replace, useNavigate } from "react-router";



export default function Login(){
    const [email,setEmail]=useState("jack@example.com")
    const [password,setPassword]=useState("qwerty")
    const {login,isAuthenticated}=useAuth()
    const navigate=useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        if(email && password) login(email,password)
        

    }
    useEffect(function(){
        if(isAuthenticated) navigate("/app",{replace : true})
    },[isAuthenticated,navigate])
    return <main className={styles.login}><PageNav></PageNav>
    <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">
            Email address
        </label>
        <input type="email" id="email" placeholder="Enter Your Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <label htmlFor="password">
           Password
        </label>
        <input type="password" id="password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <Button type="primary" >Login</Button>
    </form>
    </main>
} 