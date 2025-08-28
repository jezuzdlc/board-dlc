import React, { useContext, useMemo, useState } from "react"
import { DndContext, DragOverlay ,PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import { Column } from "../Column/Column"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTasks, updateStatus } from "../../api/tasks"
import { fetchStatus } from "../../api/status"
import {SetGlobalContext} from '../../Context/GlobalContext'
import { CardDragable } from "../CardDraggable/CardDraggable"
import { ValueTicketsContext } from "../../Context/TicketContext"
import { Overlay } from "../Overlay/Overlay"
import { Spinner } from "../Spineer/Spinner"


export const ColumnContainer = React.memo(() => {

  const [activeTask, setActiveTask] = useState(null);
  const queryClient = useQueryClient();

  const dispatch = useContext(SetGlobalContext)
  const {search} = useContext(ValueTicketsContext)
  
  const {data:tasks,isLoading:isTaskLoading,isFetching,isError:isTaskError,error:taskError} = useQuery({
    queryFn: ()=>fetchTasks(search),
    queryKey:['tasks',search],
  })

  const {data:status,isLoading:isStatusLoading,isError:isStatusError,error:statusError} = useQuery({
    queryFn:()=> fetchStatus(),
    queryKey:['status'],
    staleTime:Infinity
  })

  const tasksByStatus = useMemo(() => {
    const map = new Map();
    status?.forEach(s => {
    map.set(s.id, tasks?.filter(t => t.status.id === s.id));
  });
  return map;
  }, [tasks, status]);

  //update ticket
  const {mutate:updateStatusMutation} = useMutation({
    mutationFn: updateStatus, 
    onError:(vars)=>{
      console.log(vars);
      dispatch({type:"setMessage",payload:{info:'Error al actualizar status de tarjeta',type:'error'}})
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['tasks',search])
      dispatch({type:"setMessage",payload:{info:'Estatus actualizado',type:'updated'}})
    }
  })


  const handleDragStart = (event) => {
    //draggable element
    const { active } = event
    const dragged = tasks.find(t => t.id === active.id)
    setActiveTask(dragged)
    dispatch({type:'clearMessage'})
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
          id:over.id
        }
        queryClient.setQueryData(['tasks',search],(old)=>{
          return old.map((task)=>task.id==active.id?{...task,status:{...task.status,id:over.id}}:task)
        })

         updateStatusMutation({id:active.id,data:tempObj})
      }catch(e){
          console.log(e);
      }
    }
    setActiveTask(null)
  }

   //DragOverlay current draggable element 
   
   //TODO: manejar mejor el loading
   if (isStatusLoading){
    return <Overlay><Spinner/></Overlay>
   }

   //TODO: manejar bien error
   if(isStatusError){
    return <p>{statusError.message}</p>
   }

      //TODO: manejar bien error
   if(isTaskError){
    return <p>{taskError.message}</p>
   }

  return (
    <>
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} autoScroll={false}>

        {status.map((col) => (
          <Column
          key={col.id}
          column={col}
          activeTask={activeTask}
          //tasks={tasks.filter(task => task.status.id === col.id)}
          tasks={tasksByStatus.get(col.id)}
          />
        ))}
        {isTaskLoading || isFetching ? (<Overlay><Spinner/></Overlay>):null}
    

      <DragOverlay>
        {activeTask ? <CardDragable task={activeTask}/> : null}
      </DragOverlay>
    </DndContext>
    </>
  )
})
