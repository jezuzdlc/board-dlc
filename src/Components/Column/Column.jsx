import { useDroppable } from "@dnd-kit/core"
import { Card } from '../Card/Card'
import styles from './Column.module.css'
import React from "react"
import { CardDragable } from "../CardDraggable/CardDraggable";

export const Column = React.memo(({ column, tasks,activeTask}) => {
  const tagLower = "title-"+column.name.toLowerCase()
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      statusId: column.id
    }
  })

  return (
    <div ref={setNodeRef}  className={styles["column-container"]}>
      
      <div className={styles["title-container"]}>
        <div className={`${styles["title-color"]} ${styles[tagLower]}`}></div>
        <h2 className={styles["title-text"]}>{column.name}</h2>
      </div>

      <div className={styles["card-container"]}>
        {tasks?.map(task => (
          <CardDragable key={task.id} 
          task={task} 
          isDragging={activeTask?.id === task.id}
          />
        ))}
      </div>
    </div>
  )
});
