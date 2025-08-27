import { createContext, useMemo, useState } from "react";

export const ValueTicketsContext = createContext(null);
export const SetTicketsContext = createContext(null);

export const TicketContextProvider = ({children})=>{
    
    const [ticket,setTicket] = useState(null)
    //const [activeTikcet,setActiveTicket] = useState(null)

    const value = useMemo(()=>ticket,[ticket])

    const functions = useMemo(()=>setTicket,[setTicket])

    return (
        <ValueTicketsContext.Provider value={value}>
            <SetTicketsContext.Provider value={functions}>
                {children}
            </SetTicketsContext.Provider>
        </ValueTicketsContext.Provider>
    )
}