import styles from './Overlay.module.css'

export const Overlay = ({children})=>{
    return (
        <div className={styles.overlay}>
            {children}
        </div>
    )
}