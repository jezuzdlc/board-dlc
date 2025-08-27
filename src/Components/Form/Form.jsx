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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPriorities } from "../../api/priority";
import { createTask, updateTicket } from "../../api/tasks";
import { useCallback, useContext, useEffect } from "react";
import { SetGlobalContext, ValueGlobalContext } from "../../Context/GlobalContext";
import { SetTicketsContext, ValueTicketsContext } from "../../Context/TicketContext";

export const Form = () => {


  const dispatch = useContext(SetGlobalContext);
  const state = useContext(ValueGlobalContext);
  const {ticket:activeTicket} = useContext(ValueTicketsContext); 
  const {setTicket} = useContext(SetTicketsContext)

  
  const ticketDefaultValues = useCallback(()=>{
    let tempObj = null
    if(activeTicket){
      tempObj = {
        name:activeTicket.name,
        description:activeTicket.description,
        delivery:formatDateToInput(new Date(activeTicket.delivery)),
        priority:activeTicket.priority.id
      }
    }
    return tempObj
  },[activeTicket])



  const formatDateToInput =(date) =>{
    return date.toISOString().split("T")[0];
  }

  const {register,handleSubmit,formState:{errors},reset} = useForm({
    defaultValues: ticketDefaultValues()||{
        delivery:formatDateToInput(new Date())
    }});

  const queryClient = useQueryClient()

  const {data:priorities}= useQuery({
    queryFn:()=>fetchPriorities(),
    queryKey:['priorities'],
    staleTime:Infinity
  })

  const {mutate:addTaskMutation} = useMutation({
    mutationFn:createTask,
    onError:(vars)=>{
      console.log(vars);
      dispatch({type:"setMessage",payload:{info:'Error al crear ticket',type:'error'}})
    },
    onSuccess:()=>{
      dispatch({type:"closeModal",payload:{info:'Ticket creado correctamente',type:'success'}})
      queryClient.invalidateQueries(['tasks'])
    }
  })

  const {mutate:updateTicketMutation} = useMutation({
    mutationFn:updateTicket,
    onError:(vars)=>{
      console.log(vars);
      dispatch({type:"setMessage",payload:{info:'Error al actualizar ticket',type:'error'}})
    },
    onSuccess:()=>{
      setTicket(null)
      dispatch({type:'closeModal',payload:{info:'Ticket actualizado correctamente',type:'success'}})
      queryClient.invalidateQueries(['tasks'])
    }
  })

  const onSubmit = handleSubmit((task)=>{
    if(state.modalMode =='create'){
      addTaskMutation({task})
    }
    if(state.modalMode =='update'){
      updateTicketMutation({id:activeTicket.id,data:task})
    }
  })

  const buttonText = state.modalMode =='create'?'Guardar':'Actualizar';


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

  useEffect(()=>{
    if(priorities && activeTicket){
      reset({...ticketDefaultValues(),priority:activeTicket.priority.id})
    }
  },[priorities,reset,activeTicket,ticketDefaultValues])


  return (
    <>
      <form action="" className={styles.form} onSubmit={onSubmit}>
        <section className={styles.detail}>
          <FormWrapper>
            <Input isRequired={true} element={'name'} register={register} setMinLength={2} setMaxLength={100} label={"Titulo"} type={"text"}/>
            {errors.name && <FormErrorMessage error={errors.name.message}/>}
          </FormWrapper>

          <FormWrapper>
            <TextArea register={register} element={'description'} setMaxLength={1000} label={'Descripción'}   />
            {errors.description && <FormErrorMessage error={errors.description.message}/>}
          </FormWrapper>

          <FormWrapper>
            <Input isRequired={true} label= {'Fecha de entrega'} type={'date'} element={'delivery'} register={register} isDate={true} validate={validateDate}/>
            {errors.delivery && <FormErrorMessage error={errors.delivery.message}/>}
          </FormWrapper>

          <FormWrapper>
            <Select register={register} label={'Prioridad'} isRequired={true} element={'priority'} options={priorities} />
            {errors.priority && <FormErrorMessage error={errors.priority.message}/>}
          </FormWrapper>
        </section>
        
        <section className={styles["buttons-container"]}>
          <Button type={"submit"} text={buttonText}><FontAwesomeIcon icon={faFloppyDisk}/></Button>
        </section>
      </form>


    </>
  );
};
