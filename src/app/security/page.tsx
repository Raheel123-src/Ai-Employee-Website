"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Users, CreditCard, ShieldCheck, Headphones, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SecurityPage = () => {
    const container = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.page-header', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
            .from('.main-cards', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
            .from('.things-section', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }, { scope: container });

    const helpCategories = [
        { title: 'Getting Started', icon: <BookOpen size={24} />, authors: 'By Rokas and 2 others', articles: '12 articles' },
        { title: 'Lisa Helpers', icon: <Users size={24} />, authors: 'By Emily and 2 others', articles: '17 articles' },
        { title: 'Billing and Subscriptions', icon: <CreditCard size={24} />, authors: 'By Rokas and 1 other', articles: '4 articles' }
    ];

    const thingsToLove = [
        {
            icon: <ShieldCheck size={32} />,
            title: 'Guarantee',
            description: 'Each Lisa Helper comes with a 14-day money-back guarantee.',
            link: '#'
        },
        {
            icon: <Headphones size={32} />,
            title: 'Support',
            description: 'Our Lisa support works 24/7, answering all your questions. Backed by reliable human support.',
            link: '#'
        },
        {
            icon: <Lock size={32} />,
            title: 'Privacy',
            description: 'We take your privacy seriously. Learn more about our privacy policy.',
            link: '#'
        }
    ];

    return (
        <main ref={container} style={{ paddingTop: '120px', paddingBottom: '5rem', background: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Header */}
                <div className="page-header security-page-header">
                    <div>
                        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                            Get help from AI Employee
                        </h1>
                        <p style={{ fontSize: '1rem', color: '#666' }}>
                            Get instant help with your plan and find answers to your questions.
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>Need help?</div>
                        <Link href="mailto:help@lisa.ai" style={{ color: '#4F46E5', textDecoration: 'none', fontSize: '0.95rem' }}>
                            help@lisa.ai
                        </Link>
                    </div>
                </div>

                {/* Main Cards */}
                <div className="main-cards security-main-cards">

                    {/* Ask Lisa Directly */}
                    <div className="security-card">
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>
                            Ask Lisa Directly
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            Chat with our support representative for instant responses to your most needed questions.
                        </p>
                        <Link href="#" style={{ display: 'inline-block', color: '#4F46E5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, marginBottom: 'auto' }}>
                            Start Chat
                        </Link>
                        <div className="security-image-container">
                            <Image
                                src="/images/agent-illus.png"
                                alt="Lisa Support"
                                width={900}
                                height={900}
                                style={{ objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                    </div>

                    {/* Visit Our Help Center */}
                    <div className="security-card" style={{ display: 'block' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>
                            Visit Our Help Center
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            Browse our Help Center for quick answers to common questions and detailed guides to get started.
                        </p>
                        <Link href="#" style={{ display: 'inline-block', color: '#4F46E5', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, marginBottom: '2rem' }}>
                            Visit Help Center
                        </Link>

                        {/* Help Categories */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {helpCategories.map((cat, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#f9fafb',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    <div style={{
                                        background: '#4F46E5',
                                        color: '#fff',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {cat.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.25rem' }}>
                                            {cat.title}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                            {cat.authors} • {cat.articles}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Things to Love About Lisa */}
                <div className="things-section">
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '3rem', color: '#1a1a1a' }}>
                        Things to love about AI Employee
                    </h2>
                    <div className="security-things-grid">
                        {thingsToLove.map((item, i) => (
                            <div key={i}>
                                <div style={{ marginBottom: '1rem', color: '#1a1a1a' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1a1a1a' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6, marginBottom: '1rem' }}>
                                    {item.description}
                                </p>
                                <Link href={item.link} style={{ color: '#4F46E5', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                                    Learn More
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
};

export default SecurityPage;
