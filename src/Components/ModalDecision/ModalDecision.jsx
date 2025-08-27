import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Overlay } from "../Overlay/Overlay";
import styles from "./ModalDecision.module.css";
import { deleteTicket } from "../../api/tasks";
import { useContext } from "react";
import { SetGlobalContext, ValueGlobalContext } from "../../Context/GlobalContext";
import {  faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";
import { SetTicketsContext, ValueTicketsContext } from "../../Context/TicketContext";

export const ModalDecision = () => {
  
    const dispatch = useContext(SetGlobalContext);
    const state = useContext(ValueGlobalContext);
    const {ticket} = useContext(ValueTicketsContext);
    const {setTicket} = useContext(SetTicketsContext)

  const queryClient = useQueryClient();

  const { mutate: deleteTicketMutation } = useMutation({
    mutationFn: deleteTicket,
    onError: (vars) => {
      console.log(vars);
      dispatch({
        type: "setMessage",
        payload: { info: "Error al eliminar ticket", type: "error" },
      });
    },
    onSuccess: () => {
        setTicket(null)
        dispatch({ type: "closeModal",payload: { info: "Ticket eliminado correctamente", type: "success" }});
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleDelete = ()=>{
    deleteTicketMutation({id:ticket.id})
  }

  const handleCancel = ()=>{
    dispatch({type:'closeConfirmModal'})
  }

  return (
    <>
      <Overlay>
        <div className={styles["modal-confirm-container"]}>
          <div className={styles.header}>
            <h2>Eliminar</h2>
            <div className={styles.close} onClick={handleCancel}> 
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </div>
          </div>

          <div className={styles["modal-content-container"]}>
            <div className={styles["info-container"]}>
                <p>¿{state.modalConfirmText}?</p>
            </div>
            <div className={styles["buttons-container"]}>
                <Button text={"Si"} handleClick={handleDelete}><FontAwesomeIcon icon={faCheck} /> </Button>
                <Button text={"No"} handleClick={handleCancel}><FontAwesomeIcon icon={faXmark} /> </Button>
            </div>
                
          </div>
        </div>
      </Overlay>
    </>
  );
};
