import { useContext } from "react"
import { ColumnContainer } from "../../Components/ColumnContainer/ColumnContainer"
import styles from './CardsPage.module.css'
import { ValueCardsContext } from "../../Context/CardsContext"
import { Modal } from "../../Components/Modal/Modal"
import { Overlay } from "../../Components/Overlay/Overlay"
import { Info } from "../../Components/Info/Info"

export const CardsPage = () => {
  const state = useContext(ValueCardsContext)

  return (
    <>
      {state.isModalOpen && (
        <Overlay>
          <Modal>{state.modalMode=='view' && <Info/>}</Modal>
        </Overlay>
        )}
      <main className={styles.main}>
        <ColumnContainer />
      </main>
    </>
  )
}
