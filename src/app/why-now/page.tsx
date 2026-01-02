"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { TrendingUp, Trophy, Zap, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyNowPage = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' })
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.cta-button', { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4');

    gsap.from('.why-now-floating-icon', {
      y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.5
    });

    gsap.from('.why-now-character-card', {
      scrollTrigger: { trigger: '.why-now-characters-row', start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
    });

    gsap.from('.benefit-card', {
      scrollTrigger: { trigger: '.why-now-benefits-grid', start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <main ref={container} style={{ paddingTop: '120px', paddingBottom: '5rem', background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero Section */}
      <div className="why-now-hero">
        <div className="why-now-hero-content">
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1rem', fontWeight: 500 }}>
            AI Employee integrations.
          </p>
          <h1 className="hero-title" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '1.5rem',
            color: '#1a1a1a',
            lineHeight: 1.2,
            fontWeight: 400
          }}>
            All your tools in<br />
            <span style={{ color: '#4F46E5' }}>one place.</span>
          </h1>

          <button className="cta-button" style={{
            background: '#4F46E5', color: '#fff', border: 'none', padding: '1rem 2.5rem',
            borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', marginBottom: '3rem'
          }}>
            Get Lisa
          </button>

          {/* Floating Integration Icons */}
          <div className="why-now-floating-icon" style={{ top: '0', left: '15%' }}>
            <div style={{ width: '40px', height: '40px', background: '#0A66C2', borderRadius: '0.5rem' }}></div>
          </div>
          <div className="why-now-floating-icon" style={{ top: '10%', right: '10%' }}>
            <div style={{ width: '40px', height: '40px', background: '#EA4335', borderRadius: '0.5rem' }}></div>
          </div>
          <div className="why-now-floating-icon" style={{ top: '30%', left: '8%' }}>
            <div style={{ width: '40px', height: '40px', background: '#E4405F', borderRadius: '0.5rem' }}></div>
          </div>
          <div className="why-now-floating-icon" style={{ top: '35%', right: '15%' }}>
            <div style={{ width: '40px', height: '40px', background: '#4285F4', borderRadius: '0.5rem' }}></div>
          </div>
          <div className="why-now-floating-icon" style={{ bottom: '10%', left: '12%' }}>
            <div style={{ width: '40px', height: '40px', background: '#00A67E', borderRadius: '0.5rem' }}></div>
          </div>
          <div className="why-now-floating-icon" style={{ bottom: '15%', right: '8%' }}>
            <div style={{ width: '40px', height: '40px', background: '#1877F2', borderRadius: '0.5rem' }}></div>
          </div>
        </div>

        {/* Characters Row */}
        <div className="why-now-characters-row">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="why-now-character-card">
              <div style={{
                position: 'relative', width: '100%', height: '100%', display: 'flex',
                marginBottom: '10px', marginLeft: '10px', alignItems: 'flex-end', justifyContent: 'center'
              }}>
                <Image
                  src="/images/agent-illus.png"
                  alt={`AI Employee ${i}`}
                  width={600} height={600}
                  style={{ objectFit: 'contain', display: 'block', marginBottom: '-10px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* One Click Section */}
      <div className="why-now-one-click-section">
        <div className="why-now-grid">
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)',
              marginBottom: '1.5rem', color: '#1a1a1a', lineHeight: 1.2
            }}>
              One click.<br />Fully synced.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.7, marginBottom: '2rem' }}>
              AI Employee integrations make your work simple and stress-free. With just one click, our AI Helpers connect your favorite tools, keeping everything organized and working together smoothly. No coding needed—just easy integrations that help your team get things done faster and smarter!
            </p>
            <button style={{
              background: '#4F46E5', color: '#fff', border: 'none', padding: '1rem 2.5rem',
              borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer'
            }}>
              Get Lisa
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '300px', height: '600px', background: '#fff', borderRadius: '2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', color: '#666' }}>
                <p>Integration Demo</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Google Calendar Sync</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="why-now-benefits-grid" style={{ maxWidth: '1200px', margin: '0 auto 8rem', padding: '0 2rem' }}>
        <div className="benefit-card" style={{ background: '#fff', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ width: '50px', height: '50px', background: '#e0e7ff', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <TrendingUp size={24} color="#4F46E5" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>Scale Without Limits</h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            AI Employees work 24/7 without breaks, sick days, or burnout. Scale your operations instantly without the overhead of traditional hiring.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} color="#10B981" /> <span style={{ fontSize: '0.95rem', color: '#666' }}>24/7 availability</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} color="#10B981" /> <span style={{ fontSize: '0.95rem', color: '#666' }}>Instant scaling</span>
            </div>
          </div>
        </div>

        <div className="benefit-card" style={{ background: '#fff', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ width: '50px', height: '50px', background: '#fef3c7', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Trophy size={24} color="#F59E0B" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>Stay Competitive</h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Your competitors are already adopting AI. Companies using AI Employees gain speed, accuracy, and cost advantages that traditional teams can't match.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} color="#10B981" /> <span style={{ fontSize: '0.95rem', color: '#666' }}>Market advantage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} color="#10B981" /> <span style={{ fontSize: '0.95rem', color: '#666' }}>Future-proof business</span>
            </div>
          </div>
        </div>

        <div className="benefit-card" style={{ background: '#fff', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Zap size={24} color="#10B981" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>Massive Cost Savings</h3>
          <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Get the output of a full-time employee at a fraction of the cost. AI Employees like Lisa handle customer support, sales, marketing, and more.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} color="#10B981" /> <span style={{ fontSize: '0.95rem', color: '#666' }}>Starting at ₹20,000/month</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={18} color="#10B981" /> <span style={{ fontSize: '0.95rem', color: '#666' }}>No training costs</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '2rem', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontFamily: 'var(--font-serif)',
          marginBottom: '1rem',
          color: '#1a1a1a'
        }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join thousands of businesses already using AI Employees to scale faster and work smarter.
        </p>
        <button style={{
          background: '#4F46E5', color: '#fff', border: 'none', padding: '1rem 3rem',
          borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer'
        }}>
          Get Lisa
        </button>
      </div>

    </main>
  );
};

export default WhyNowPage;
