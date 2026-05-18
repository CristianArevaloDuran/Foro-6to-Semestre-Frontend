'use client';

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
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
    }

    // New forum handler

    const [status, setStatus] = useState('idle');
    const nameRef = useRef(null);
    const descRef = useRef(null);

    const handleNewForum = async (e) => {
        e.preventDefault();

        setStatus('loading');

        const data = {
            name: nameRef.current.value,
            description: descRef.current.value
        }

        const token = Cookies.get('session');

        try {
            const response = await fetch(`${API_URL}/create-forum`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatus('success');
                nameRef.current.value = '';
                descRef.current.value = '';
                setTimeout(()=>{
                    setStatus('idle');
                    setIsVisible(false);
                    window.location.reload();
                }, 1000)
            }
        } catch(err) {
            setMessage(err);
        }
        
    }

    return(
        <div ref={newForumRef} className="new-forum"> 
            {
                isVisible && (
                    <div className="new-forum-form">
                        <form ref={formRef} onSubmit={(e)=>handleNewForum(e)}>
                            <div className="title">
                                <h2>Crea un nuevo foro de discusión</h2>
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="name">Nombre</label>
                                <input ref={nameRef} required type="text" id="name" placeholder="Nombre" />
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="description">Descripción</label>
                                <textarea ref={descRef} required type="text" id="description" placeholder="Nombre" />
                            </div>
                            <AuthButton content={'Crear'} status={status}/>
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