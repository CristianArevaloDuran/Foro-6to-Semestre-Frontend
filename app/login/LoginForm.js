'use client';

import { useRef, useState } from "react";
import {ICONS} from '../lib/constants.js';
import Link from "next/link";
import AlertBlock from "../components/AlertBlock/AlertBlock.js";
import AuthButton from "../components/AuthButton/AuthButton.js";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext.js";

export default function LoginForm({API_URL}) {

    const router = useRouter();
    const { login } = useAuth();
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        setStatus('loading');

        const data = {
            email: emailRef.current.value,
            password: passRef.current.value
        }

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok) {

                const result = await response.json();

                
                setTimeout(()=> {
                    login(result, result.access_token);
                    setStatus('success');

                    router.push('/app');
                }, 1000)
            } else {
                setMessage('Credenciales inválidas');
                setStatus('error');
            }
        } catch (error) {
            setMessage('Error mientras se iniciaba sesión');
            console.error(error);
            setStatus('error');
        }
        
    }

    // Password visibility

    const [visiblePass, setVisiblePass] = useState(false);
    const [type, setType] = useState('password')
    const [placeholder, setPlaceholder] = useState('******');

    const showPass = () => {
        if(visiblePass) {
            setVisiblePass(false);
            setType('password');
            setPlaceholder('******');
        } else {
            setVisiblePass(true);
            setType('text');
            setPlaceholder('abc123');
        }
    }

    // Alert Block Handling

    const [message, setMessage] = useState('');
    const [messageTitle, setMessageTitle] = useState('Error');

    // Button status

    const [status, setStatus] = useState('idle');

    return (
        <form className="form-card" onSubmit={(e)=>handleLogin(e)}>
            <div className="form-header">
                <h1>Bienvenido</h1>
                <p>Inicia sesión para continuar en Knotic.</p>
            </div>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                    <input id="email" ref={emailRef} type="email" placeholder="example@email.com" required />
                    <div className="icon">
                        <ICONS.EMAIL />
                    </div>
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                    <input id="password" ref={passRef} type={type} required placeholder={placeholder} />
                    <div className="icon pass-icon" onClick={showPass}>
                        {
                            visiblePass ? <ICONS.VIEWOFF /> : <ICONS.VIEW />
                        }
                    </div>
                </div>
            </div>
            <AuthButton content={'Entrar'} status={status} />
            <p className="optional-link">¿No tienes cuenta? <br /> <Link href="/register">Registrate</Link></p>
            <AlertBlock message={message} title={messageTitle} onClose={()=>setMessage('')} open={Boolean(message)} />
        </form>
    )
}