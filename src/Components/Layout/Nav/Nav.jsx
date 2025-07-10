import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import { useCallback, useRef, useState } from 'react'
import {Button} from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useKey } from '../../../hooks/useKey'

export const Nav = ()=>{
    const inpEl = useRef(null)
    const [query,setQuery] = useState("")

    const handleKeyPress = useCallback(()=>{
        if(document.activeElement === inpEl.current)return
        inpEl.current.focus();
    },[])

    const handleExitSearch = useCallback(()=>{
        if(document.activeElement == inpEl.current){
            inpEl.current.blur()
            setQuery("")
        }
    },[])

    const handleQuery =(e)=>{
        setQuery(e.target.value)
    }

    useKey('Escape',handleExitSearch)
    useKey('KeyK',handleKeyPress,true)

    return(
        <nav className={styles["main-nav"]}>
            <input className={styles.input} onChange={handleQuery} value={query} ref={inpEl} type="text" placeholder='presiona ⌘ + K para buscar tarea'/>
            <Button text={"crear tarea"}><FontAwesomeIcon icon={faPlus}/></Button>
        </nav>
    )
}