"use client";

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Employee {
    name: string;
    role: string;
    desc: string;
    image: string;
    bgColor: string;
    slug: string;
    bgPosition?: string;
}

const DepartmentsPage = () => {
    const container = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const employees: Employee[] = [
        {
            name: 'Rhea',
            role: 'Head of Marketing',
            desc: 'I boost your brand. I analyze trends, create content calendars, and ensure your message reaches the right audience.',
            image: '/images/rhea.jpeg',
            bgColor: '#e07a2c',
            slug: 'marketing'
        },
        {
            name: 'Arjun',
            role: 'Head of Sales',
            desc: 'I close deals. I automate outreach, handle objections, and keep your pipeline full 24/7.',
            image: '/images/arjun.jpeg',
            bgColor: '#991b1b',
            slug: 'sales'
        },
        {
            name: 'Mira',
            role: 'Operations Lead',
            desc: 'I optimize everything. I track metrics, manage resources, and ensure smooth business operations.',
            image: '/images/mira.jpg',
            bgColor: '#7c3aed',
            slug: 'operations'
        },
        {
            name: 'Neil',
            role: 'IT Specialist',
            desc: 'I keep systems running. I manage security, troubleshoot issues, and oversee your tech stack.',
            image: '/images/neil.jpg',
            bgColor: '#0f766e',
            slug: 'it'
        },
        {
            name: 'Priti',
            role: 'Learning & Development',
            desc: 'I train your team. I create courses, track progress, and ensure everyone is upskilling effectively.',
            image: '/images/Priti.jpeg',
            bgColor: '#f59e0b',
            slug: 'learning-development'
        },
        {
            name: 'Vivaan',
            role: 'Head of Finance',
            desc: 'I manage the books. I track expenses, forecast revenue, and handle payroll with precision.',
            image: '/images/vivaan.jpeg',
            bgColor: '#d4c4a8',
            slug: 'finance'
        },
        {
            name: 'Advaith',
            role: 'Placements Officer',
            desc: 'I connect talent. I manage campus drives, coordinate interviews, and help students find careers.',
            image: '/images/advaith.jpeg',
            bgColor: '#6f4e37',
            slug: 'placements'
        },
        {
            name: 'Kartik',
            role: 'Administrative Officer',
            desc: 'I handle the logistics. From scheduling to facility management, I keep the office organized.',
            image: '/images/Kartik.jpeg',
            bgColor: '#14532d',
            slug: 'administrative'
        },
        {
            name: 'Anaya',
            role: 'HR Manager',
            desc: 'I care for people. I screen resumes, onboard hires, and ensure a positive company culture.',
            image: '/images/anaya.jpeg',
            bgColor: '#603270',
            slug: 'human-resources'
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.page-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' })
            .from('.carousel-container', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }, { scope: container });

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % employees.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + employees.length) % employees.length);
    };

    const getVisibleCards = () => {
        const cards = [];
        for (let i = -1; i <= 1; i++) {
            const index = (currentIndex + i + employees.length) % employees.length;
            cards.push({ ...employees[index], offset: i });
        }
        return cards;
    };

    return (
        <main ref={container} style={{ paddingTop: '120px', paddingBottom: '5rem', background: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Title */}
                <h1 className="page-title" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontFamily: 'var(--font-serif)',
                    textAlign: 'center',
                    marginBottom: '4rem',
                    color: '#1a1a1a'
                }}>
                    Meet Your AI Employees
                </h1>

                {/* Carousel */}
                <div className="carousel-container" style={{ position: 'relative', marginBottom: '4rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        padding: '2rem 0',
                        minHeight: '600px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={prevSlide}
                            style={{
                                position: 'absolute',
                                left: '0',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                        >
                            <ChevronLeft size={24} color="#1a1a1a" />
                        </button>

                        <button
                            onClick={nextSlide}
                            style={{
                                position: 'absolute',
                                right: '0',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10,
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                        >
                            <ChevronRight size={24} color="#1a1a1a" />
                        </button>

                        {/* Cards */}
                        {getVisibleCards().map((employee, i) => (
                            <Link
                                key={i}
                                href={`/departments/${employee.slug}`}
                                style={{
                                    textDecoration: 'none',
                                    transform: employee.offset === 0 ? 'scale(1)' : 'scale(0.85)',
                                    opacity: employee.offset === 0 ? 1 : 0.5,
                                    transition: 'all 0.5s ease',
                                    filter: employee.offset === 0 ? 'none' : 'blur(2px)',
                                    flex: '0 0 clamp(240px, 90vw, 400px)',
                                    maxWidth: '400px'
                                }}
                            >
                                <div style={{
                                    background: employee.bgColor,
                                    borderRadius: '1.25rem',
                                    overflow: 'hidden',
                                    height: '500px',
                                    position: 'relative',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: `url(${employee.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: employee.bgPosition || 'top center'
                                    }} />

                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '2rem',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                                        color: '#fff'
                                    }}>
                                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                                            {employee.name}
                                        </h2>
                                        <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '1rem', fontWeight: 500 }}>
                                            {employee.role}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                                            {employee.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Dots Indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                    {employees.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            style={{
                                width: currentIndex === i ? '30px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                background: currentIndex === i ? '#1a1a1a' : 'rgba(0,0,0,0.2)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    ))}
                </div>

                {/* Hero CTA Section */}
                <div style={{ textAlign: 'center', marginBottom: '8rem', padding: '4rem 2rem' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', lineHeight: 1.2, color: '#1a1a1a' }}>
                        Grow your business faster with an AI<br />team that works 24/7 just for you
                    </h2>
                    <button style={{
                        background: '#4F46E5', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '0.75rem',
                        fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem'
                    }}>
                        Meet your AI team — 70% off today
                    </button>
                    <p style={{ fontSize: '0.9rem', color: '#4F46E5' }}>
                        ✓ 14-day full money-back guarantee
                    </p>
                </div>

                {/* Integrations Section */}
                <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: '#1a1a1a' }}>
                        Seamless connection for<br />effortless growth
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Connect Gmail, Notion and more — and run your entire business from one place
                    </p>
                </div>

                {/* Trust Logos Section */}
                <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
                        Trusted by leading teams worldwide
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', padding: '2rem', background: '#fff', borderRadius: '1.5rem' }}>
                        {['Rakuten', 'Revolut', 'Crunchbase', 'Business Insider', 'Fortune', 'Cybernews'].map((brand, i) => (
                            <div key={i} style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', fontFamily: 'var(--font-sans)' }}>
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium AI Solution Section */}
                <div className="departments-grid" style={{ marginBottom: '8rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '2rem', color: '#1a1a1a' }}>
                            The premium AI solution built to grow your business
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: '⚙️', text: 'Automates your daily work so your', highlight: 'business grows on autopilot' },
                                { icon: '🤝', text: 'Understands your brand', highlight: 'like a real teammate' },
                                { icon: '🔧', text: 'Works seamlessly with your', highlight: 'favorite tools' },
                                { icon: '🎨', text: 'Keeps your', highlight: 'brand consistent', text2: 'across every channel' },
                                { icon: '📊', text: 'Learns, improves, and delivers', highlight: 'smarter results the more you use it' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                                    <p style={{ fontSize: '1.1rem', color: '#1a1a1a' }}>
                                        {item.text} <span style={{ color: '#4F46E5', fontWeight: 600 }}>{item.highlight}</span> {item.text2}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>$4,986</div>
                            <div style={{ fontSize: '0.9rem', color: '#10B981' }}>+$1,683</div>
                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>Revenue<br />This month</div>
                        </div>
                    </div>
                </div>

                {/* AI Memory Section */}
                <div style={{ marginBottom: '8rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: '#1a1a1a' }}>
                        The memory that powers your entire AI team
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '800px', margin: '0 auto 4rem' }}>
                        AI Employee learns your brand, goals, and customers — sharing that knowledge across every helper. Update it once, and your entire AI team works smarter, faster, and more on-brand everywhere.
                    </p>

                    <div className="departments-grid">
                        {/* Before */}
                        <div style={{ background: '#fff', padding: '3rem', borderRadius: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', textAlign: 'left' }}>
                            <h3 style={{ fontSize: '2.5rem', color: '#EF4444', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>
                                Before
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
                                🍕 Hot slices alert! Our pizza's so good, it's a little bit naughty!
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ color: '#EF4444', fontSize: '1rem' }}>✗ Generic tone</div>
                                <div style={{ color: '#EF4444', fontSize: '1rem' }}>✗ Long and robotic</div>
                                <div style={{ color: '#EF4444', fontSize: '1rem' }}>✗ Cold and impersonal</div>
                            </div>
                        </div>

                        {/* After */}
                        <div style={{ background: '#ECFDF5', padding: '3rem', borderRadius: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '2px solid #10B981', textAlign: 'left' }}>
                            <h3 style={{ fontSize: '2.5rem', color: '#10B981', marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>
                                After
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#1a1a1a', marginBottom: '2rem', lineHeight: 1.6 }}>
                                🍕 John's got your favorite slice waiting — 10% off just for you!
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ color: '#10B981', fontSize: '1rem' }}>1. Feels warm and human</div>
                                <div style={{ color: '#10B981', fontSize: '1rem' }}>2. Personal and engaging</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default DepartmentsPage;
