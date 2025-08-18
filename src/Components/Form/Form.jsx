import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import { Input } from "../Input/Input";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { TextArea } from "../TextArea/TextArea";
import { Select } from "../Select/Select";
import { useQuery } from "@tanstack/react-query";
import { fetchPriorities } from "../../api/priority";

export const Form = () => {
 
  const {register,handleSubmit,formState:{errors}} = useForm()

  const {data:priorities}= useQuery({
    queryFn:()=>fetchPriorities(),
    queryKey:['priorities']
  })

  console.log(priorities);
  const onSubmit = handleSubmit((data)=>{
    console.log(data);
    prompt('se envio la data')
  })

  const validateDate = (value)=>{
      const [year,month,day] = value.split("-").map(Number)
      const date = new Date(year,month-1,day);
      const actualDate = new Date()
      actualDate.setHours(0,0,0,0)
      if(date<actualDate){
        return "La fecha no puede ser anterior a hoy."
      }
      return true
  }


  return (

    
      <form action="" className={styles.form} onSubmit={onSubmit}>
        <section className={styles.detail}>

          <FormWrapper>
            <Input isRequired={true} element={'title'} register={register} setMinLength={2} setMaxLength={100} label={"Titulo"} type={"text"}/>
            {errors.title && <FormErrorMessage error={errors.title.message}/>}
          </FormWrapper>

          <FormWrapper>
            <TextArea register={register} element={'description'} setMaxLength={1000} label={'Descripción'}   />
            {errors.description && <FormErrorMessage error={errors.description.message}/>}
          </FormWrapper>

          <FormWrapper>
            <Input isRequired={true} label={'Fecha de entrega'} type={'date'} element={'date'} register={register} isDate={true} validate={validateDate}/>
            {errors.date && <FormErrorMessage error={errors.date.message}/>}
          </FormWrapper>

          <FormWrapper>
            <Select register={register} label={'Prioridad'} isRequired={true} element={'priority'} options={priorities}/>
            {errors.priority && <FormErrorMessage error={errors.priority.message}/>}
          </FormWrapper>

        </section>
        
        <section className={styles["buttons-container"]}>
          <Button type={"submit"} text={"Guardar"}><FontAwesomeIcon icon={faFloppyDisk}/></Button>
        </section>
      </form>
  );
};
