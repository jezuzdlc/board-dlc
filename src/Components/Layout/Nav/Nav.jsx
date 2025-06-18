import styles from './Nav.module.css'

export const Nav = ()=>{
    return(
        <nav className={styles["main-nav"]}>
            <a href="">Lista</a>
            <a href="">Nueva</a>
        </nav>
    )
}