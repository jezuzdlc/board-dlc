import styles from './TextArea.module.css'

export const TextArea = ({register,label,element,isRequired=false,setMinLength=null,setMaxLength=null})=>{
    return (
        <>
            <label htmlFor={element}>{label}:</label>
            <textarea id={element} className={styles['text-area']} rows={3}
             placeholder={`Ingresa ${label}`} {...register(element,{
                required:isRequired?{
                    value:true,
                    message:`El campo ${label} es requerido`
                }:false,
                minLength:setMinLength?{
                  value:setMinLength,
                  message:`El campo ${label} debe tener al menos ${setMinLength} caracteres`
                }:false,
                maxLength:setMaxLength?{
                  value:setMaxLength,
                  message:`El campo ${label} debe tener maxico ${setMaxLength} caracteres`
                }:false
                })}></textarea>
        </>
    )
}