'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ICONS } from "../lib/constants.js";
import Link from "next/link";
import AlertBlock from "../components/AlertBlock/AlertBlock.js";
import AuthButton from "../components/AuthButton/AuthButton.js";

export default function RegisterForm({ API_URL }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const register = async (e) => {
        e.preventDefault();
        setStatus('loading');

        if (formData.password !== formData.confirmPassword) {
            setMessage("Las contrasenas no coinciden.");
            setMessageType("error");
            setStatus('error');
            return;
        }

        setIsSubmitting(true);
        setMessage("");

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('success');
                setMessage("Cuenta creada correctamente. Redirigiendo al login...");
                setMessageType("success");
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
                return;
            }

            setMessage("No se pudo crear la cuenta. Verifica los datos e intenta otra vez.");
            setMessageType("error");
            setStatus('error');
        } catch (error) {
            setStatus('error');
            setMessage("Error de red. Intenta nuevamente en unos segundos.");
            setMessageType("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Status 

    const [status, setStatus] = useState('idle');

    return (
        <form className="form-card" onSubmit={register}>
            <div className="form-header fixed-header">
                <h1>Crea tu cuenta</h1>
                <p>Registrate para empezar a participar en Knotic.</p>
            </div>

            <div className="input-container">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Tu nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <div className="icon">
                        <ICONS.USERID />
                    </div>
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="name">Nombre</label>
                <div className="input-wrapper">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <div className="icon">
                        <ICONS.ID />
                    </div>
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className="icon">
                        <ICONS.EMAIL />
                    </div>
                </div>
                
            </div>

            <div className="input-container">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={showPassword ? "abc123" : "******"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div
                        className="icon pass-icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <ICONS.VIEWOFF /> : <ICONS.VIEW />}
                    </div>
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="confirmPassword">Confirmar password</label>
                <div className="password-input-wrapper">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={showConfirmPassword ? "abc123" : "******"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <div
                        className="icon pass-icon"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                        {showConfirmPassword ? <ICONS.VIEWOFF /> : <ICONS.VIEW />}
                    </div>
                </div>
            </div>

            <AuthButton content={'Crear cuenta'} status={status} />

            <p className="optional-link">¿Tienes cuenta? <br /> <Link href="/login">Inicia sesión</Link></p>

            <AlertBlock message={message} onClose={()=>setMessage('')} open={Boolean(message)} />
        </form>
    );
}
