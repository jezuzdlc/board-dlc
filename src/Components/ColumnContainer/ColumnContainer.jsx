import React, { useState } from "react"
import { DndContext, DragOverlay ,PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import { Column } from "../Column/Column"
import { initialData, COLUMNS } from "../../utils/constants"
import { Card } from "../Card/Card"
import styles from "./ColumnContainer.module.css"



export const ColumnContainer = React.memo(({setActiveForm}) => {
  const [tasks, setTasks] = useState(initialData)
  //active task setted by handleDragStart for DragOverlay 
  const [activeTask, setActiveTask] = useState(null)


  const handleDragStart = (event) => {
    //draggable element
    const { active } = event
    const dragged = tasks.find(t => t.id === active.id)
    setActiveTask(dragged)
  }


  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, // move 5px to activate drag
    },
  })
);

  const handleDragEnd = (event) => {
    //active is the active card (set by useDraggable in Card Component)
    //over is the droppable area (set by useDroppable in Column Component)
    const { active, over } = event
    //if card is not over a droppable area, return 
    if (!over) return

    // if the id of the area(Column)(droppable element) where you drop your card
    // is different from the statusId of the card(Card)(draggable element) 
    // then change the statusId of the card
    if(over.id !== active.data.current.statusId){

      const updated = tasks.map(t =>
        t.id === active.id ? { ...t, statusId: over.data.current?.statusId } : t
      )
      setTasks(updated)
    }
    setActiveTask(null)
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className={styles.main}>
        {COLUMNS.map((col) => (
          <Column
          key={col.statusId}
          column={col}
          setActiveForm={setActiveForm}
          tasks={tasks.filter(task => task.statusId === col.statusId)}
          />
        ))}
      </main>

        //current draggable element 
      <DragOverlay>
        {activeTask ? <Card task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  )
})
