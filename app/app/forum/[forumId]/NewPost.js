'use client';

import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import AuthButton from "@/app/components/AuthButton/AuthButton";
import { ICONS } from "@/app/lib/constants";

export default function NewPost({ API_URL, forumId, setMessage }) {
    const formRef = useRef(null);
    const newPostRef = useRef(null);
    const contentRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (newPostRef.current && !newPostRef.current.contains(e.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const openForm = () => {
        setIsVisible((prev) => !prev);
    };

    const handleNewPost = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const data = {
            forumId,
            content: contentRef.current.value
        };

        const token = Cookies.get('session');

        try {
            const response = await fetch(`${API_URL}/create-post`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatus('success');
                contentRef.current.value = '';

                setTimeout(() => {
                    setStatus('idle');
                    setIsVisible(false);
                    window.location.reload();
                }, 1000);
                return;
            }

            const result = await response.json().catch(() => ({}));
            setMessage(result.message || 'No se pudo crear el post');
            setStatus('error');
        } catch (err) {
            setMessage('Error al crear el post');
            setStatus('error');
        }
    };

    return (
        <div ref={newPostRef} className="new-post">
            {
                isVisible && (
                    <div className="new-post-form">
                        <form ref={formRef} onSubmit={handleNewPost}>
                            <div className="title">
                                <h2>Publica un nuevo post</h2>
                            </div>
                            <div className="input-wrap">
                                <label htmlFor="post-content">Contenido</label>
                                <textarea ref={contentRef} required id="post-content" placeholder="Escribe tu post" />
                            </div>
                            <AuthButton content={'Publicar'} status={status} />
                        </form>
                    </div>
                )
            }

            <button className="new-post-button" onClick={openForm}>
                <p>Nuevo post</p>
                <ICONS.PLUS />
            </button>
        </div>
    );
}