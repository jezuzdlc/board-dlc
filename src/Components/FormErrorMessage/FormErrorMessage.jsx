import styles from './FormErrorMessage.module.css'

export const FormErrorMessage = ({error})=>{
    return(
        <span className={styles.span}>{error}</span>
    )
}