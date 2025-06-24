import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

export const Nav = ()=>{
    return(
        <nav className={styles["main-nav"]}>
            <NavLink href="">Tasks</NavLink>
            <NavLink href="">Lista</NavLink>
        </nav>
    )
}