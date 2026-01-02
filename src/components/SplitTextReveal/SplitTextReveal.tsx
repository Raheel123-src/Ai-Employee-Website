"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
    text: string;
    className?: string;
}

const SplitTextReveal = ({ text, className = "" }: SplitTextRevealProps) => {
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const element = textRef.current;

        // Manual splitting since SplitText is a Club GSAP plugin (paid).
        // We'll implement a basic version for free.
        // Split by words to keep them together during wrapping
        const words = text.split(' ');

        element.innerHTML = '';

        const allChars: HTMLElement[] = [];

        words.forEach((wordText, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            wordText.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.transform = 'translateY(100%)'; // Initial state
                charSpan.style.opacity = '0';
                wordSpan.appendChild(charSpan);
                allChars.push(charSpan);
            });

            element.appendChild(wordSpan);

            // Add space between words
            if (index < words.length - 1) {
                const space = document.createTextNode(' '); // Normal space allows wrapping
                element.appendChild(space);
            }
        });

        // Animate
        gsap.fromTo(allChars,
            {
                y: 80,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "circ.out",
                stagger: 0.02,
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%", // Start when top of element hits 80% viewport height
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            // Cleanup if needed
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [text]);

    return (
        <h2 ref={textRef} className={`split-text-reveal ${className}`} style={{ overflow: 'hidden', display: 'inline-block' }}>
            {text}
        </h2>
    );
};

export default SplitTextReveal;
