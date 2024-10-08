import {useCallback, useState, useEffect} from "react";
import Portal from "../../providers/Portal";
import styles from './Modal.module.scss'

const Modal = (props) => {
    const { children, isOpen, onClose } = props

    const [isMounted, setIsMounted] = useState(false);

    const closeHandler = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose])

    const onContentClick = useCallback((e)  => {
        e.stopPropagation();
    },[])

    const onKeydown = useCallback((e) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKeydown)
        }

        return () => {document.removeEventListener('keydown', onKeydown)}
    }, [isOpen, onKeydown])

    return <Portal>
        <div className={styles.modal + (isOpen ? " " + styles.open : "")}>
            <div className={styles.overlay} onClick={closeHandler}>
                <div className={styles.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </div>
    </Portal>
}

export default Modal;