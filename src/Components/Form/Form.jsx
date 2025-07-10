import styles from "./FormCard.module.css";
export const Form = () => {
 

  return (
    <div className={styles["form-container"]}>

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
