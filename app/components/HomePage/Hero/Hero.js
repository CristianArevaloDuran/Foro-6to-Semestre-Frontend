'use client';

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import gsap from "gsap";
import AnimatedBG from "../../AnimatedBG/AnimatedBG";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
    const heroRef = useRef(null);

    useGSAP(()=> {

        const split = SplitText.create('h1', {
            type: 'chars'
        })

        const introTl = gsap.timeline();

        // Intro timeline

        introTl
            .from(split.chars, {
                y: -100,
                opacity: 0,
                stagger: .06,
                delay: .2,
                duration: 1,
                autoAlpha: 0,
                ease: 'bounce.out'
            })
            .from('img', {
                opacity: 0,
                y: 150
            }, '<')
            .from('a', {
                autoAlpha: 0,
                opacity: 0,
                y: -20
            }, '>')

        // On scroll timeline

        const titleTl = gsap.timeline({
          scrollTrigger: {
            id: 'hero',
            scrub: 1,
            start: 'top top',
            end: '+=400vh',
            pin: true,
            pinSpacing: true,
            trigger: heroRef.current
          }
        })

        titleTl
            .fromTo(split.chars, {
              y: 0,
              opacity: 1
            }, {
              y: -100,
              opacity: 0
            })
            .fromTo('img', {
                y: 0,
                boxShadow: 0
            }, {
                top: '50%',
                yPercent: -50,
                width: 800,
                boxShadow: ' 0 4px 10px rgba(0, 0, 0, 0.35)'
            }, '<')
            .fromTo('a', {
              y: 0,
              opacity: 1
            }, {
              y: -100,
              opacity: 0
            }, '<')

        ScrollTrigger.refresh();
    }, {
        scope: heroRef
    })

    return(
        <>
            <section ref={heroRef} className="hero" id="hero">
                <div className="title">
                    <h1>Knotic</h1>
                    <a href="#about">Conoce más</a>
                </div>
                <Image
                    src='/images/image.png'
                    alt="Login"
                    width={400}
                    height={100}
                    draggable='false'
                />
                
                <AnimatedBG />
            </section>
        </>
    )
}