'use client';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef } from "react";

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function randomInRange(seed, min, max, precision = 1) {
    const value = min + seededRandom(seed) * (max - min);
    return Number(value.toFixed(precision));
}

export default function AnimatedBG() {
    const ITEM_COUNT = 40;
    const bgRef = useRef(null);

    const items = useMemo(() => {
        return Array.from({ length: ITEM_COUNT }, (_, index) => {
            const seedBase = index * 10 + 1;
            const size = randomInRange(seedBase, 40, 170, 0);
            return {
                id: index,
                size,
                top: `${randomInRange(seedBase + 1, 0, 100, 1)}%`,
                left: `${randomInRange(seedBase + 2, 0, 100, 1)}%`,
                color: `hsl(${randomInRange(seedBase + 3, 40, 160, 0)}, 90%, 60%)`,
                opacity: randomInRange(seedBase + 4, 0.35, 0.8, 2),
            };
        });
    }, []);
    
    useGSAP(() => {
        const elements = gsap.utils.toArray('.item');

        elements.forEach((item) => {
            gsap.to(item, {
                x: gsap.utils.random(-140, 140, 1),
                y: gsap.utils.random(-140, 140, 1),
                rotation: gsap.utils.random(-40, 40, 1),
                scale: gsap.utils.random(0.7, 1.25, 0.01),
                duration: gsap.utils.random(6, 16, 0.1),
                delay: gsap.utils.random(0, 2.5, 0.1),
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        });
    }, {
        scope: bgRef
    });

    return (
        <div className="basebg" ref={bgRef}>
            <div className="animated-items">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="item"
                        style={{
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            top: item.top,
                            left: item.left,
                            backgroundColor: item.color,
                            opacity: item.opacity,
                        }}
                    />
                ))}
            </div>
            <div className="blur-layer" />
        </div>
    );
}