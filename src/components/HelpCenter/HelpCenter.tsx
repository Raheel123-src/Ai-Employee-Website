import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface HelpCard {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
}

interface FAQItem {
    q: string;
    a: string;
}

interface HelpCenterProps {
    heroTitle: string;
    heroDesc: string;
    cards: HelpCard[];
    faqs: FAQItem[];
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ heroTitle, heroDesc, cards, faqs }) => {
    const container = useRef(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' })
            .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
        gsap.from('.help-card', {
            scrollTrigger: { trigger: '.help-grid', start: 'top 85%' },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
        });
        gsap.from('.faq-item', {
            scrollTrigger: { trigger: '.faq-section', start: 'top 80%' },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
        });
    }, { scope: container });

    return (
        <main ref={container} className="page-container" style={{ paddingTop: '120px', paddingBottom: '5rem', background: 'var(--bg-cream)' }}>
            <section className="section-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Hero */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(3rem,6vw,4.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>{heroTitle}</h1>
                    <p className="hero-desc" style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>{heroDesc}</p>
                </div>

                {/* Help Cards Grid */}
                <div className="help-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                    {cards.map((item, i) => (
                        <Link key={i} href={item.href} className="help-card" style={{
                            background: '#fff',
                            padding: '2rem',
                            borderRadius: '1.5rem',
                            border: '1px solid var(--border-light)',
                            textAlign: 'center',
                            textDecoration: 'none',
                            color: 'var(--text-dark)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                            <div style={{ background: 'var(--bg-cream)', padding: '0.8rem', borderRadius: '50%' }}>{item.icon}</div>
                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{item.description}</p>
                            <span style={{ marginTop: '0.5rem', color: 'var(--text-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                Learn More <ArrowRight size={16} />
                            </span>
                        </Link>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="faq-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                    {faqs.map((faq, i) => {
                        const isOpen = openFaq === i;
                        return (
                            <div key={i} className="faq-item" style={{
                                marginBottom: '1rem',
                                background: '#fff',
                                borderRadius: '1rem',
                                border: '1px solid var(--border-light)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: isOpen ? 'var(--shadow-md)' : 'none',
                            }} onClick={() => setOpenFaq(isOpen ? null : i)}>
                                <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <HelpCircle size={18} color="var(--text-muted)" /> {faq.q}
                                    </h3>
                                    {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                                </div>
                                <div style={{
                                    maxHeight: isOpen ? '200px' : '0',
                                    opacity: isOpen ? 1 : 0,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    padding: isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem',
                                }}>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};
