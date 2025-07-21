import { useDraggable } from "@dnd-kit/core"
import { Badge } from "../Badge/Badge"
import styles from "./Card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag} from "@fortawesome/free-regular-svg-icons"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { SetCardsContext } from "../../Context/CardsContext"

export const Card = ({ task }) => {

  const dispatch = useContext(SetCardsContext)

  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: task.id,
    data:{
      statusId:task.statusId
    }
  })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition
  }

  const handleSetForm = ()=>{
    //e.stopPropagation(); // Evita que el evento de clic se propague
    //setActiveForm(true)
    //setActiveTask(task)
    dispatch({type:"viewModal",payload:task})
  }

  const descReduc = task.description.length <= 40? task.description : task.description.slice(0,40)+"...";
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.card}
    >
      <div className={styles["title-container"]}>
        <h3 className={styles.title}>{task.name}</h3>
        <div className={styles.detail} onClick={handleSetForm}>
        <FontAwesomeIcon icon={faEllipsis} size="2x"/>
        </div>
      </div>
        <p className={styles.description}>{descReduc}</p>

      <div className={styles["info-container"]}>
        <div className={styles["date-container"]}>
          <FontAwesomeIcon icon={faFlag} size="xl"/>
          <p className={styles.date}>{task.date}</p>
        </div>
        <Badge type={task.priority} />
      </div>
   
    </div>
  )
}
