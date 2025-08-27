import React, { useContext } from "react"
import { ColumnContainer } from "../../Components/ColumnContainer/ColumnContainer"
import styles from './CardsPage.module.css'
import { ValueGlobalContext } from "../../Context/GlobalContext"
import { Modal } from "../../Components/Modal/Modal"
import { Overlay } from "../../Components/Overlay/Overlay"
import { Info } from "../../Components/Info/Info"
import { Form } from "../../Components/Form/Form"
import { ModalMessage } from "../../Components/ModalMessage/ModalMessage"


export const CardsPage = React.memo(() => {
  const state = useContext(ValueGlobalContext)

  return (
    <>
      {state.isModalOpen && (
        <Overlay>
          <Modal>
            {state.modalMode=='view' && <Info/>}
            {state.modalMode=='create' && <Form/>}
            {state.modalMode=='update' && <Form/>}
          </Modal>
        </Overlay>
        )}
      <div className={styles.main}>
        <ColumnContainer /> 
        {state.message && (<ModalMessage message={state.message.info} type={state.message.type} />)}
      </div>
    </>
  )
});
