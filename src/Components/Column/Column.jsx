import { useDroppable } from "@dnd-kit/core"
import { Card } from '../Card/Card'
import styles from './Column.module.css'
import React from "react"

export const Column = React.memo(({ column, tasks}) => {
  const tagLower = "title-"+column.statusId.toLowerCase()

  const { setNodeRef } = useDroppable({
    id: column.statusId,
    data: {
      statusId: column.statusId
    }
  })

  return (
    <div className={styles["column-container"]}>
      
      <div className={styles["title-container"]}>
        <div className={`${styles["title-color"]} ${styles[tagLower]}`}></div>
        <h2 className={styles["title-text"]}>{column.name}</h2>
      </div>

      <div ref={setNodeRef} className={styles["card-container"]}>
        {tasks.map(task => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
})
