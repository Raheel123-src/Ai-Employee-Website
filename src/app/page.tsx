"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhyNowScroll from "@/components/WhyNowScroll/WhyNowScroll";
import ParticleWave from "@/components/ParticleWave/ParticleWave";
import SplitTextReveal from "@/components/SplitTextReveal/SplitTextReveal";
import SmooothPoster from "@/components/SmooothPoster/SmooothPoster";
import TestimonialSlider from "@/components/TestimonialSlider/TestimonialSlider";
import { useWaitlist } from '@/context/WaitlistContext';

gsap.registerPlugin(ScrollTrigger);

const heroImages = ['person1.png', 'person2.png', 'person3.png', 'person4.png', 'person5.png', 'person6.png', 'person7.png'];

const featurePills = [
  {
    title: 'Always-on',
    description: 'Never sleeps, never takes a break. Your AI employees are available 24/7 to handle tasks instantly.',
  },
  {
    title: 'More Accurate',
    description: 'Eliminate human error. AI follows your SOPs and checklists precisely every single time.',
  },
  {
    title: 'Cheaper',
    description: 'Get the output of a full-time employee at a fraction of the cost, starting from just ₹20,000/month.',
  },
];



const conceptHighlights = [
  'Never forgets a follow-up',
  'Never gets tired of repetitive tasks',
  'Learns from your data, templates, and feedback',
  'Frees your human team to focus on strategy, relationships, and decisions',
];





