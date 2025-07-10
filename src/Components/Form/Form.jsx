import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "./FormCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SetCardsContext, ValueCardsContext } from "../../Context/CardsContext";

export const Form = () => {
  const dispatch = useContext(SetCardsContext);
  const state = useContext(ValueCardsContext);

  const handleCloseForm = () => {
    //setActiveForm(false);
    dispatch({type:"closeModal"})
  };

  return (
    <div className={styles["form-container"]}>
      
      <div className={styles.header}>
        <h2>Información de la tarjeta</h2>
        <div className={styles.close} onClick={handleCloseForm}>
          <FontAwesomeIcon icon={faCircleXmark} size="2x" />
        </div>
      </div>

      <form action="" className={styles.form}>
        <section className={styles.detail}>
          <div className={styles["input-container"]}>
            <label htmlFor="">titulo:</label>
            <input type="text" placeholder="enter title"/>
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="">descripcion:</label>
            <textarea placeholder="enter description" rows={3}/>
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="">fecha:</label>
            <input type="date" />
          </div>
        <div className={styles["input-container"]}>
            <label htmlFor="">Priority:</label>
            <select name="" id="">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
          </div>
        </section>
        
        <section className={styles.buttons}>
            <button type="button" className={styles.button}>Cancelar</button>
            <button type="button" className={styles.button}>Guardar Cambios</button>
        </section>
      </form>
    </div>
  );
};
