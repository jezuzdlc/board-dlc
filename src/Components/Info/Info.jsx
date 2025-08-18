import { useContext } from "react"
import { ValueCardsContext } from "../../Context/CardsContext"
import {formatDate} from "../../utils/functions"
import { Detail } from "../Detail/Detail"
import { Badge } from "../Badge/Badge"
import { Button } from "../Button/Button"
import styles from './Info.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"

export const Info = ()=>{

    const {activeTask} = useContext(ValueCardsContext)

    return(
        <>
            <div className={styles["info-container"]}>
                <Detail title={"Titulo"} value={activeTask.name}/>
                <Detail title={"Descripción"} value={activeTask.description}/>
                <Detail title={"fecha"} value={formatDate(activeTask.date)}/>
                <Detail title={"prioridad"}> <Badge type={activeTask.priority.name}/></Detail>
            </div>
            <div className={styles["buttons-container"]}>
                <Button text={"Eliminar"}><FontAwesomeIcon icon={faTrash}/> </Button>
                <Button text={"Actualizar"}><FontAwesomeIcon icon={faPen}/> </Button>
            </div>
        </>
    )
}