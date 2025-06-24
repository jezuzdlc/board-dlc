import styles from './FormCard.module.css'

export const FormCard = ()=>{
    return (
        <form action="" className={styles.form}>
            <h2>hola</h2>
            <div>
                <label htmlFor="">titulo</label>
               <input type="text" /> 
            </div>
        </form>
    )
}