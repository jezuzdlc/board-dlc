import { Card } from '../Card/Card'
import  styles from './Column.module.css'

export const Column = ({title,tag})=>{
    return (
        <div className={styles["column-container"]}>
            <div className={styles["title-container"]}>
                <div className={`${styles["title-color"]} ${styles["title-"+tag]}`}></div>
                <h3 className={styles["title-text"]}>{title}</h3>
            </div>
            <div className={styles["card-container"]}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}