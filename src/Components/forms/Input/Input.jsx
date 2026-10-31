import styles from './Input.module.css'

export const Input = ({register,label,element,isRequired=false,type='text',isDate=false,setMinLength=null,setMaxLength=null,validate})=>{
    return(
                  <>
                   {isRequired}
                    <label htmlFor={element}>{label}:</label>
                    <input id={element} className={styles.input} type={type} placeholder={`Ingresa ${label}`} {...register(element,{ 
                      required:isRequired?{
                        value:true,
                        message:`El campo ${label} es requerido`
                      }:false,
                      minLength:!isDate&& setMinLength?{
                        value:setMinLength,
                        message:`El campo ${label} debe tener al menos ${setMinLength} caracteres`
                      }:false,
                      maxLength:!isDate && setMaxLength?{
                        value:setMaxLength,
                        message:`El campo ${label} debe tener maxico ${setMaxLength} caracteres`
                      }:false,
                      ...(validate && {validate})
                      })}/>
                  </>
    )
}