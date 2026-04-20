"use client"

import Link from "next/link"
import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { links, sessionLinks } from "@/app/lib/constants"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
    const navRef = useRef(null)
    const userMenuRef = useRef(null)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const router = useRouter();
    const { user, logout, isAuthenticated, loading } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/login');
        router.refresh();
    }

    const navLinks = isAuthenticated ? sessionLinks : links;

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleOutsideClick)
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    useGSAP(()=>{
        const navTl = gsap.timeline({
            scrollTrigger: {
                scrub: 1,
                start: "top top",
                end: "+=100vh"
            }
        })

        navTl.to(navRef.current, {
            width: '90%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
        })
    }, {
        scope: navRef
    })

    if (loading) return <nav className="navbar" ref={navRef}><h1>Knotic</h1></nav>;
    
    console.log(user);
    

    return (
        <nav className="navbar" ref={navRef}>
            <h1>Knotic</h1>
            <ul>
                {navLinks.map((link) => (
                    <li key={link.link}>
                        <Link href={link.link}>{link.name}</Link>
                    </li>
                ))}

                {isAuthenticated && (
                        <li className="nav-user" ref={userMenuRef}>
                            <button
                                className="nav-user-button"
                                type="button"
                                aria-expanded={isUserMenuOpen}
                                aria-haspopup="menu"
                                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                            >
                                {user?.user?.user_metadata?.username?.[0]}
                            </button>
                            {isUserMenuOpen && (
                                <div className="nav-user-content" role="menu">
                                    <Link href='/me' className="nav-user-item">
                                        {user?.user?.user_metadata?.username}
                                    </Link>
                                    {
                                        user?.role?.name === 'Admin' && (
                                            <Link href='/admin' className="nav-user-item">Admin</Link>
                                        )
                                    }
                                    <button className="nav-user-item" onClick={handleLogout} type="button">
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </li>
                )}
            </ul>
        </nav>
    )
}