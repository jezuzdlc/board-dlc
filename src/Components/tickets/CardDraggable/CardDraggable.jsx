import { useDraggable } from "@dnd-kit/core"
import styles from "./CardDraggable.module.css"
import { Card } from "../Card/Card"

export const CardDragable = ({ ticket,isDragging}) => {

  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: ticket.id,
    data:{
      statusId:ticket.status.id
    }
  })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    opacity:isDragging?0:1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.card}
    >
        <Card ticket={ticket}/>
    </div>
  )
}
