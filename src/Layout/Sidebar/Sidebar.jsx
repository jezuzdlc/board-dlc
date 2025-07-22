import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Sidebar.module.css'
import { faListCheck, faTable } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export const Sidebar = ({isOpen})=>{
    return(
        <>
        <nav className={`${styles.sidebar} ${isOpen? styles.open:""}`}>
            
            <NavLink to="/board" className={({isActive})=>`${styles.navlink} ${isActive?styles.active:styles.inactive}` }>
                <div className={styles.link}>
                    <FontAwesomeIcon icon={faTable} size="2x" className={styles.icon}/>
                    <p className={styles.label}>Tableros</p>
                </div>
            </NavLink>
            

            <NavLink to="/" className={({isActive})=>`${styles.navlink} ${isActive?styles.active:styles.inactive}` }>
                <div className={styles.link}>
                    <FontAwesomeIcon icon={faListCheck} size="2x" className={styles.icon}/>
                    <p className={styles.label} >Tareas</p>
                </div>
            </NavLink>
        </nav>
        </>
    )
}