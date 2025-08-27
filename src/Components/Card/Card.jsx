import { Badge } from "../Badge/Badge"
import styles from "./Card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag} from "@fortawesome/free-regular-svg-icons"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import React, { useContext } from "react"
import { SetGlobalContext } from "../../Context/GlobalContext"
import { formatedCardDate } from "../../utils/functions"
import { SetTicketsContext } from "../../Context/TicketContext"

export const Card = React.memo(({ task}) => {

  const dispatch = useContext(SetGlobalContext)
  const {setTicket} = useContext(SetTicketsContext)


  const handleSetForm = ()=>{
    //e.stopPropagation(); // Evita que el evento de clic se propague
    setTicket(task)
    dispatch({type:"viewModal"})
  }

  const descReduc = task.description.length <= 100? task.description : task.description.slice(0,100)+"...";
  const titReduc = task.name.length <=60? task.name : task.name.slice(0,60)+'...';


  return (
    <>

      <div className={styles["title-container"]}>
        <h3 className={styles.title}>{titReduc}</h3>
        <div className={styles.detail} onClick={handleSetForm}>
        <FontAwesomeIcon icon={faEllipsis} size="2x"/>
        </div>
      </div>
        <p className={styles.description}>{descReduc}</p>

      <div className={styles["info-container"]}>
        <div className={styles["date-container"]}>
          <FontAwesomeIcon icon={faFlag} size="xl"/>
          <p className={styles.date}>{formatedCardDate(task.delivery)}</p>
        </div>
        <Badge type={task.priority.name} />
      </div>
   
    </>
  )
})
