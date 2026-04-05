'use client';

import Cookies from "js-cookie";
import { useRef, useState } from "react";
import {ICONS} from '../lib/constants.js';

export default function LoginForm({API_URL}) {

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const login = async (e) => {
        e.preventDefault();


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

                Cookies.set('session', result.access_token, {secure: true});

                localStorage.setItem('token', result.access_token);

            }
        } catch (error) {
            console.error(error);
        }
        
    }

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

    return (
        <form className="form-card" onSubmit={(e)=>login(e)}>
            <div className="form-header">
                <h1>Bienvenido</h1>
                <p>Inicia sesion para continuar en Knotic.</p>
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
            <button type="submit">Entrar</button>
        </form>
    )
}