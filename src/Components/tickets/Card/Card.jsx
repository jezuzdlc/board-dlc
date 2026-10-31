import { Badge } from "../../common/Badge/Badge"
import styles from "./Card.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag} from "@fortawesome/free-regular-svg-icons"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import React, { useContext } from "react"
import { SetGlobalContext } from "../../../Context/GlobalContext"
import { formatedCardDate } from "../../../utils/functions"
import { SetTicketsContext } from "../../../Context/TicketContext"

export const Card = React.memo(({ ticket }) => {

  const dispatch = useContext(SetGlobalContext)
  const {setTicket} = useContext(SetTicketsContext)


  const handleSetForm = ()=>{
    //e.stopPropagation(); // Evita que el evento de clic se propague
    setTicket(ticket)
    dispatch({type:"viewModal"})
  }

  const descReduc = ticket.description.length <= 100? ticket.description : ticket.description.slice(0,100)+"...";
  const titReduc = ticket.name.length <=60? ticket.name : ticket.name.slice(0,60)+'...';


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
          <p className={styles.date}>{formatedCardDate(ticket.delivery)}</p>
        </div>
        <Badge type={ticket.priority.name} />
      </div>
   
    </>
  )
})
