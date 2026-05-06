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

            </section>
        </>
    )
}