"use client"

import Link from "next/link"
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { links, sessionLinks } from "@/app/lib/constants"
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
    const navRef = useRef(null)

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = Cookies.get('session');
        setIsLogged(Boolean(token));
    }, [])
    
    const navLinks = isLogged ? sessionLinks : links;
    

    useGSAP(()=>{
        
        const navTl = gsap.timeline({
            scrollTrigger: {
                scrub: 1,
                start: "top top",
                end: "+=100vh"
            }
        })

        navTl.
            to(navRef.current, {
                width: '90%',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20
            })

    }, {
        scope: navRef
    })
    
    return (
        <nav className="navbar" ref={navRef}>
            <h1>Knotic</h1>
            <ul>
                
                {
                    navLinks.map((link) => (
                        <li key={link.link}>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}