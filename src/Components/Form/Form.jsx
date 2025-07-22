import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";

export const Form = () => {
 
  const {register,handleSubmit} = useForm()

  const onSubmit = handleSubmit((data)=>{
    console.log(data);
  })

  return (

      <form action="" className={styles.form} onSubmit={onSubmit}>
        <section className={styles.detail}>
          <div className={styles["input-container"]}>
            <label htmlFor="">titulo:</label>
            <input type="text" placeholder="enter title" {...register("title",{required:true})}/>
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
          <Button type={"submit"} text={"Guardar"}><FontAwesomeIcon icon={faFloppyDisk}/></Button>
        </section>
      </form>
  );
};
