import styles from './Nav.module.css'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {Button} from '../../Components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useKey } from '../../hooks/useKey'
import { SetGlobalContext } from '../../Context/GlobalContext'
import { SetTicketsContext, ValueTicketsContext } from '../../Context/TicketContext'
import { useDebounce } from '../../hooks/useDebounce'

export const Nav = ()=>{

    const dispatch = useContext(SetGlobalContext)
    const {setSearch} = useContext(SetTicketsContext)
    
    const [text,setText] = useState("")
    const debounced = useDebounce(text)

    useEffect(()=>{
        console.log(debounced);
        console.log('entr a');
        setSearch(debounced)
    },[debounced,setSearch])


    const inpEl = useRef(null)

    const handleQuery =(e)=>{
        setText(e.target.value)
    }

    const handleKeyPress = useCallback(()=>{
        if(document.activeElement === inpEl.current)return
        inpEl.current.focus();
    },[])

    const handleExitSearch = useCallback(()=>{
        if(document.activeElement == inpEl.current){
            inpEl.current.blur()
            setSearch("")
        }
    },[setSearch])

    useKey('Escape',handleExitSearch)
    useKey('KeyK',handleKeyPress,true)

    const handleClick = (e)=>{
        e.preventDefault()
        dispatch({type:"createModal"})
    } 

    return(
        <nav className={styles["main-nav"]}>
            <input className={styles.input} onChange={handleQuery} value={text} ref={inpEl} type="text" placeholder='presiona ⌘ + K para buscar tarea'/>
            <Button text={"crear tarea"} handleClick={handleClick}><FontAwesomeIcon icon={faPlus} /></Button>
        </nav>
    )
}