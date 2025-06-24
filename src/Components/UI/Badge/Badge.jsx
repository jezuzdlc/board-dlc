import styles from './Badge.module.css'

export const Badge = ({type})=>{
    return (
        <div className={`${styles.badge} ${styles[type]}`}>
            <p>{type}</p>
        </div>
    )
}