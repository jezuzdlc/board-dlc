import { createContext, useMemo, useState } from "react";

export const ValueTicketsContext = createContext(null);
export const SetTicketsContext = createContext(null);

export const TicketContextProvider = ({children})=>{
    
    const [ticket,setTicket] = useState(null)
    const [search,setSearch] = useState("")
    //const [activeTikcet,setActiveTicket] = useState(null)

    const value = useMemo(()=>({search,ticket}),[ticket,search])

    const functions = useMemo(()=>({setTicket,setSearch}),[setTicket,setSearch])

    return (
        <ValueTicketsContext.Provider value={value}>
            <SetTicketsContext.Provider value={functions}>
                {children}
            </SetTicketsContext.Provider>
        </ValueTicketsContext.Provider>
    )
}