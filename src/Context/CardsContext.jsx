import { createContext, useMemo, useReducer, useState } from "react";
import { initialData } from "../utils/constants"; 

export const ValueCardsContext = createContext(null);
export const SetCardsContext = createContext(null);
export const CardsContext = createContext(null)


const initialState = {
    isModalOpen:false,
    activeTask:null,
    modalMode:"close"
}
//TODO: cambiar cases igual al modalMode
const reducer = (state,action)=>{
    switch(action.type){
        case "viewModal":{
            return{...state,isModalOpen:true,modalMode:"view",activeTask:action.payload}
        }
        case "createModal":{
            return {...state,isModalOpen:true,modalMode:"create"}
        }
        case "closeModal":{
            return{...state,isModalOpen:false,activeTask:null,modalMode:"close"}
        }
    }
}

export const CardsContextProvider = ({children})=>{
    //const [activeForm,setActiveForm] = useState(false);
    //const [activeTask,setActiveTask]= useState(null);
    
    const [state,dispatch] = useReducer(reducer,initialState)
    const [tasks, setTasks] = useState(initialData)


    /*const setters = useMemo(()=>{
        return{
        setActiveTask,
        setActiveForm,
        }
    },[])*/

    /*const values = useMemo(()=>{
        return{
            activeForm,
            activeTask
        }
    },[activeTask,activeForm])*/

    const taskValues = useMemo(()=>{
        return{
        tasks,
        setTasks
        }
    },[tasks])

    return (
        <CardsContext.Provider value={taskValues}>
        <ValueCardsContext.Provider value={state}>
        <SetCardsContext.Provider value={dispatch}>
                {children}
        </SetCardsContext.Provider>
        </ValueCardsContext.Provider>
        </CardsContext.Provider>
    )
}