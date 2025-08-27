import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext } from "react";
import { SetGlobalContext,ValueGlobalContext } from "../../Context/GlobalContext";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useKey } from "../../hooks/useKey";
import { SetTicketsContext } from "../../Context/TicketContext";

export const Modal = ({children}) => {
  const dispatch = useContext(SetGlobalContext);
  const setTask = useContext(SetTicketsContext)
  const {modalMode} = useContext(ValueGlobalContext);

  const handleCloseForm = () => {
    //setActiveForm(false);
    setTask(null)
    dispatch({type:"closeModal"})
  };

  const handleEscPress = useCallback(()=>{
    setTask(null)
    dispatch({type:"closeModal"})
  },[dispatch,setTask])

  useKey('Escape',handleEscPress)

  //TODO: cambiar div por boton
  return (
    <div className={ modalMode == 'view'?styles["modal-view-container"]:styles["modal-generate-container"]}>

      <div className={styles.header}>
        <h2>
          {modalMode=='view' && 'Información de la ticket'}
          {modalMode=='create' && 'Crear ticket'}
          {modalMode=='update' && 'Actualizar ticket'}
        </h2>
        <div className={styles.close} onClick={handleCloseForm}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </div>
      </div>

      <div className={styles["modal-content-container"]}>
        {children}
      </div>
      
      
    </div>
  );
};
