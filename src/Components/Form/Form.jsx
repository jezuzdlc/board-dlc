import { Button } from "../Layout/Button/Button";
import styles from "./Form.module.css";
import { useForm } from "react-hook-form";

export const Form = () => {
 
  const {register} = useForm()

  return (

      <form action="" className={styles.form}>
        <section className={styles.detail}>
          <div className={styles["input-container"]}>
            <label htmlFor="">titulo:</label>
            <input type="text" placeholder="enter title" {...register("title")}/>
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="">descripcion:</label>
            <textarea placeholder="enter description" rows={3} {...register("description")}/>
          </div>
          <div className={styles["input-container"]}>
            <label htmlFor="">fecha:</label>
            <input type="date" {...register("date")}/>
          </div>
        <div className={styles["input-container"]}>
            <label htmlFor="">Priority:</label>
            <select name="priority" id="priority" {...register("priority")}>
                <option id="priority" value="low">low</option>
                <option id="priority" value="medium">medium</option>
                <option id="priority" value="high">high</option>
            </select>
          </div>
        </section>
        
        <section className={styles["buttons-container"]}>
          <Button type={"button"} text={"Cancelar"}></Button>
          <Button type={"submit"} text={"Guardar"}></Button>
        </section>
      </form>
  );
};
