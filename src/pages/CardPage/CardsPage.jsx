import { useContext } from "react"
import { ColumnContainer } from "../../Components/ColumnContainer/ColumnContainer"
import styles from './CardsPage.module.css'
import { ValueCardsContext } from "../../Context/CardsContext"
import { Modal } from "../../Components/Modal/Modal"
import { Overlay } from "../../Components/Overlay/Overlay"
import { Info } from "../../Components/Info/Info"
import { Form } from "../../Components/Form/Form"


export const CardsPage = () => {
  const state = useContext(ValueCardsContext)

  return (
    <>
      {state.isModalOpen && (
        <Overlay>
          <Modal>
            {state.modalMode=='view' && <Info/>}
            {state.modalMode=='create' && <Form/>}
            {state.modalMode=='edit' && <Info/>}
          </Modal>
        </Overlay>
        )}
      <div className={styles.main}>
        <ColumnContainer />
      </div>
    </>
  )
}
