import styles from './Detail.module.css'

export const Detail = ({title,value,children})=>{
    return (
        <div className={styles.detail}>
            <p className={styles.title}>{title}</p>
            <div className={styles.value}>{value?(<p>{value}</p>):children}</div>
        </div>
    )
}