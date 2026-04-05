import { ICONS } from '@/app/lib/constants';
import './AuthButton.css'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function AuthButton({status, content}) {

    const buttonRef = useRef(null);    

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        if (status === "error") {
            gsap.fromTo(
                button,
                { x: 0 },
                { x: -8, duration: 0.08, repeat: 5, yoyo: true, ease: "power1.inOut" }
            );
        }

        if (status === "success") {
            gsap.fromTo(
                button,
                { scale: 1 },
                { scale: 1.04, duration: 0.12, repeat: 1, yoyo: true, ease: "power1.out" }
            );
        }
    }, [status]);

    return (
        <button ref={buttonRef} type='submit' disabled={status === 'loading'} className={`auth-button auth-button-${status}`}>
            {
                status === 'success' && (
                    <span className='button-icon'>
                        <ICONS.SUCCESSSTAR />
                    </span>
                )
            }

            {
                status === 'error' && (
                    <span className='button-icon'>
                        <ICONS.ERRORSTAR />
                    </span>
                )
            }

            {
                status === 'loading' && (
                    <span>
                        <ICONS.LOADING />
                    </span>
                )
            }
            <span className='button-text'>
                {
                    status === 'idle' && content
                }
            </span>
        </button>
    )
}