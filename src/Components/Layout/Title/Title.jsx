import { Link } from 'react-router-dom'
import styles from './Title.module.css'

export const Title = ()=>{
    return (
        <div>
            <Link to="/">
            <h1 className={styles.title}>Board DLC</h1>
            </Link>
        </div>
    )
}