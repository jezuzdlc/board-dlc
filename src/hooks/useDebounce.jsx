import { useEffect, useState } from "react"

export const useDebounce = (value,delay=2000)=>{
    const [debounced,setDebounced]= useState(value)

    useEffect(()=>{
        const handler = setTimeout(() => {
            console.log('se seteo');
            setDebounced(value)
        }, delay);
        return ()=>clearTimeout(handler)
    },[value,delay])

    return debounced
}