import styles from './Select.module.css'

export const Select = ({register,label,element,isRequired=false,options})=>{
    return (
        <>
        <label htmlFor={element}>{label}:</label>
        <select id={element} className={styles.select} {...register(element,{
            required:isRequired?{
                value:true,
                message:`El campo ${label} es requerido`
                }:false,
        })}>
            {options.map((option)=>(
                <option key={option.value} id={element} value={option.value}>{option.name}</option>
            ))}
        </select>
        </>
    )
}