import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import { useEffect, useRef } from 'react'
import {Button} from '../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const Nav = ()=>{
    const inpEl = useRef(null)
    useEffect(()=>{
        const handleKeyDown = (event)=>{
            const isMac = navigator.userAgentData?.platform === 'macOS';
            const cmdKey = isMac ? event.metaKey : event.ctrlKey;

            if(cmdKey && event.key.toLowerCase() == 'k'){
                event.preventDefault();
                inpEl.current.focus();      
                console.log('se presiono')
            }
        }
        document.addEventListener('keydown',handleKeyDown);
        return ()=>{
            document.removeEventListener('keydown',handleKeyDown)
        } 
    },[])

    return(
        <nav className={styles["main-nav"]}>
            <input className={styles.input} ref={inpEl} type="text" placeholder='presiona ⌘ + K para buscar tarea'/>
            <Button text={"crear tarea"}><FontAwesomeIcon icon={faPlus}/></Button>
        </nav>
    )
}