import { useDraggable } from "@dnd-kit/core"
import { Badge } from "../UI/Badge/Badge"
import styles from "./Card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag} from "@fortawesome/free-regular-svg-icons"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { SetCardsContext } from "../../Context/CardsContext"

export const Card = ({ task }) => {

  const {setActiveForm,setActiveTask} = useContext(SetCardsContext)

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

  const handleSetForm = (e)=>{
    //e.stopPropagation(); // Evita que el evento de clic se propague
    setActiveForm(true)
    setActiveTask(task)
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
        <FontAwesomeIcon icon={faCircleInfo} size="2x"/>
        </div>
      </div>
        <p className={styles.description}>{descReduc}</p>

      <div className={styles["info-container"]}>
        <div className={styles["date-container"]}>
          <FontAwesomeIcon icon={faFlag} size="xl"/>
          <p className={styles.date}>10/12/24</p>
        </div>
        <Badge type={task.priority} />
      </div>
   
    </div>
  )
}
