import { createContext, useReducer } from "react";

export const ValueGlobalContext = createContext(null);
export const SetGlobalContext = createContext(null);


const initialState = {
    isModalOpen:false,
    modalMode:"close",
    isConfirmModalOpen:false,
    message:null,
    modalConfirmText:null
}
//TODO: cambiar cases igual al modalMode
const reducer = (state,action)=>{
    switch(action.type){
        case "viewModal":{
            return{...state,isModalOpen:true,modalMode:"view",message:null}
        }
        case "createModal":{
            return {...state,isModalOpen:true,modalMode:"create",message:null}
        }
        case "updateModal":{
            return {...state,isModalOpen:true,modalMode:"update",message:null}
        }
        case "closeModal":{
            return{...state,isModalOpen:false,modalMode:"close",isConfirmModalOpen:false,modalConfirmText:null,message:action.payload?action.payload:null}
        }
        case "setMessage":{
            return {...state,message:action.payload}
        }
        case "clearMessage":{
            return{...state,message:null}
        }
        case "openConfirmModal":{
            return{...state,isConfirmModalOpen:true,modalConfirmText:action.payload,message:null}
        }
        case "closeConfirmModal":{
            return{...state,isConfirmModalOpen:false,modalConfirmText:null,message:action.payload?action.payload:null}
        }
    }
}

export const GlobalContextProvider = ({children})=>{
    
    const [state,dispatch] = useReducer(reducer,initialState)


    return (
        <ValueGlobalContext.Provider value={state}>
        <SetGlobalContext.Provider value={dispatch}>
                {children}
        </SetGlobalContext.Provider>
        </ValueGlobalContext.Provider>
    )
}