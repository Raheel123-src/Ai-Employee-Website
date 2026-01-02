"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
    "design.", "build.", "ship.", "scale."
];

const images = ['person1.png', 'person2.png', 'person3.png', 'person4.png'];

const WhyNowScroll = () => {
    const container = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        if (!container.current || !listRef.current) return;

        const listItems = gsap.utils.toArray<HTMLLIElement>('.scroll-list-item');
        const imageItems = gsap.utils.toArray<HTMLDivElement>('.scroll-image-item');

        // Initial state for List Items
        gsap.set(listItems, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

        // Initial state for Images
        // Stack them up: zIndex corresponds to index.
        // First image visible, others hidden and slightly offset/scaled down to simulate coming from "deck" or just invisible.
        // "only the one ... visible ... rest stacked behind"
        // We'll make them appear on top.
        gsap.set(imageItems, {
            zIndex: (i) => i,
            opacity: (i) => (i === 0 ? 1 : 0),
            scale: (i) => (i === 0 ? 1 : 0.9),
            y: (i) => (i === 0 ? 0 : 20)
        });

        // Dimmer effect for List Items
        const dimmer = gsap.timeline()
            .to(listItems.slice(1), {
                opacity: 1,
                stagger: 0.5,
            })
            .to(listItems.slice(0, listItems.length - 1), {
                opacity: 0.2,
                stagger: 0.5,
            }, 0);

        // Image Stacking Animation
        const imageTimeline = gsap.timeline();
        const step = 0.5;

        imageItems.slice(1).forEach((img, i) => {
            imageTimeline.to(img, {
                opacity: 1,
                scale: 1,
                y: 0,
                rotation: gsap.utils.random(-5, 5),
                duration: 0.5,
                ease: "power2.out"
            }, i * step);
        });

        // Unified ScrollTrigger configuration
        // We trigger based on the container passing the viewport center,
        // which matches the sticky element's position (locked at 50vh).
        const triggerConfig = {
            trigger: container.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true,
        };

        ScrollTrigger.create({
            ...triggerConfig,
            animation: dimmer,
        });

        ScrollTrigger.create({
            ...triggerConfig,
            animation: imageTimeline,
        });

        // Removed parallax to ensure sticky alignment remains perfect

    }, { scope: container });

    return (
        <div ref={container} className="scroll-list-section">
            <header className="scroll-list-header">
                <h1 className="fluid">Your competitors are moving.<br />Are you?</h1>
            </header>
            <main className="scroll-list-main">
                <section className="scroll-list-content fluid">
                    {/* Container 1: Label */}
                    <div className="why-col-label">
                        <h2>
                            <span aria-hidden="true">they can</span>
                            <span className="sr-only">they can ship things.</span>
                        </h2>
                    </div>

                    {/* Container 2: List */}
                    <div className="why-col-list">
                        <ul aria-hidden="true" ref={listRef} style={{ '--count': items.length } as React.CSSProperties}>
                            {items.map((item, i) => (
                                <li key={item} className="scroll-list-item" style={{ '--i': i } as React.CSSProperties}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Container 3: Images */}
                    <div className="why-col-images">
                        <div className="image-stack">
                            {items.map((item, i) => (
                                <div key={i} className="scroll-image-item">
                                    <div className="mock-card">
                                        <div className="mock-header">
                                            <div className="mock-dot red"></div>
                                            <div className="mock-dot yellow"></div>
                                            <div className="mock-dot green"></div>
                                        </div>
                                        <div className="mock-body">
                                            {i === 0 && ( // Design
                                                <>
                                                    <div className="mock-chat-bubble user">Generate a landing page design for a SaaS app.</div>
                                                    <div className="mock-chat-bubble">Generating layout... <br />Done. Here is the wireframe.</div>
                                                    <div style={{ height: '100px', background: '#f5f5f5', borderRadius: '8px', marginTop: '10px' }}></div>
                                                </>
                                            )}
                                            {i === 1 && ( // Build
                                                <>
                                                    <div className="mock-row medium"></div>
                                                    <div className="mock-row short"></div>
                                                    <div className="mock-row"></div>
                                                    <div className="mock-button">Deploying Agent...</div>
                                                </>
                                            )}
                                            {i === 2 && ( // Ship
                                                <>
                                                    <div style={{ textAlign: 'center', fontSize: '4rem' }}>🚀</div>
                                                    <h3 style={{ textAlign: 'center', margin: 0 }}>Deployment Successful</h3>
                                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Your AI employee is now live.</p>
                                                </>
                                            )}
                                            {i === 3 && ( // Scale
                                                <>
                                                    <h4 style={{ margin: 0 }}>Performance</h4>
                                                    <div className="mock-graph">
                                                        <div className="mock-bar" style={{ height: '40%' }}></div>
                                                        <div className="mock-bar" style={{ height: '60%' }}></div>
                                                        <div className="mock-bar" style={{ height: '50%' }}></div>
                                                        <div className="mock-bar" style={{ height: '80%' }}></div>
                                                        <div className="mock-bar" style={{ height: '100%' }}></div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="scroll-list-footer-section">
                    <h3 className="fluid">They aren’t just hiring people. They’re hiring AI Employees.</h3>
                </section>
            </main>
        </div>
    );
};

export default WhyNowScroll;
