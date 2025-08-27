import { useContext } from "react"
import { ValueTicketsContext } from "../../Context/TicketContext"
import {formatDate} from "../../utils/functions"
import { Detail } from "../Detail/Detail"
import { Badge } from "../Badge/Badge"
import { Button } from "../Button/Button"
import styles from './Info.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { SetGlobalContext, ValueGlobalContext } from "../../Context/GlobalContext"
import { ModalDecision } from "../ModalDecision/ModalDecision"

export const Info = ()=>{

    const dispatch = useContext(SetGlobalContext)
    const state = useContext(ValueGlobalContext)
    const {ticket} = useContext(ValueTicketsContext)

    const handleDeleteTicket = ()=>{
        dispatch({type:'openConfirmModal',payload:'Deseas eliminar el ticket'})
    }

    const  handleUpdateTicket = ()=>{
        dispatch({type:'updateModal'})
    }

    return(
        <>
            <div className={styles["info-container"]}>
                <Detail title={"Titulo"} value={ticket.name}/>
                <Detail title={"Descripción"} value={ticket.description}/>
                <Detail title={"fecha"} value={formatDate(ticket.delivery)}/>
                <Detail title={"prioridad"}> <Badge type={ticket.priority.name}/></Detail>
            </div>
            <div className={styles["buttons-container"]}>
                <Button handleClick={handleDeleteTicket} text={"Eliminar"}><FontAwesomeIcon icon={faTrash}/> </Button>
                <Button handleClick={handleUpdateTicket} text={"Actualizar"}><FontAwesomeIcon icon={faPen}/> </Button>
            </div>

            {state.isConfirmModalOpen &&(<ModalDecision/>)}
        </>
    )
}