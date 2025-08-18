import { useEffect, useState } from 'react';
import styles from './ModalMessage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export const ModalMessage = ({message,onClose,type})=>{
      const [desapareciendo, setDesapareciendo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDesapareciendo(true); // Inicia la animación de salida
      setTimeout(onClose, 500); // Espera a que termine la animación
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);


    return (
      <>
      {type=='error' &&(
        <div className={`${styles.message}  ${styles.error} ${desapareciendo ? styles['fade-out'] : styles['fade-in']}`}>
            <FontAwesomeIcon icon={faCircleExclamation} size='1x'/>
            <p>{message}</p>
        </div>
      )}
      {type=='success' &&(
        <div className={`${styles.message} ${styles.success} ${desapareciendo ? styles['fade-out'] : styles['fade-in']}`}>
            <FontAwesomeIcon icon={faCheck} size='1x'/>
            <p>{message}</p>
        </div>
      )}
      </>


    )
}