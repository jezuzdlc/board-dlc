import { createContext, useMemo, useState } from "react";
import { initialData } from "../utils/constants"; 

export const ValueCardsContext = createContext(null);
export const SetCardsContext = createContext(null);
export const CardsContext = createContext(null)

export const CardsContextProvider = ({children})=>{
    const [activeForm,setActiveForm] = useState(false);
    const [activeTask,setActiveTask]= useState(null);
    const [tasks, setTasks] = useState(initialData)

    const setters = useMemo(()=>{
        return{
        setActiveTask,
        setActiveForm,
        }
    },[])

    const taskValues = useMemo(()=>{
        return{
        tasks,
        setTasks
        }
    },[tasks])

    const values = useMemo(()=>{
        return{
            activeForm,
            activeTask
        }
    },[activeTask,activeForm])

    return (
        <CardsContext.Provider value={taskValues}>
        <ValueCardsContext.Provider value={values}>
        <SetCardsContext.Provider value={setters}>
                {children}
        </SetCardsContext.Provider>
        </ValueCardsContext.Provider>
        </CardsContext.Provider>
    )
}