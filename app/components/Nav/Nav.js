"use client"

import Link from "next/link"
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { links } from "@/app/lib/constants"
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
    const navRef = useRef(null)
    
    useGSAP(()=>{
        
        const navTl = gsap.timeline({
            scrollTrigger: {
                scrub: 1,
                start: "top top",
                end: "+=200vh"
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
            <ul>
                {
                    links.map((link) => (
                        <li key={link.link}>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}