import styles from '../styles/Home.module.scss'

export default function Header(){
    return(
        <header className={styles.header}>
        <h1 onClick={()=>window.location.reload(false)}>ELYSIAN</h1>
    </header>
    )
}