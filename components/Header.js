import styles from '../styles/Home.module.scss'

export default function Header(){
    return(
        <header className={styles.header}>
        <h1><a href="https://www.elysiandekor.com/">ELYSIAN</a></h1>
        <div className={styles.nav}>
            <a href="https://www.elysiandekor.com/shop">Shop</a>
            <a href="https://www.elysiandekor.com/blog">Blog</a>
        </div>
    </header>
    )
}