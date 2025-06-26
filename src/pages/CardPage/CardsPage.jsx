import { useContext } from "react"
import { ColumnContainer } from "../../Components/ColumnContainer/ColumnContainer"
import { FormCard } from "../../Components/Form/FormCard"
import styles from './CardsPage.module.css'
import { ValueCardsContext } from "../../Context/CardsContext"

export const CardsPage = () => {
  const {activeForm} = useContext(ValueCardsContext)

  return (
  <main className={styles.main}>
  <ColumnContainer />
  {activeForm && (<FormCard/>)}
  </main>
  )
}
