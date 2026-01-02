"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWaitlist } from '@/context/WaitlistContext';

gsap.registerPlugin(ScrollTrigger);

const AIEmployeeCorePage = () => {
    const container = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { openWaitlist } = useWaitlist();

    const howItWorksSlides = [
        {
            title: 'Perceiving the environment',
            desc: 'AI helper gathers information from within the customer interactions and databases to understand the task at hand.',
            image: '/images/agent-illus.png',
            bgColor: '#e0e7ff'
        },
        {
            title: 'Processing input',
            desc: 'It analyzes the data and context to extract relevant insights.',
            image: '/images/agent-illus.png',
            bgColor: '#dcfce7'
        },
        {
            title: 'Taking action',
            desc: 'Based on analysis, it executes tasks and provides solutions.',
            image: '/images/agent-illus.png',
            bgColor: '#fef3c7'
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' })
            .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

        gsap.from('.feature-card', {
            scrollTrigger: { trigger: '.features-grid', start: 'top 80%' },
            y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
        });
    }, { scope: container });

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % howItWorksSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + howItWorksSlides.length) % howItWorksSlides.length);
    };

    return (
        <main ref={container} style={{ paddingTop: '120px', paddingBottom: '5rem', background: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vh, 8rem)' }}>
                    <h1 className="hero-title" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontFamily: 'var(--font-serif)',
                        marginBottom: '1.5rem',
                        color: '#1a1a1a',
                        lineHeight: 1.2
                    }}>
                        They learn your business.<br />Just like real helpers.
                    </h1>
                    <p className="hero-desc" style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Answer questions about your brand, add files, instructions, and your website for more unique results. The more information they have, the better the outcome. AI employees are designed to complement and enhance your human capabilities by handling routine tasks, allowing you to focus on higher-level and creative work.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="features-grid ai-core-features-grid">
                    {/* Automate Repetitive Tasks */}
                    <div className="feature-card ai-core-feature-card">
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
                            Automate Repetitive Tasks
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                            AI helpers handle routine tasks, in turn it frees up your team to focus on growth and creative work.
                        </p>
                    </div>

                    {/* Reduce Human Error */}
                    <div className="feature-card ai-core-feature-card">
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
                            Reduce human error
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                            Mistakes can be costly. AI helper improves accuracy and reliability by handling transactions, data analysis, and reporting with precision.
                        </p>
                    </div>

                    {/* Works 24/7 */}
                    <div className="feature-card ai-core-feature-card">
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
                            Works 24/7
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                            AI helper never needs breaks. Whether it's <span style={{ color: '#4F46E5', fontWeight: 600 }}>AI-powered customer support</span>, or real-time data analysis, it keeps your business running smoothly.
                        </p>
                    </div>

                    {/* Boost Productivity */}
                    <div className="feature-card ai-core-feature-card span-center">
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
                            Boost productivity and efficiency
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                            AI helper speeds up operations and improve workflow efficiency. It helps meet deadlines and lets your team focus on high-value tasks.
                        </p>
                    </div>
                </div>

                {/* How AI Helpers Work */}
                <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontFamily: 'var(--font-serif)',
                        marginBottom: '3rem',
                        color: '#1a1a1a'
                    }}>
                        How do AI Helpers work?
                    </h2>

                    {/* Carousel */}
                    <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
                        <div className="ai-core-carousel-card" style={{ background: howItWorksSlides[currentSlide].bgColor }}>
                            <div className="ai-core-carousel-text">
                                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
                                    {howItWorksSlides[currentSlide].title}
                                </h3>
                                <p style={{ fontSize: '1rem', color: '#1a1a1a', opacity: 0.8, lineHeight: 1.6 }}>
                                    {howItWorksSlides[currentSlide].desc}
                                </p>
                            </div>
                            <div className="ai-core-carousel-image-container">
                                <Image
                                    src={howItWorksSlides[currentSlide].image}
                                    alt={howItWorksSlides[currentSlide].title}
                                    width={400}
                                    height={400}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevSlide}
                                className="ai-core-nav-btn"
                                style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(0,0,0,0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <ChevronLeft size={20} color="#1a1a1a" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="ai-core-nav-btn"
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(0,0,0,0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <ChevronRight size={20} color="#1a1a1a" />
                            </button>
                        </div>

                        {/* Dots */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                            {howItWorksSlides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    style={{
                                        width: currentSlide === i ? '30px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        background: currentSlide === i ? '#1a1a1a' : 'rgba(0,0,0,0.2)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* AI Helper Benefits */}
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontFamily: 'var(--font-serif)',
                        marginBottom: '1rem',
                        color: '#4F46E5'
                    }}>
                        AI Helper benefits
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
                        AI helpers take care of the busy work, so your team can focus on what truly matters—creativity, strategy, and human connection. By automating tasks, reducing errors, and working around the clock, they help your business run smoother, smarter, and more efficiently. AI helpers also save time by automating routine tasks and providing instant support, allowing you to focus on higher-value activities.
                    </p>
                    <button onClick={openWaitlist} style={{
                        background: '#4F46E5',
                        color: '#fff',
                        border: 'none',
                        padding: '1rem 2.5rem',
                        borderRadius: '0.75rem',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        Join Waitlist
                    </button>
                </div>

            </div>
        </main>
    );
};

export default AIEmployeeCorePage;
