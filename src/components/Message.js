import styles from "./Message.module.css"
export default function Message({children}){
    return <div className={styles.message}>{children}</div>
}