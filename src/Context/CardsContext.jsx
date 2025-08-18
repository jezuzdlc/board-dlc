import { createContext, useReducer } from "react";

export const ValueCardsContext = createContext(null);
export const SetCardsContext = createContext(null);


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
    
    const [state,dispatch] = useReducer(reducer,initialState)


    return (
        <ValueCardsContext.Provider value={state}>
        <SetCardsContext.Provider value={dispatch}>
                {children}
        </SetCardsContext.Provider>
        </ValueCardsContext.Provider>
    )
}