const Home = () => {
  const container = useRef(null);
  const { openWaitlist } = useWaitlist();
  const repeatedImages = Array.from({ length: 4 }, () => heroImages).flat();

  useGSAP(() => {
    // Hero Animation
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.6')
      .from('.carousel-container', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8')
      .from('.feature-pills .pill', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.8');



    // Concept Section
    gsap.from('.concept-intro', {
      scrollTrigger: {
        trigger: '.concept',
        start: 'top 75%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.concept-panel', {
      scrollTrigger: {
        trigger: '.concept',
        start: 'top 75%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });

    // Custom AI Section
    gsap.from('.custom-ai .bento-card', {
      scrollTrigger: {
        trigger: '.custom-ai',
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Hiring Steps
    gsap.from('.step-card', {
      scrollTrigger: {
        trigger: '.hiring-steps',
        start: 'top 75%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Security Section
    gsap.from('.security-item', {
      scrollTrigger: {
        trigger: '.security',
        start: 'top 75%',
      },
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Pricing Section
    gsap.from('.pricing-card', {
      scrollTrigger: {
        trigger: '.pricing',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });

    // Testimonials
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

  }, { scope: container });

  return (
    <main ref={container}>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line-1">Hire AI Employees</span>
            <span className="title-line-2">for your team</span>
          </h1>
          <p className="hero-subtitle">
            Scale your company faster with AI teammates who are
            <br />
            Always-on | More accurate | Cheaper | 24x7 available
          </p>
          <button onClick={openWaitlist} className="cta-button" style={{ border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
            Join Waitlist Now...
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="carousel-container">
          <div className="carousel-track">
            {repeatedImages.map((image, index) => (
              <div className="card" key={`${image}-${index}`}>
                <img src={`/images/${image}`} alt="Team member" />
              </div>
            ))}
          </div>
          <div className="fade-left" />
          <div className="fade-right" />
        </div>

        <div className="feature-pills">
          {featurePills.map(pill => (
            <div className="pill" key={pill.title}>
              <h3>{pill.title}</h3>
              <p>{pill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-now" id="why-now">
        <WhyNowScroll />
      </section>

      <section className="concept" id="concept">
        <div className="concept-grid">
          <div className="concept-intro">
            <SplitTextReveal text="What is an AI Employee?" />
            <p>
              An AI Employee is a digital team member that works like a real employee, but lives inside your software instead of a cabin or cubicle. It connects to the tools you already use every day – G-Suite, Microsoft (Outlook, Teams,
              Excel, etc.), Sheets, Docs, email, web, and internal documents – and then takes responsibility for a clear role, like Sales Assistant, HR Recruiter, L&amp;D Coordinator, Ops Analyst, or Finance Junior.
            </p>
            <p className="highlight">
              So when you &quot;hire&quot; an AI Employee, you&apos;re not buying a tool. You&apos;re adding a connected, role-based digital worker to your company that understands your work, acts inside your systems, and keeps improving
              over time – at a fraction of the cost of a full-time hire.
            </p>
          </div>
          <div className="concept-panel">
            <div className="concept-panel-header">
              <span className="status-dot" />
              <span>AI Employee DNA</span>
            </div>
            <div className="concept-panel-content">
              <h3>Think of it as a 24x7 junior team member who:</h3>
              <ul>
                {conceptHighlights.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="concept-badges">
                <span>Always-on</span>
                <span>Tool-native</span>
                <span>Process-aware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities" id="capabilities" style={{ padding: 0, minHeight: 'auto' }}>
        <ParticleWave />
      </section>

      <section className="departments" id="departments" style={{ padding: 0, minHeight: 'auto' }}>
        <SmooothPoster />
      </section>

      {/* Custom AI Employees */}
      <section className="custom-ai">
        <div className="section-container">
          <h2 className="section-title">Custom AI Employees for Your Organisation</h2>
          <p className="section-desc">
            Every business works differently, so your AI Employee should too. Along with our ready-made roles, we also build fully custom AI Employees based on your processes, tools and KPIs.
          </p>
          <div className="bento-grid" style={{ marginTop: '3rem' }}>
            <div className="bento-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Follow your SOPs</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Strictly follows your checklists, templates, and approval flows.</p>
            </div>
            <div className="bento-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Work inside your stack</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Seamlessly integrates with G-Suite, Microsoft, CRMs, ERPs, and internal portals.</p>
            </div>
            <div className="bento-card" style={{ padding: '2rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Use your tone</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Matches your brand voice for emails, messages, and reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Hire */}
      <section className="hiring-steps">
        <div className="section-container">
          <h2 className="section-title">It’s very easy to hire & onboard</h2>
          <div className="steps-grid">
            {[
              { step: '01', title: 'Decide the department', desc: 'Pick where you want impact first – Sales, Marketing, HR, Ops, etc.' },
              { step: '02', title: 'Choose the role', desc: 'Example: SDR, Recruiter, L&D Coordinator, Ops Tracker.' },
              { step: '03', title: 'Log in to Lisa', desc: 'Use your Lisa account to access the AI Employee marketplace.' },
              { step: '04', title: 'Select your AI Employee', desc: 'Pick a ready-made role or a custom one designed for your process.' },
              { step: '05', title: 'Integrate your systems', desc: 'Connect G-Suite, Microsoft, Sheets, and other tools in a few clicks.' },
              { step: '06', title: 'See work getting done', desc: 'Productive from Day 1—reading, drafting, and updating immediately.' }
            ].map((item, i) => (
              <div key={i} className="step-card">
                <span className="step-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="security">
        <div className="section-container">
          <h2 className="section-title">Data Security: Your Most Trustworthy “Employee”</h2>
          <p className="section-desc">
            Your AI Employee is designed to behave like your most confidential employee—only faster, more consistent, and never careless with data.
          </p>
          <div className="security-grid">
            {[
              'Treats your data like classified info',
              'Works inside secure systems (G-Suite/Microsoft)',
              'Encrypts data in transit and at rest',
              'Respects your SOPs & policies',
              'Keeps a complete audit trail'
            ].map((text, i) => (
              <div key={i} className="security-item">
                <div className="security-icon" />
                <p className="security-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing">
        <div className="pricing-card">
          <h2 className="pricing-title">Get started from just ₹20,000/month</h2>
          <p className="pricing-desc">
            Start with a single AI Employee. No long-term lock-in, no big setup cost.
          </p>
          <button onClick={openWaitlist} className="cta-button" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', border: 'none', cursor: 'pointer' }}>Join Waitlist Now...</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" style={{ padding: 0, height: '100vh', overflow: 'hidden' }}>
        <TestimonialSlider />
      </section>
    </main>
  );
};

export default Home;
