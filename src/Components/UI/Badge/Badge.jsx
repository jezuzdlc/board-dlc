import styles from './Badge.module.css'

export const Badge = ({type})=>{
    return (
        <div className={`${styles.badge} ${styles[type]}`}>
            {type}
        </div>
    )
}