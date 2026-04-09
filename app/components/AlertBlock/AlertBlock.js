'use client';

import { useEffect, useRef, useState } from "react";
import { ICONS } from "@/app/lib/constants";
import gsap from "gsap";

export default function AlertBlock({title, message, open, onClose}) {

    const [isOpen, setIsOpen] = useState(open);
    const [timer, setTimer] = useState(0);
    const alertRef = useRef(null);

    useEffect(()=> {
        if(open) {
            setIsOpen(open);
            setTimer(4000);
        }
        
        if (isOpen && alertRef.current) {
            gsap.from(alertRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'back.out'
            })
        }
    }, [open, isOpen])

    useEffect(() => {
        if (!isOpen || timer <= 0) return;

        const timeoutId = setTimeout(() => {
            handleClose();
        }, timer);

        return () => clearTimeout(timeoutId);
    }, [isOpen, timer]);

    const handleClose = () => {
        if(!alertRef.current) {
            setIsOpen(false);
            onClose?.();
            return;
        }

        gsap.to(alertRef.current, {
            y:100,
            opacity: 0,
            ease: 'back.in',
            onComplete: () => {
                setIsOpen(false);
                onClose?.();
            }
        })
    }
    
    if(!message || !isOpen) return null;

    return (
        <div className="alert-block" ref={alertRef}>
            <div className="closing-button" onClick={handleClose}>
                <ICONS.CLOSEX />
            </div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    )
}