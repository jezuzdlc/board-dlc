import React, { useContext, useMemo, useState } from "react"
import { DndContext, DragOverlay ,PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import { Column } from "../Column/Column"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTickets, updateStatus } from "../../../api/tickets"
import { fetchStatus } from "../../../api/status"
import {SetGlobalContext} from '../../../Context/GlobalContext'
import { CardDragable } from "../CardDraggable/CardDraggable"
import { ValueTicketsContext } from "../../../Context/TicketContext"
import { Overlay } from "../../common/Overlay/Overlay"
import { Spinner } from "../../common/Spineer/Spinner"


export const ColumnContainer = React.memo(() => {

  const [activeTicket, setActiveTicket] = useState(null);
  const queryClient = useQueryClient();

  const dispatch = useContext(SetGlobalContext)
  const {search} = useContext(ValueTicketsContext)
  
  const {data:tickets,isLoading:isTicketLoading,isFetching,isError:isTicketError,error:ticketError} = useQuery({
    queryFn: ()=>fetchTickets(search),
    queryKey:['tickets',search],
  })

  const {data:status,isLoading:isStatusLoading,isError:isStatusError,error:statusError} = useQuery({
    queryFn:()=> fetchStatus(),
    queryKey:['status'],
    staleTime:Infinity
  })

  const ticketsByStatus = useMemo(() => {
    const map = new Map();
    status?.forEach(s => {
    map.set(s.id, tickets?.filter(t => t.status.id === s.id));
  });
  return map;
  }, [tickets, status]);

  //update ticket
  const {mutate:updateStatusMutation} = useMutation({
    mutationFn: updateStatus, 
    onError:(vars)=>{
      console.log(vars);
      dispatch({type:"setMessage",payload:{info:'Error al actualizar status de tarjeta',type:'error'}})
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['tickets',search])
      dispatch({type:"setMessage",payload:{info:'Estatus actualizado',type:'updated'}})
    }
  })


  const handleDragStart = (event) => {
    //draggable element
    const { active } = event
    const dragged = tickets.find(t => t.id === active.id)
    setActiveTicket(dragged)
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
      setActiveTicket(null)
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
        queryClient.setQueryData(['tickets',search],(old)=>{
          return old.map((ticket)=>ticket.id==active.id?{...ticket,status:{...ticket.status,id:over.id}}:ticket)
        })

         updateStatusMutation({id:active.id,data:tempObj})
      }catch(e){
          console.log(e);
      }
    }
    setActiveTicket(null)
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
   if(isTicketError){
    return <p>{ticketError.message}</p>
   }

  return (
    <>
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} autoScroll={false}>

        {status.map((col) => (
          <Column
          key={col.id}
          column={col}
          activeTicket={activeTicket}
          //tickets={tickets.filter(ticket => ticket.status.id === col.id)}
          tickets={ticketsByStatus.get(col.id)}
          />
        ))}
        {isTicketLoading || isFetching ? (<Overlay><Spinner/></Overlay>):null}
    

      <DragOverlay>
        {activeTicket ? <CardDragable ticket={activeTicket}/> : null}
      </DragOverlay>
    </DndContext>
    </>
  )
})
