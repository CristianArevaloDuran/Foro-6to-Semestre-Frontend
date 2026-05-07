'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function About() {

    const aboutRef = useRef(null);

    useGSAP(()=>{
        
    }, {
        scope: aboutRef
    })

    return(
        <>
            <section ref={aboutRef} className="about" id="about">
                <div className="content">
                    <p>
                        La app de foros diseñada para estudiantes, en donde podrás discutir temas relacionados con las diferentes materias de tu interés.
                    </p>
                    <div className="links">
                        <a href="/login">Inicia Sesión</a>
                        <a href="/register">Registrate</a>
                    </div>
                </div>
            </section>
        </>
    )
}