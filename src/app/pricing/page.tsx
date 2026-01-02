"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Users, Zap, Brain, Globe, Headphones, ShieldCheck, Lock, Star } from 'lucide-react';
import Image from 'next/image';
import { useWaitlist } from '@/context/WaitlistContext';

gsap.registerPlugin(ScrollTrigger);

const PricingPage = () => {
    const container = useRef(null);
    const { openWaitlist } = useWaitlist();

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.hero-card', { scale: 0.95, opacity: 0, duration: 1, ease: 'power3.out' })
            .from('.features-section', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
            .from('.included-section', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }, { scope: container });

    const mainFeatures = [
        {
            icon: <Users size={24} />,
            title: 'All 12+ helpers for most areas of your work',
            desc: 'Unlock Buddy, Soshie, Penn, Scout, Gigi, Rosary and more. From customer support to data analysis, to personal and business development. All helpers in one team.'
        },
        {
            icon: <Zap size={24} />,
            title: 'Tens of Use Cases for one-click work',
            desc: 'Do one-click work with Use Cases. Simply adjust and complete tasks in seconds. From bulk image generation, to summarizing today\'s emails, to optimizing websites.'
        },
        {
            icon: <Brain size={24} />,
            title: 'All the features for Brain AI',
            desc: 'Personalize your outputs for your unique thing based on your knowledge. Helpers can scrape websites and use all the information while completing your tasks.'
        },
        {
            icon: <Globe size={24} />,
            title: 'Complete tasks in 100+ languages',
            desc: 'Lisa Helpers support over 100+ native languages for all your needs.'
        },
        {
            icon: <Zap size={24} />,
            title: 'One easy-to-use platform',
            desc: 'Zero integrations. Zero headaches. One AI workspace for all your work.'
        }
    ];

    const includedHelpers = [
        { name: 'Lisa', role: 'Customer Support', color: '#e0e7ff' },
        { name: 'Penn', role: 'Copywriter', color: '#dcfce7' },
        { name: 'Buddy', role: 'Business Development', color: '#f3f4f6' },
        { name: 'Dexter', role: 'Data Analyst', color: '#fef3c7' }
    ];

    const additionalFeatures = [
        {
            icon: <Brain size={24} />,
            title: 'Customizable Brain AI',
            desc: 'Personalize your helpers even further by adding custom information about your brand, such as websites or files.'
        },
        {
            icon: <Zap size={24} />,
            title: 'More power with Use Cases',
            desc: 'Use Cases complete your tasks in just a few button clicks.'
        },
        {
            icon: <Globe size={24} />,
            title: 'Trained on 100,000+ unique data points',
            desc: 'Your helpers have been trained on over 100,000 unique data points of industry knowledge.'
        },
        {
            icon: <Brain size={24} />,
            title: 'Powered by the most powerful AI models',
            desc: 'Access to GPT-4, Claude, and other cutting-edge AI models.'
        }
    ];

    const buyingFeatures = [
        {
            icon: <Headphones size={24} />,
            title: '24/7 support',
            desc: 'Get help at all times with priority support'
        },
        {
            icon: <ShieldCheck size={24} />,
            title: 'Money-back guarantee',
            desc: 'Love it or get full refund within 14 days'
        },
        {
            icon: <Lock size={24} />,
            title: 'Privacy protection',
            desc: 'Your data is stored securely on the cloud with encryption'
        },
        {
            icon: <ShieldCheck size={24} />,
            title: 'Secure checkout',
            desc: '256-bit encrypted checkout with Stripe'
        }
    ];

    return (
        <main ref={container} style={{ paddingTop: '120px', paddingBottom: '5rem', background: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                {/* Hero Pricing Card */}
                <div className="hero-card pricing-hero-card">
                    <div className="pricing-hero-content">
                        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 500, marginBottom: '1rem', color: '#1a1a1a', fontFamily: 'var(--font-serif)', lineHeight: '1.2' }}>
                            Start with a single AI Employee. No long-term lock-in, no big setup cost.
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '0.75rem', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                            from <span style={{ fontSize: '1.6rem', fontWeight: 600, color: '#1a1a1a', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>₹15,600/month</span>
                        </p>
                        <p style={{ fontSize: '0.95rem', color: '#999' }}>
                            All 12+ AI Employee Helpers
                        </p>
                        <button onClick={openWaitlist} className="cta-button" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', border: 'none', cursor: 'pointer' }}>Join Waitlist Now...</button>
                    </div>
                    <div className="pricing-hero-image">
                        <Image
                            src="/images/agent-illus.png"
                            alt="AI Employees"
                            width={400}
                            height={400}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <div className="features-section" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 500, marginBottom: '2rem', color: '#1a1a1a', fontFamily: 'var(--font-serif)' }}>
                        Everything you're getting with AI Employee X
                    </h2>
                    <div style={{
                        background: '#fff',
                        borderRadius: '1.5rem',
                        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                        {mainFeatures.map((feature, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: '1.5rem',
                                marginBottom: i < mainFeatures.length - 1 ? '2rem' : 0,
                                paddingBottom: i < mainFeatures.length - 1 ? '2rem' : 0,
                                borderBottom: i < mainFeatures.length - 1 ? '1px solid #e5e7eb' : 'none'
                            }}>
                                <div style={{ color: '#4F46E5', flexShrink: 0 }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#999', marginTop: '3rem' }}>
                            14-day money-back guarantee
                        </p>
                    </div>
                </div>

                {/* Included with AI Employee X */}
                <div className="included-section" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>
                        Included with AI Employee X
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '2rem' }}>
                        Helpers: 12+ AI helpers for all your tasks
                    </p>
                    <div className="pricing-grid-section">
                        {includedHelpers.map((helper, i) => (
                            <div key={i} style={{
                                background: helper.color,
                                borderRadius: '1.5rem',
                                padding: 'clamp(1.5rem, 4vw, 2rem)',
                                color: '#1a1a1a',
                                minHeight: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid rgba(0,0,0,0.08)'
                            }}>
                                <div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', fontStyle: 'italic' }}>
                                        {helper.name}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                                        {helper.role}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: 'auto', marginLeft: '-2rem', marginRight: '-2rem', marginBottom: '-2rem' }}>
                                    <Image
                                        src="/images/agent-illus.png"
                                        alt={helper.name}
                                        width={400}
                                        height={400}
                                        style={{ objectFit: 'contain', opacity: 0.85 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* You're Also Getting */}
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: '#1a1a1a' }}>
                        You're also getting
                    </h2>
                    <div style={{
                        background: '#fff',
                        borderRadius: '1.5rem',
                        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        marginBottom: '4rem'
                    }}>
                        {additionalFeatures.map((feature, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: '1.5rem',
                                marginBottom: i < additionalFeatures.length - 1 ? '2rem' : 0,
                                paddingBottom: i < additionalFeatures.length - 1 ? '2rem' : 0,
                                borderBottom: i < additionalFeatures.length - 1 ? '1px solid #e5e7eb' : 'none'
                            }}>
                                <div style={{ color: '#4F46E5', flexShrink: 0 }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Buying with AI Employee */}
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: '#1a1a1a' }}>
                        Buying with AI Employee
                    </h2>
                    <div style={{
                        background: '#fff',
                        borderRadius: '1.5rem',
                        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                        {buyingFeatures.map((feature, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: '1.5rem',
                                marginBottom: i < buyingFeatures.length - 1 ? '2rem' : 0,
                                paddingBottom: i < buyingFeatures.length - 1 ? '2rem' : 0,
                                borderBottom: i < buyingFeatures.length - 1 ? '1px solid #e5e7eb' : 'none'
                            }}>
                                <div style={{ color: '#4F46E5', flexShrink: 0 }}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TRUST & GUARANTEE SECTION */}
                <div className="trust-section" style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Card 1: Trustpilot */}
                    <div className="pricing-trust-card">
                        <div style={{ padding: 'clamp(1.5rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star size={18} fill="currentColor" /> Rated excellent on Trustpilot
                            </div>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', color: '#111', letterSpacing: '-0.02em' }}>
                                Trusted by thousands of entrepreneurs
                            </h2>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>
                                Over 50,000 entrepreneurs from more than 100 countries around the globe trust Lisa.
                            </p>
                        </div>
                        <div style={{ background: '#ecfdf5', padding: 'clamp(1.5rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.5, color: '#064e3b', marginBottom: '2.5rem', fontWeight: 500 }}>
                                “Can say my first experiences of using Lisa X are very good, in the way you have a selection of assistants to converse with” <br />
                                <span style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.5rem', display: 'block' }}>– Steve Nelson, AU</span>
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#064e3b', fontSize: '1.1rem' }}>
                                Excellent 4.5 out of 5 <Star size={24} fill="#00b67a" color="#00b67a" style={{ background: '#00b67a', color: '#fff', padding: '2px' }} /> Trustpilot
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Guarantee */}
                    <div className="pricing-trust-card">
                        <div style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ color: '#ca8a04', fontWeight: 600, marginBottom: '1rem' }}>
                                Backed by money-back guarantee
                            </div>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', color: '#111', letterSpacing: '-0.02em' }}>
                                Risk-free guarantee with your order
                            </h2>
                            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '1.1rem' }}>
                                Enjoy access to Lisa completely risk-free. If you are not 100% satisfied, tell us within 14 days of buying Lisa Helpers and get a full refund.
                            </p>
                        </div>
                        <div style={{ background: '#fffbeb', padding: 'clamp(1.5rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: '#78350f', marginBottom: '2rem', fontWeight: 500 }}>
                                “Lisa Helpers take the experience a step further. As specialized assistants trained for distinct roles, they outperform standard interactions... making them invaluable for anyone looking to leverage the power of AI.” <br />
                                <span style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.5rem', display: 'block' }}>– David, PT</span>
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{
                                    width: '70px', height: '70px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800, fontSize: '0.9rem', textAlign: 'center', lineHeight: 1, color: '#fff', border: '3px dashed #b45309', transform: 'rotate(-10deg)'
                                }}>
                                    14<br />DAY
                                </div>
                                <div style={{ fontWeight: 700, color: '#92400e', fontSize: '1.2rem', maxWidth: '200px', lineHeight: 1.2 }}>
                                    14-day full money-back guarantee
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Support */}
                    <div className="pricing-trust-card">
                        <div style={{ padding: 'clamp(1.5rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ color: '#2563eb', fontWeight: 600, marginBottom: '1rem' }}>
                                    Available at any time
                                </div>
                                <h2 style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', color: '#111', letterSpacing: '-0.02em' }}>
                                    High-priority customer support
                                </h2>
                            </div>
                            <p style={{ color: '#666', lineHeight: 1.6, marginTop: '2rem', fontSize: '1.1rem' }}>
                                Cassie works 24/7 to support you. Backed by reliable human support whenever you need it.
                            </p>
                        </div>
                        <div style={{ background: '#1e293b', padding: 'clamp(1.5rem, 5vw, 3.5rem)', position: 'relative', overflow: 'hidden', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.5, marginBottom: '4rem', fontWeight: 500, position: 'relative', zIndex: 10 }}>
                                “I have been using Lisa for at least 6 months now and like everything Lisa has to offer. It has made my workload that much less. Their customer service is so amazing.” <br />
                                <span style={{ fontSize: '1rem', opacity: 0.7, marginTop: '0.5rem', display: 'block' }}>– Faydra, CA</span>
                            </p>

                            <div style={{
                                position: 'absolute',
                                bottom: '-2rem',
                                right: '-2rem',
                                width: '300px',
                                height: '250px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end'
                            }}>
                                <Image
                                    src="/images/agent-illus.png"
                                    alt="Support Team"
                                    width={300}
                                    height={300}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default PricingPage;
