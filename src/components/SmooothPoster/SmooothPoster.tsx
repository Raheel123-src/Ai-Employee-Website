"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(Draggable, InertiaPlugin);
}

const SmooothPoster = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const smooothRef = useRef<HTMLDivElement>(null);
    const proxyRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const spinTweenRef = useRef<gsap.core.Tween | null>(null);
    const draggableRef = useRef<Draggable[] | null>(null);

    // Words to cycle through
    const words = ["Sales", "Marketing", "Support", "HR", "Ops", "Finance", "IT", "L&D", "Founder"];
    const [wordIndex, setWordIndex] = useState(0);
    const currentWord = words[wordIndex];
    const infoMap: Record<string, string> = {
        Sales: "Lead research, outreach emails, follow-ups, CRM/sheet updates, demo reminders, meeting summaries.",
        Marketing: "Campaign research, content drafts, social posts, ad copy, reports and A/B test summaries.",
        Support: "24x7 L0/L1 support, FAQ handling, ticket replies, routing to humans when needed.",
        HR: "Resume screening, interview scheduling, candidate follow-ups, answering policy/benefits questions.",
        Ops: "Updating trackers, monitoring SLAs, reconciling status from mails/docs, coordinating vendors and workflows.",
        Finance: "Pulling numbers from invoices/POs, updating sheets/ERP, reconciling entries, generating MIS and forecasts.",
        IT: "IT helpdesk, ticket triage, knowledge-base search, permission / access workflows.",
        "L&D": "Creating learning content, quizzes, nudges, tracking completions and generating skill reports.",
        Founder: "MoM drafting, follow-up tracking across teams, compiling reports from multiple departments."
    };
    // Constants
    const initialRotationOffset = -36.25;

    // Colors and Gradients
    // Colors and Gradients - Themed
    const gradients = [
        "var(--bg-cream)",
    ];

    const circleColors = [
        "var(--bg-white)",
    ];

    const letterColors = [
        "var(--text-dark)",
    ];

    const [visuals, setVisuals] = useState({
        background: gradients[0],
        circleColor: circleColors[0],
        letterColor: letterColors[0],
    });

    const randomizeVisuals = () => {
        const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
        setVisuals({
            background: randomItem(gradients),
            circleColor: randomItem(circleColors),
            letterColor: randomItem(letterColors),
        });
    };

    const nextWord = () => {
        setWordIndex((prev) => (prev + 1) % words.length);
        randomizeVisuals();
    };

    const prevWord = () => {
        setWordIndex((prev) => (prev - 1 + words.length) % words.length);
        randomizeVisuals();
    };

    useEffect(() => {
        if (!smooothRef.current || !proxyRef.current || !infoRef.current) return;

        // Kill previous instances
        if (spinTweenRef.current) spinTweenRef.current.kill();
        if (draggableRef.current) draggableRef.current[0].kill();

        const shapes = gsap.utils.toArray<HTMLElement>(".letter");
        const progressWrap = gsap.utils.wrap(0, 1);
        const wrapRotation = gsap.utils.wrap(-90, 90);

        let screenRange = gsap.utils.mapRange(0, 2000, 500, 4500);
        let dragDistancePerRotation = screenRange(window.innerWidth);
        let startProgress = 0;

        const updateDragDistance = () => {
            dragDistancePerRotation = screenRange(window.innerWidth);
        };
        window.addEventListener("resize", updateDragDistance);

        // Dynamic rotation based on index (spacing letters by ~12 degrees)
        const spacing = 12;

        // Spin Animation
        spinTweenRef.current = gsap.fromTo(shapes, {
            rotationY: (i) => (i * spacing) + initialRotationOffset
        }, {
            rotationY: `-=${360}`,
            modifiers: {
                rotationY: (value) => wrapRotation(parseFloat(value as string)) + "deg"
            },
            duration: 10,
            ease: "none",
            repeat: -1
        });

        // Radius Adjustment
        const adjustRadius = () => {
            const radius = Math.min(window.innerWidth * 0.5, 650, window.innerHeight * 0.43);

            gsap.set(shapes, {
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
                transformOrigin: `50% 50% ${-radius}px`
            });
        };
        adjustRadius();
        window.addEventListener("resize", adjustRadius);

        // Draggable
        // Draggable with word change on release
        draggableRef.current = Draggable.create(proxyRef.current, {
            trigger: infoRef.current,
            type: "x",
            inertia: true,
            allowNativeTouchScrolling: true,
            onPress() {
                // Store start position for direction detection
                (this as any).dragStartX = this.x;
                if (spinTweenRef.current) {
                    gsap.killTweensOf(spinTweenRef.current);
                    spinTweenRef.current.timeScale(0);
                    startProgress = spinTweenRef.current.progress();
                }
            },
            onDrag() {
                const p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
                if (spinTweenRef.current) spinTweenRef.current.progress(progressWrap(p));
            },
            onThrowUpdate() {
                const p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
                if (spinTweenRef.current) spinTweenRef.current.progress(progressWrap(p));
            },
            onRelease() {
                // Determine drag direction to change word
                const delta = (this as any).dragStartX - this.x;
                if (Math.abs(delta) > 30) {
                    if (delta > 0) {
                        nextWord();
                    } else {
                        prevWord();
                    }
                }
                if (spinTweenRef.current && (!this.tween || !this.tween.isActive())) {
                    gsap.to(spinTweenRef.current, { timeScale: 1, duration: 1 });
                }
            },
            onThrowComplete() {
                if (spinTweenRef.current) gsap.to(spinTweenRef.current, { timeScale: 1, duration: 1 });
            }
        });

        return () => {
            window.removeEventListener("resize", updateDragDistance);
            window.removeEventListener("resize", adjustRadius);
            if (spinTweenRef.current) spinTweenRef.current.kill();
            if (draggableRef.current) draggableRef.current[0].kill();
        };
    }, [wordIndex, infoMap]); // Re-run when word changes

    return (

        <div className="smoooth-wrapper" style={{
            background: visuals.background,
        }}>


            {/* Left side: rotating poster */}
            <div id="poster" className="noise poster-section">
                {/* Proxy for Draggable */}
                <div ref={proxyRef} style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}></div>



                {/* Smoooth Container */}
                <div className="smoooth-container">
                    <div ref={smooothRef} className="smoooth" aria-label={`Rotating ${currentWord}`} style={{
                        color: visuals.letterColor,
                    }}>
                        {currentWord.split('').map((char, i) => (
                            <div key={`${currentWord}-${i}`} className="letter" data-letter={char} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                zIndex: 2,
                                transform: 'translate(-50%, -50%)',
                                height: '1lh',
                                transformStyle: 'preserve-3d',
                                backfaceVisibility: 'hidden',
                                textAlign: 'center'
                            }}>
                                {char}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Circle Background */}
                <div className="circle" aria-hidden="true" style={{
                    backgroundColor: visuals.circleColor,
                }}></div>
            </div>

            {/* Right side: word info */}
            <div ref={infoRef} className="word-info" style={{
                color: visuals.letterColor,
            }}>
                {infoMap[currentWord] || ''}

                <div className="drag-indicator">
                    <div className="drag-icon-circle" style={{
                        borderColor: visuals.letterColor,
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8L22 12L18 16" />
                            <path d="M2 12H22" />
                        </svg>
                    </div>
                    <span>Drag to explore</span>
                </div>
            </div>
        </div>
    );
};
export default SmooothPoster;
