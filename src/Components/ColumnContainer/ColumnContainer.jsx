import React, { useState } from "react"
import { DndContext, DragOverlay ,PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import { Column } from "../Column/Column"
import { COLUMNS } from "../../utils/constants"
import { Card } from "../Card/Card"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTasks, updateStatus } from "../../api/tasks"
import { ModalMessage } from "../ModalMessage/ModalMessage"
import { fetchStatus } from "../../api/status"



export const ColumnContainer = React.memo(() => {
  //active task setted by handleDragStart for DragOverlay 
  const [activeTask, setActiveTask] = useState(null)
  const queryClient = useQueryClient()

  const [message,setMessage] = useState(null);
  
  const {data:tasks,isLoading,isError,error} = useQuery({
    queryFn: ()=>fetchTasks(),
    queryKey:['tasks']
  })

  const {data:status2} = useQuery({
    queryFn:()=> fetchStatus(),
    queryKey:['status'],
  })

  const {mutate:addTaskMutation} = useMutation({
    mutationFn: updateStatus, 
    onError:(vars)=>{
      console.log(vars);
      setMessage({info:'Error al actualizar status de tarjeta',type:'error'})
    },
    onSuccess:()=>{
      setMessage({info:'Estatus de tarjeta actualizado',type:'success'})
      queryClient.invalidateQueries(['tasks'])
    },
    onSettled:()=>{
      queryClient.invalidateQueries(['tasks'])
    }
  })

  const handleDragStart = (event) => {
    //draggable element
    const { active } = event
    const dragged = tasks.find(t => t.id === active.id)
    setActiveTask(dragged)
    setMessage(null)
  }


  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // move 5px to activate drag
    },
  })
);

  const handleDragEnd = (event) => {
    //active is the active card (set by useDraggable in Card Component)
    //over is the droppable area (set by useDroppable in Column Component)
    const { active, over } = event
    //if card is not over a droppable area, return 
    if (!over) {
      setActiveTask(null)
      return
    }

    // if the id of the area(Column)(droppable element) where you drop your card
    // is different from the statusId of the card(Card)(draggable element) 
    // then change the statusId of the card
    if(over.id !== active.data.current.statusId){ 
      try{
        const tempObj ={
          name:over.id
        }
        queryClient.setQueryData(['tasks'],(old)=>{
          return old.map((task)=>task.id==active.id?{...task,status:{...task.status,name:over.id}}:task)
        })

         addTaskMutation({id:active.id,data:tempObj})
      }catch(e){
          console.log(e);
      }
    }
    setActiveTask(null)
  }

   //DragOverlay current draggable element 
   
   //TODO: manejar mejor el loading
   if (isLoading){
    return <p>loading..</p>
   }


   //TODO: manejar bien error
   if(isError){
    return <p>{error.message}</p>
   }


  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} autoScroll={false}>
      <>
      {console.log(status2)}
        {COLUMNS.map((col) => (
          <Column
          key={col.statusId}
          column={col}
          activeTask={activeTask}
          tasks={tasks.filter(task => task.status.name === col.statusId)}
          />
        ))}

        {message && (<ModalMessage message={message.info} onClose={()=>setMessage(null)} type={message.type}/>)}
      </>

    
       
      <DragOverlay>
        {activeTask ? <Card task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  )
})
