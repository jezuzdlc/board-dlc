import styles from "./Button.module.css"

export const Button = ({children,text,handleClick,width='100',type="button"})=>{
    
    const customButton = {
    width:`${width}px`,
    maxWidth:`130px`
    }

    return(
        <button className={styles.button} style={customButton} onClick={handleClick} type={type}> {text} {children}</button>
    )
}