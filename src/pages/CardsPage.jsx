import { Column } from "../Components/Column/Column"
import styles from './CardsPage.module.css'

export const CardsPage = ()=>{
    return(
        <main className={styles.main}>
            <Column title={'nueva'} tag={'new'}/>
            <Column title={'en proceso'} tag={'process'}/>
            <Column title={'completada'} tag={'completed'}/>
            <Column title={'cancelada'} tag={'canceled'}/>
        </main>
    )
}