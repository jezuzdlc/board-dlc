import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SetCardsContext } from "../../Context/CardsContext";
import { Info } from "../Info/Info";
import { Button } from "../Layout/Button/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const Modal = ({children}) => {
  const dispatch = useContext(SetCardsContext);

  const handleCloseForm = () => {
    //setActiveForm(false);
    dispatch({type:"closeModal"})
  };

  return (
    <div className={styles["modal-container"]}>

      <div className={styles.header}>
        <h2>Información de la tarjeta</h2>
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
