import styles from "./Button.module.css"

export const Button = ({children,text,handleClick})=>{
    return(
        <button className={styles.button} onClick={handleClick}> {text} {children}</button>
    )
}