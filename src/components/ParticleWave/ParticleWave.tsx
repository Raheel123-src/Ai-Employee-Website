"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParticleWave = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const SEPARATION = 100;
        const AMOUNTX = 50; // Increased for better density in modern renderer
        const AMOUNTY = 50;

        let camera: THREE.PerspectiveCamera;
        let scene: THREE.Scene;
        let renderer: THREE.WebGLRenderer;
        let particles: THREE.Points;
        let count = 0;

        // Initialize
        const init = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
            camera.position.z = 1000;

            scene = new THREE.Scene();

            const numParticles = AMOUNTX * AMOUNTY;
            const positions = new Float32Array(numParticles * 3);
            const scales = new Float32Array(numParticles);

            let i = 0;
            let j = 0;

            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
                    positions[i + 1] = 0; // y
                    positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z
                    scales[j] = 1;
                    i += 3;
                    j++;
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

            const material = new THREE.PointsMaterial({
                color: 0x1a1a1a, // Dark particles
                size: 10, // Base size
                map: createCircleTexture(), // Custom texture for round particles
                transparent: true,
                alphaTest: 0.5,
                opacity: 0.6 // Slightly transparent
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current!,
                antialias: true,
                alpha: true // Transparent background
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            // Use theme background color
            renderer.setClearColor(0xf5f3ed, 1);
        };

        // Helper to create a circle texture (replacement for SpriteCanvasMaterial)
        const createCircleTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const context = canvas.getContext('2d');
            if (context) {
                context.beginPath();
                context.arc(16, 16, 16, 0, 2 * Math.PI);
                context.fillStyle = '#1a1a1a'; // Dark circle
                context.fill();
            }
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        const animate = () => {
            if (!particles) return;

            const positions = particles.geometry.attributes.position.array as Float32Array;
            // const scales = particles.geometry.attributes.scale.array as Float32Array;

            let i = 0;
            // let j = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    // Update Y position (wave effect)
                    positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);

                    // Scale logic in PointsMaterial is handled by 'size', but we can't easily vary size per particle in basic PointsMaterial without a custom shader.
                    // For simplicity/performance in standard Three.js, we might skip individual scaling or use a custom ShaderMaterial.
                    // The user's code: particle.scale.x = ...
                    // I'll skip the scale animation for now to keep it robust, or just pulse the global size.
                    // Or I can update the geometry if I really want, but it's expensive.
                    // Let's stick to the wave motion which is the most visible part.

                    i += 3;
                    // j++;
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            count += 0.1;
            requestAnimationFrame(animate);
        };

        const onWindowResize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        init();
        animate();

        window.addEventListener('resize', onWindowResize);

        // GSAP Scroll Animation
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // DESKTOP: Complex 3D Scroll with Pinning
            mm.add("(min-width: 901px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=300%", // Increased scroll distance for 3 cards
                        pin: true,
                        scrub: 1,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            if (camera) {
                                // Camera moves forward (zoom in)
                                camera.position.z = 1000 - (progress * 1500);
                                camera.position.y = Math.sin(progress * 4) * 100;
                                camera.lookAt(scene.position);
                            }
                        }
                    }
                });

                // Animate Cards
                const cards = gsap.utils.toArray('.wave-card') as HTMLElement[];

                tl.fromTo(cards,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        stagger: 0.5
                    },
                    0.5
                );

                tl.to(cards,
                    { opacity: 0, scale: 1.1, y: -50, duration: 0.5, ease: "power2.in" },
                    "+=1"
                );
            });

            // MOBILE: One Card at a time, Scroll Triggered
            mm.add("(max-width: 900px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "+=600%", // Long scroll for reading
                        pin: true,
                        scrub: 0.5
                    }
                });

                const cards = gsap.utils.toArray('.wave-card') as HTMLElement[];

                // Initial State: All hidden, slightly scaled down
                gsap.set(cards, { opacity: 0, scale: 0.9, y: 50, position: 'absolute', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', top: '30%' });

                cards.forEach((card, i) => {
                    // Enter
                    tl.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                    });

                    // Stay for a bit (empty tween)
                    tl.to({}, { duration: 0.5 });

                    // Exit (if not last)
                    if (i < cards.length - 1) {
                        tl.to(card, {
                            opacity: 0,
                            scale: 1.05,
                            y: -30,
                            duration: 0.8,
                            ease: "power2.in"
                        });
                    }
                });
            });

        }, containerRef);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            ctx.revert();
            if (renderer) renderer.dispose();
            if (scene) scene.clear();
        };
    }, []);

    const cardsData = [
        { title: "Communication", desc: "Handle emails, intros, follow-ups, and reminders." },
        { title: "Data Updates", desc: "Keep Sheets, CRMs, and trackers always updated." },
        { title: "Documents & SOPs", desc: "Read docs, check compliance, and extract info." },
        { title: "Research & Create", desc: "Search web, draft content, and generate ideas." },
        { title: "Reporting", desc: "Summarise progress and keep teams in sync." }
    ];

    return (
        <div ref={containerRef} className="wave-container-outer" style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-cream)' }}>
            <canvas ref={canvasRef} style={{ display: 'block' }} />

            {/* Static Header */}
            <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10, width: '100%' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', margin: 0, color: 'var(--text-dark)' }}>What All They Do?</h2>
            </div>

            {/* Cards Container */}
            <div className="wave-container-inner">
                {cardsData.map((card, i) => (
                    <div key={i} className="wave-card" style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '2rem',
                        borderRadius: '1rem',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        flex: 1,
                        maxWidth: '350px',
                        opacity: 0, // Initial state handled by GSAP
                        transform: 'translateZ(0)' // Hardware accel
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{card.title}</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParticleWave;
