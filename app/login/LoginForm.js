'use client';

import Cookies from "js-cookie";
import { useRef } from "react";
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

    return (
        <form onSubmit={(e)=>login(e)}>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input id="email" ref={emailRef} type="email" placeholder="example@email.com" />
            </div>
            <div className="input-container">
                <label htmlFor="password">Password</label>
                <div>
                    <input id="password" ref={passRef} type="password" />
                    <ICONS.VIEW />
                </div>
            </div>
            <input type="submit" value='Login' />
        </form>
    )
}