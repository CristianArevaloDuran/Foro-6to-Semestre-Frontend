'use client';

import { useEffect, useRef, useState } from "react";
import { ICONS } from "../lib/constants";
import AuthButton from "../components/AuthButton/AuthButton";

export default function NewForum({API_URL, setMessage}) {
    
    const formRef = useRef(null);
    const newForumRef = useRef(null);


    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(newForumRef.current && !newForumRef.current.contains(e.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
    }, [])

    const openForm = () => {
        setIsVisible((prev) => !prev);
        setMessage('Hola')
    }

    return(
        <div ref={newForumRef} className="new-forum"> 
            {
                isVisible && (
                    <div className="new-forum-form">
                        <form ref={formRef}>
                            <div className="title">
                                <h2>Crea un nuevo foro de discusión</h2>
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="name">Nombre</label>
                                <input required type="text" id="name" placeholder="Nombre" />
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="description">Descripción</label>
                                <textarea required type="text" id="description" placeholder="Nombre" />
                            </div>
                            <AuthButton content={'Crear'} status={'idle'}/>
                        </form>
                    </div> 
                )
            }

            <button className="new-forum-button" onClick={openForm}>
                <p>Nuevo foro</p>
                <ICONS.PLUS />
            </button>
        </div>
    )
}