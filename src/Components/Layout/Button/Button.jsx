import styles from "./Button.module.css"

export const Button = ({children,text,handleClick})=>{
    return(
        <button className={styles.button} onClick={handleClick} type="button"> {text} {children}</button>
    )
}