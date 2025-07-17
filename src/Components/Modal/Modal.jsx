import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext } from "react";
import { SetCardsContext, ValueCardsContext } from "../../Context/CardsContext";
import { Info } from "../Info/Info";
import { Button } from "../Layout/Button/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useKey } from "../../hooks/useKey";

export const Modal = ({children}) => {
  const dispatch = useContext(SetCardsContext);
  const {modalMode} = useContext(ValueCardsContext);

  const handleCloseForm = () => {
    //setActiveForm(false);
    dispatch({type:"closeModal"})
  };

  const handleEscPress = useCallback(()=>{
    dispatch({type:"closeModal"})
  },[dispatch])

  useKey('Escape',handleEscPress)

  //TODO: cambiar div por boton
  return (
    <div className={ modalMode == 'view'?styles["modal-view-container"]:styles["modal-generate-container"]}>

      <div className={styles.header}>
        <h2>
          {modalMode=='view' && 'Información de la tarea'}
          {modalMode=='create' && 'Crear tarea'}
          {modalMode=='edit' && 'Actualizar tarea'}
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
