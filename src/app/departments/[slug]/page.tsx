"use client";

import React, { useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWaitlist } from '@/context/WaitlistContext';
import { ArrowLeft, Quote, Zap, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const departmentsData: Record<string, any> = {
    'marketing': {
        title: 'Marketing AI',
        name: 'Rhea',
        role: 'Head of Marketing',
        themeColor: '#e07a2c',
        desc: 'I boost your brand. I analyze trends, create content calendars, and ensure your message reaches the right audience.',
        traits: ['Creative', 'Trend-Savvy', 'Strategic'],
        tasks: ['Analyze market trends', 'Create content calendars', 'Optimize ad campaigns', 'Monitor brand sentiment', 'Generate viral hooks'],
        powerUps: [
            { title: 'Trend Hunter', desc: 'Spot viral trends early.' },
            { title: 'Content Engine', desc: 'Generate posts at scale.' },
            { title: 'Ad Optimizer', desc: 'Maximize ROI automatically.' },
            { title: 'Sentiment Analysis', desc: 'Track brand health.' }
        ],
        tools: ['HubSpot', 'Google Analytics', 'Canva', 'Meta Ads'],
        imageIndex: 0,
        specificImages: {
            hero: '/images/rhea-marketing/hero.png',
            section2: '/images/rhea-marketing/a09c83c9-620a-4768-a0c9-2f8b95143b82_0.png',
            grid1: '/images/rhea-marketing/grid1.jpg',
            grid2: '/images/rhea-marketing/a09cfda5-0a6a-4147-8eb2-030ac8125978_0.jpg',
            grid3: '/images/rhea-marketing/a09cfe71-1a2a-4883-997d-6d92521aba21_0.jpg',
            section4: '/images/rhea-marketing/4thsection.png',
            task1: '/images/rhea-marketing/generate-content%20Background%20Removed.png',
            task2: '/images/rhea-marketing/brand-sentiment.jpg'
        }
    },
    'sales': {
        title: 'Sales AI',
        name: 'Arjun',
        role: 'Head of Sales',
        themeColor: '#991b1b',
        desc: 'I close deals. I automate outreach, handle objections, and keep your pipeline full 24/7.',
        traits: ['Persuasive', 'Relentless', 'Data-Driven'],
        tasks: ['Automate cold outreach', 'Qualify inbound leads', 'Follow up with prospects', 'Schedule meetings', 'Update CRM records'],
        powerUps: [
            { title: 'Auto-Outreach', desc: 'Send personalized emails.' },
            { title: 'Objection Handler', desc: 'Reply to hesitation instantly.' },
            { title: 'Pipeline Sync', desc: 'Keep CRM up to date.' },
            { title: 'Meeting Booker', desc: 'Coordinate calendars.' }
        ],
        tools: ['Salesforce', 'LinkedIn Sales Nav', 'Outreach', 'ZoomInfo'],
        imageIndex: 1,
        specificImages: {
            hero: '/images/arjun%20-%20sales/ac7c6544fa21a9c971c70a0e0c3e1b7c_1765521258.png',
            section2: '/images/arjun%20-%20sales/a09c84e0-c832-4a94-aed2-b77faa05c5fd_0.png',
            grid1: '/images/arjun%20-%20sales/a09d2aca-d79f-462e-b554-91ff300e1653_0.jpg',
            grid2: '/images/arjun%20-%20sales/a09d3205-a3bb-406e-8593-a540a1edac99_0.jpg',
            grid3: '/images/arjun%20-%20sales/a09d2f0c-38e1-4d50-b50b-40543d6bd8ce_0.png',
            section4: '/images/arjun%20-%20sales/a0b51da6-d667-45ed-9de3-a24e1169d779_0.png'
        }
    },
    'operations': {
        title: 'Operations AI',
        name: 'Mira',
        role: 'Operations Lead',
        themeColor: '#7c3aed',
        desc: 'I optimize everything. I track metrics, manage resources, and ensure smooth business operations.',
        traits: ['Efficient', 'Organized', 'Proactive'],
        tasks: ['Track KPIs & Metrics', 'Resource allocation', 'Monitor workflows', 'Generate status reports', 'Optimize processes'],
        powerUps: [
            { title: 'Process Audit', desc: 'Identify bottlenecks.' },
            { title: 'Resource Planner', desc: 'Allocate constraints effectively.' },
            { title: 'Auto-Reporting', desc: 'Weekly insights delivered.' },
            { title: 'Workflow Trigger', desc: 'Automate handoffs.' }
        ],
        tools: ['Notion', 'Asana', 'Tableau', 'Zapier'],
        imageIndex: 2,
        specificImages: {
            hero: '/images/mira-operations/hero.png',
            section2: '/images/mira-operations/2ndsection.jpg',
            grid1: '/images/mira-operations/grid1.jpg',
            grid2: '/images/mira-operations/grid2.jpg',
            grid3: '/images/mira-operations/grid3.jpg',
            section4: '/images/mira-operations/4thsection.png'
        }
    },
    'it': {
        title: 'IT Support AI',
        name: 'Neil',
        role: 'IT Specialist',
        themeColor: '#0f766e',
        desc: 'I keep systems running. I manage security, troubleshoot issues, and oversee your tech stack.',
        traits: ['Secure', 'Technical', 'Reliable'],
        tasks: ['Monitor system uptime', 'Manage access controls', 'Troubleshoot tickets', 'Oversee security audits', 'Deploy software updates'],
        powerUps: [
            { title: 'Cyber Sentinel', desc: 'Detect threats in real-time.' },
            { title: 'Auto-Patch', desc: 'Keep systems updated.' },
            { title: 'Access Manager', desc: 'Provision/Deprovision users.' },
            { title: 'Ticket Resolver', desc: 'Fix common IT issues.' }
        ],
        tools: ['Jira', 'Okta', 'CrowdStrike', 'AWS'],
        imageIndex: 3,
        specificImages: {
            hero: '/images/neil%20-%20it/hero.png',
            section2: '/images/neil%20-%20it/2ndsection.jpg',
            grid1: '/images/neil%20-%20it/grid1.jpg',
            grid2: '/images/neil%20-%20it/grid2.jpg',
            grid3: '/images/neil%20-%20it/grid3.jpg',
            section4: '/images/neil%20-%20it/4thsection.png'
        }
    },
    'learning-development': {
        title: 'L&D AI',
        name: 'Priti',
        role: 'Learning & Development',
        themeColor: '#f59e0b',
        desc: 'I train your team. I create courses, track progress, and ensure everyone is upskilling effectively.',
        traits: ['Educational', 'Growth-Minded', 'Detailed'],
        tasks: ['Design training modules', 'Track employee progress', 'Onboard new hires', 'Suggest learning paths', 'Certify skills'],
        powerUps: [
            { title: 'Course Builder', desc: 'Create content from docs.' },
            { title: 'Progress Tracker', desc: 'Monitor completion rates.' },
            { title: 'Skill Gap Analysis', desc: 'Identify training needs.' },
            { title: 'Quiz Generator', desc: 'Test knowledge retention.' }
        ],
        tools: ['Lessonly', 'Udemy', 'Workday', 'LMS'],
        imageIndex: 4,
        specificImages: {
            hero: '/images/priti-learning-development/38de77dba06dc81b6cb4406b60361b33_1765529776.png',
            section2: '/images/priti-learning-development/a09ccf37-08f9-45b7-aadb-35d997e98e93_0.png',
            grid1: '/images/priti-learning-development/a09d71ec-70e0-4805-b72a-fe0758efe896_0.jpg',
            grid2: '/images/priti-learning-development/a09d7f19-9c77-4ece-9a50-6e4dacddedc8_0.jpg',
            grid3: '/images/priti-learning-development/a0b54ffe-360a-401f-a2f4-9854143cfa63_0.jpg',
            section4: '/images/priti-learning-development/a0b5789f-89d1-4a26-9f35-2888e80852fc_0.jpg'
        }
    },
    'finance': {
        title: 'Finance AI',
        name: 'Vivaan',
        role: 'Head of Finance',
        themeColor: '#d4c4a8',
        desc: 'I manage the books. I track expenses, forecast revenue, and handle payroll with precision.',
        traits: ['Accurate', 'Compliant', 'Analytical'],
        tasks: ['Track daily expenses', 'Forecast monthly revenue', 'Process payroll', 'Audit compliance', 'Generate tax reports'],
        powerUps: [
            { title: 'Expense Auditor', desc: 'Flag anomalies via AI.' },
            { title: 'Cashflow Predictor', desc: 'Forecast future runway.' },
            { title: 'Payroll Bot', desc: 'Automate salary dispursal.' },
            { title: 'Tax Compliance', desc: 'Ensure regulatory adherence.' }
        ],
        tools: ['QuickBooks', 'Xero', 'Expensify', 'Stripe'],
        imageIndex: 5,
        specificImages: {
            hero: '/images/vivaan%20-%20finance/1da7079f57286cb7f8eea7d493a85445_1765529033.png',
            section2: '/images/vivaan%20-%20finance/a09cc8e9-b91f-4e06-8fca-1aba244a7e24_0.png',
            grid1: '/images/vivaan%20-%20finance/a09d890c-0811-4ca3-b17d-21b771310dd8_0.jpg',
            grid2: '/images/vivaan%20-%20finance/a09d8faa-e6da-4a73-b113-6be45418d628_0.jpg',
            grid3: '/images/vivaan%20-%20finance/a09d90f0-e3e4-42db-8019-595cb6251954_0.jpg',
            section4: '/images/vivaan%20-%20finance/a0bd5e79-9fa6-45b8-8d7b-431883bc1a24_0.jpg'
        }
    },
    'placements': {
        title: 'Placements AI',
        name: 'Advaith',
        role: 'Placements Officer',
        themeColor: '#6f4e37',
        desc: 'I connect talent. I manage campus drives, coordinate interviews, and help students find careers.',
        traits: ['Connector', 'Organized', 'Supportive'],
        tasks: ['Coordinate campus drives', 'Screen student resumes', 'Schedule interviews', 'Track placement stats', 'Manage corporate relations'],
        powerUps: [
            { title: 'Drive Coordinator', desc: 'Manage logistics seamlessly.' },
            { title: 'Resume Screener', desc: 'Match students to jobs.' },
            { title: 'Interview Scheduler', desc: 'Align panels and candidates.' },
            { title: 'Success Metrics', desc: 'Track placement rates.' }
        ],
        tools: ['LinkedIn', 'Handshake', 'Google Sheets', 'Zoom'],
        imageIndex: 6,
        specificImages: {
            hero: '/images/advaith%20-%20placements/2301569e6243eebe740d47ab26d1dd83_1765529487.png',
            section2: '/images/advaith%20-%20placements/a09d3c20-4c20-43c2-b33b-6153a060fdff_0.png',
            grid1: '/images/advaith%20-%20placements/a09ccd24-c743-45b1-8944-8d91fc267145_0.jpg',
            grid2: '/images/advaith%20-%20placements/a09d4010-fba4-4385-929a-77bb75c95ae0_0.jpg',
            grid3: '/images/advaith%20-%20placements/a09d4761-4772-42b1-8492-ff96ca363770_0.jpg',
            section4: '/images/advaith%20-%20placements/a0bd6771-acbe-45db-859b-8993b1cfa8ef_0.jpg'
        }
    },
    'administrative': {
        title: 'Admin AI',
        name: 'Kartik',
        role: 'Administrative Officer',
        themeColor: '#14532d',
        desc: 'I handle the logistics. From scheduling to facility management, I keep the office organized.',
        traits: ['Organized', 'Efficient', 'Reliable'],
        tasks: ['Manage facility requests', 'Schedule office events', 'Handle inventory', 'Coordinate travel', 'Process reimbursements'],
        powerUps: [
            { title: 'Event Planner', desc: 'Organize office activities.' },
            { title: 'Inventory Tracker', desc: 'Never run out of supplies.' },
            { title: 'Travel Desk', desc: 'Book flights and hotels.' },
            { title: 'Expense Approver', desc: 'Streamline petty cash.' }
        ],
        tools: ['Office 365', 'Envoy', 'TravelPerk', 'Slack'],
        imageIndex: 7,
        specificImages: {
            hero: '/images/kartik%20-%20administrative/0e54bdf34d86eb79c1291c68aaa5610c_1765529311.png',
            section2: '/images/kartik%20-%20administrative/a0bd6b3b-087a-45b8-bb88-54d5d4145fb2_0.png',
            grid1: '/images/kartik%20-%20administrative/a09d6e3a-8885-4a49-a382-fd9c670fa011_0.jpg',
            grid2: '/images/kartik%20-%20administrative/a09d6c61-8513-4df2-b74e-6e61f6e19022_0.jpg',
            grid3: '/images/kartik%20-%20administrative/a09d6cf5-3fdd-484c-9f50-dee73f875cf7_0.jpg',
            section4: '/images/kartik%20-%20administrative/a09cca74-f1bb-4e99-bd80-fa13288a64f3_0.jpg'
        }
    },
    'human-resources': {
        title: 'HR AI',
        name: 'Anaya',
        role: 'HR Manager',
        themeColor: '#603270',
        desc: 'I care for people. I screen resumes, onboard hires, and ensure a positive company culture.',
        traits: ['Empathetic', 'People-First', 'Compliant'],
        tasks: ['Screen candidate resumes', 'Conduct exit interviews', 'Manage benefits', 'Resolve grievances', 'Plan team building'],
        powerUps: [
            { title: 'Culture Pulse', desc: 'Gauge employee sentiment.' },
            { title: 'Onboarding Bot', desc: 'Welcome new hires smoothly.' },
            { title: 'Benefits Admin', desc: 'Simplify insurance enrollments.' },
            { title: 'Policy Answer-Bot', desc: 'Instant HR FAQ answers.' }
        ],
        tools: ['BambooHR', 'Workday', 'CultureAmp', 'Slack'],
        imageIndex: 8,
        specificImages: {
            hero: '/images/anaya-human%20resources/hero.png',
            section2: '/images/anaya-human%20resources/2ndsection.png',
            grid1: '/images/anaya-human%20resources/grid1.jpg',
            grid2: '/images/anaya-human%20resources/grid2.png',
            grid3: '/images/anaya-human%20resources/grid3.jpg',
            section4: '/images/anaya-human%20resources/4thsection.png'
        }
    }
};

const heroImages = [
    '/images/rhea-marketing/rhea-carousel.jpeg',
    '/images/arjun%20-%20sales/ac7c6544fa21a9c971c70a0e0c3e1b7c_1765521258.png',
    '/images/mira-operations/hero.png',
    '/images/neil%20-%20it/hero.png',
    '/images/priti-learning-development/38de77dba06dc81b6cb4406b60361b33_1765529776.png',
    '/images/vivaan%20-%20finance/1da7079f57286cb7f8eea7d493a85445_1765529033.png',
    '/images/advaith%20-%20placements/2301569e6243eebe740d47ab26d1dd83_1765529487.png',
    '/images/kartik%20-%20administrative/0e54bdf34d86eb79c1291c68aaa5610c_1765529311.png',
    '/images/anaya-human%20resources/hero.png'
];

const DepartmentDetail = () => {
    const { openWaitlist } = useWaitlist();
    const params = useParams();
    const slug = params?.slug as string;
    const container = useRef(null);
    const powerUpsCarouselRef = useRef<HTMLDivElement>(null);

    // Fallback for undefined departments
    const data = departmentsData[slug] || {
        title: 'AI Employee',
        name: 'Agent',
        role: 'Digital Specialist',
        desc: 'Automate your workflows with a custom AI employee designed for your specific needs.',
        traits: ['Fast', 'Accurate', 'Secure'],
        tasks: ['Automate repetitive tasks', 'Integrate with your tools', 'Work 24/7', 'Scale instantly'],
        powerUps: [
            { title: 'Task Automator', desc: 'Handle repetitive workflows.' },
            { title: 'Data Sync', desc: 'Connect your favorite apps.' },
            { title: 'Smart Alerts', desc: 'Get notified of important events.' },
            { title: 'Custom Reports', desc: 'Generate insights on demand.' }
        ],
        tools: ['Your Stack'],
        imageIndex: 4
    };

    useGSAP(() => {
        if (slug === 'operations') return;
        const tl = gsap.timeline();

        tl.from('.hero-avatar', { x: -50, opacity: 0, duration: 1, ease: 'power3.out' })
            .from('.hero-content > *', { x: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.8');

        gsap.from('.brain-item', {
            scrollTrigger: { trigger: '.brain-section', start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
        });

        gsap.from('.powerup-card', {
            scrollTrigger: { trigger: '.powerups-section', start: 'top 80%' },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
        });

    }, { scope: container });

    return (
        <div style={{ width: '100%', background: '#fff' }}>
            {/* HERO SECTION */}
            <section style={{
                height: '100vh',
                background: data.specificImages?.hero ? 'transparent' : (data.themeColor || '#e07a2c'),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {data.specificImages?.hero && (
                    <>
                        <Image
                            src={data.specificImages.hero}
                            alt={data.name}
                            fill
                            style={{ objectFit: 'cover', zIndex: 0 }}
                            priority
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 1, pointerEvents: 'none' }} />
                    </>
                )}

                <Link href="/departments" style={{ position: 'absolute', top: '7rem', left: '2rem', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 50, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    <ArrowLeft size={20} /> Back to Departments
                </Link>
            </section>

            {/* TEXT SECTION */}
            <section style={{
                padding: 'clamp(4rem, 8vh, 8rem) 2rem',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <h2 style={{
                    maxWidth: '1100px',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                    lineHeight: '1.2',
                    fontWeight: 600,
                    color: '#111',
                    fontFamily: 'var(--font-sans)',
                    letterSpacing: '-0.03em'
                }}>
                    <span style={{ color: data.themeColor || '#e07a2c' }}>Meet {data.name}</span>. {data.desc} Paving the way for the future of {data.title} management.
                </h2>
            </section>

            {/* LARGE IMAGE PLACEHOLDER SECTION */}
            <section style={{ width: '100%', paddingBottom: '8rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    maxWidth: '1400px',
                    width: '100%',
                    borderRadius: '2.5rem',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                    minHeight: '600px',
                    background: '#f8f8f8',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Header Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem 2.5rem',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 10,
                        color: '#fff'
                    }}>
                        <div style={{ fontWeight: 500, fontSize: '0.95rem', opacity: 0.9 }}>
                            {data.name} ({data.title})
                        </div>
                        <button onClick={openWaitlist} style={{
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(4px)',
                            color: '#000',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '100px',
                            border: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'transform 0.2s'
                        }}>
                            Join Waitlist <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    </div>

                    {data.specificImages?.section2 ? (
                        <Image
                            src={data.specificImages.section2}
                            alt="Feature Showcase"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : (
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontWeight: 500, fontSize: '1.2rem' }}>
                            Feature Showcase Placeholder
                        </div>
                    )}
                </div>
            </section >

            {/* FEATURES GRID SECTION */}
            < section style={{
                padding: 'clamp(4rem, 8vh, 8rem) 2rem',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>

                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <p style={{ fontSize: '1.8rem', lineHeight: '1.3', fontWeight: 500, color: '#111', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
                            {data.name} works 24/7 to handle your most time-consuming tasks. From {data.tasks[0]?.toLowerCase()} to {data.tasks[1]?.toLowerCase()}, {data.name} ensures efficiency and scalability.
                        </p>

                        {/* Mobile/Tall Image Placeholder */}
                        <div style={{
                            width: '100%',
                            background: '#f3f4f6',
                            borderRadius: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: data.specificImages?.grid1 ? 'none' : '2px dashed #d1d5db',
                            color: '#9ca3af',
                            fontWeight: 500,
                            overflow: 'hidden',
                            position: 'relative',
                            minHeight: '400px'
                        }}>
                            {data.specificImages?.grid1 ? (
                                <Image
                                    src={data.specificImages.grid1}
                                    alt="Feature Detail"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            ) : (
                                "Mobile Interaction Placeholder"
                            )}
                        </div>

                        <p style={{ fontSize: '1.5rem', lineHeight: '1.5', color: '#333', fontFamily: 'var(--font-sans)', letterSpacing: '-0.01em' }}>
                            Trained on thousands of {data.title} best practices. {data.name} leverages insights from top industry leaders to support your growth, maintain quality, and drive results effectively.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'space-between', height: '100%' }}>
                        <div style={{
                            width: '100%',
                            background: '#f3f4f6',
                            borderRadius: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: data.specificImages?.grid2 ? 'none' : '2px dashed #d1d5db',
                            color: '#9ca3af',
                            fontWeight: 500,
                            overflow: 'hidden',
                            position: 'relative',
                            minHeight: '400px'
                        }}>
                            {data.specificImages?.grid2 ? (
                                <Image
                                    src={data.specificImages.grid2}
                                    alt="Campaign Success"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            ) : (
                                "Campaign Success Placeholder"
                            )}
                        </div>

                        <div style={{
                            width: '100%',
                            background: '#f3f4f6',
                            borderRadius: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: data.specificImages?.grid3 ? 'none' : '2px dashed #d1d5db',
                            color: '#9ca3af',
                            fontWeight: 500,
                            overflow: 'hidden',
                            position: 'relative',
                            minHeight: '400px'
                        }}>
                            {data.specificImages?.grid3 ? (
                                <Image
                                    src={data.specificImages.grid3}
                                    alt="Creative Generation"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            ) : (
                                "Creative Generation Placeholder"
                            )}
                        </div>
                    </div>

                </div>
            </section >

            {/* COMMAND SECTION */}
            < section style={{
                width: '100%',
                padding: 'clamp(4rem, 8vh, 8rem) 2rem',
                background: '#fff',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    width: '100%',
                    borderRadius: '2.5rem',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
                }}>
                    {/* Header Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: '1.5rem 2.5rem',
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 10,
                        color: '#fff'
                    }}>
                        <div style={{ fontWeight: 500, fontSize: '0.95rem', opacity: 0.9 }}>
                            {data.name} ({data.title})
                        </div>
                        <button onClick={openWaitlist} style={{
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(4px)',
                            color: '#000',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '100px',
                            border: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'transform 0.2s'
                        }}>
                            Join Waitlist <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    </div>

                    {data.specificImages?.section4 ? (
                        <Image
                            src={data.specificImages.section4}
                            alt="On your command"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    ) : (
                        <div style={{
                            width: '100%',
                            minHeight: '600px',
                            background: data.themeColor || '#e07a2c',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            padding: '4rem'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '1rem' }}>Available at all times</h2>
                            <p style={{ opacity: 0.9 }}>Phone Interface Placeholder</p>
                        </div>
                    )}
                </div>
            </section >

            {/* MERGED BACKGROUND SECTION (Strategy + Calendar + TikTok) */}
            < section style={{ width: '100%', background: '#E5E5E5', paddingBottom: '8rem' }}>

                {/* Strategy Text */}
                < div style={{ padding: 'clamp(4rem, 8vh, 8rem) 2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{
                        fontSize: '1.75rem',
                        lineHeight: '1.5',
                        fontWeight: 500,
                        color: '#111',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '-0.01em'
                    }}>
                        {data.desc} {data.name} streamlines your workflow and automates your customized processes.
                    </p>
                </div >

                {/* Calendar Feature */}
                < div style={{ padding: '0 clamp(1rem, 3vw, 2rem) 8rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '2.5rem',
                        padding: 'clamp(1rem, 5vw, 4rem)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 'clamp(2rem, 4vw, 4rem)',
                        alignItems: 'center',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        {/* Left: Text */}
                        <div>
                            <div style={{ background: data.themeColor || '#7c3aed', width: 'fit-content', padding: '0.75rem', borderRadius: '1rem', marginBottom: '1.5rem', color: '#fff' }}>
                                <Quote size={28} fill="currentColor" />
                            </div>
                            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, lineHeight: '1.2', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: '#111' }}>
                                <span style={{ color: data.themeColor || '#7c3aed' }}>{data.name}</span>, {data.tasks[0]?.toLowerCase()}.
                            </h3>
                        </div>

                        {/* Right: Phone */}
                        <div style={{ position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{
                                width: 'min(280px, 100%)',
                                height: '100%',
                                background: '#111',
                                borderRadius: '3rem',
                                border: '8px solid #333',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}>
                                <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff' }}></div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{data.name}</div>
                                    </div>
                                    <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '1rem', borderTopLeftRadius: '0.25rem', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '1rem' }}>
                                        <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#555', fontSize: '0.75rem' }}>Content Idea</div>
                                        Sure! Here's a content calendar for next week.
                                    </div>
                                    <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '0.75rem', marginTop: '0.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>Mon</span> <span>Tue</span> <span>Wed</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', height: '60px' }}>
                                            <div style={{ background: '#e0e7ff', borderRadius: '4px' }}></div>
                                            <div style={{ background: '#f3f4f6', borderRadius: '4px' }}></div>
                                            <div style={{ background: '#e0e7ff', borderRadius: '4px' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {/* TikTok Feature */}
                < div style={{ padding: '0 clamp(1rem, 3vw, 2rem)', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '2.5rem',
                        padding: 'clamp(1rem, 5vw, 4rem)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 'clamp(2rem, 4vw, 4rem)',
                        alignItems: 'center',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        {/* Left: Text */}
                        <div>
                            <div style={{ background: data.themeColor || '#7c3aed', width: 'fit-content', padding: '0.75rem', borderRadius: '1rem', marginBottom: '1.5rem', color: '#fff' }}>
                                <Quote size={28} fill="currentColor" />
                            </div>
                            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, lineHeight: '1.2', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em', color: '#111' }}>
                                <span style={{ color: data.themeColor || '#7c3aed' }}>{data.name}</span>, {data.tasks[1]?.toLowerCase()}.
                            </h3>
                        </div>

                        {/* Right: Phone */}
                        <div style={{ position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{
                                width: 'min(280px, 100%)',
                                height: '100%',
                                background: '#111',
                                borderRadius: '3rem',
                                border: '8px solid #333',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}>
                                <div style={{ flex: 1, background: '#fff', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0e7ff' }}></div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{data.name}</div>
                                    </div>
                                    <div style={{ alignSelf: 'flex-end', background: data.themeColor || '#e07a2c', color: '#fff', padding: '0.75rem 1rem', borderRadius: '1rem', borderBottomRightRadius: '0.25rem', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '85%' }}>
                                        Write a viral TikTok video script...
                                    </div>
                                    <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '1rem', borderTopLeftRadius: '0.25rem', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <div style={{ background: '#000', borderRadius: '4px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>T</span></div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555' }}>The Script</span>
                                        </div>
                                        "Okay, I gotta tell you about this AI thing that's <strong>blowing</strong> my mind...<br /><br />
                                        It's called {data.name} AI. Think of it like your own personal superhero sidekick..."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {/* Task Cards (Merged into Background) */}
                < div style={{ padding: '2rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>

                        {/* Purple Card */}
                        <div className="dept-task-card" style={{ background: data.themeColor || '#e07a2c', padding: 0, minHeight: 'auto' }}>
                            <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '0.75rem', borderRadius: '1rem', marginBottom: '1.5rem', backdropFilter: 'blur(4px)' }}>
                                    <Quote size={28} fill="currentColor" />
                                </div>
                                <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, lineHeight: '1.2', marginBottom: '2rem', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
                                    {data.name}, {data.tasks[2]?.toLowerCase()}.
                                </h3>
                            </div>

                            <div className="dept-task-card-row">
                                {/* UI Card Placeholder */}
                                <div style={{
                                    flex: 1,
                                    borderRadius: '1.5rem',
                                    padding: data.specificImages?.task1 ? 0 : '1.5rem',
                                    aspectRatio: '0.8',
                                    minHeight: '300px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    {data.specificImages?.task1 ? (
                                        <img
                                            src={data.specificImages.task1}
                                            alt="Post Generator UI"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                        />
                                    ) : (
                                        "Post Generator UI Placeholder"
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Black Card */}
                        <div className="dept-task-card" style={{ background: '#09090b', padding: 0, minHeight: 'auto' }}>
                            <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)' }}>
                                <div style={{ background: 'rgba(255,255,255,0.15)', width: 'fit-content', padding: '0.75rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                                    <Quote size={28} fill="currentColor" />
                                </div>
                                <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 600, lineHeight: '1.2', marginBottom: '2rem', fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
                                    <span style={{ color: data.themeColor || '#e07a2c' }}>{data.name}</span>, {data.tasks[3]?.toLowerCase()}.
                                </h3>
                            </div>

                            <div className="dept-task-card-row">
                                {/* UI Card Placeholder */}
                                <div style={{
                                    flex: 1.2,
                                    borderRadius: '1.5rem',
                                    padding: data.specificImages?.task2 ? 0 : '1.5rem',
                                    aspectRatio: '1.2',
                                    minHeight: '300px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    {data.specificImages?.task2 ? (
                                        <img
                                            src={data.specificImages.task2}
                                            alt="Brand Sentiment UI"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                                        />
                                    ) : (
                                        "Reply UI Placeholder"
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div >

            </section >

            {/* POWER UPS SECTION */}
            < section className="powerups-section" style={{ padding: 'clamp(4rem, 8vh, 8rem) clamp(1rem, 5vw, 2rem)', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '3rem', color: '#1a1a1a', textAlign: 'center' }}>
                        Supercharge {data.name} with Power Ups
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                        {data.powerUps?.map((pup: any, i: number) => (
                            <div key={i} className="powerup-card" style={{ padding: '2rem', borderRadius: '1.5rem', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                                <div style={{ width: '40px', height: '40px', background: '#e0e7ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <Zap size={20} color="#4F46E5" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>{pup.title}</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{pup.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* BRAIN AI SECTION */}
            < section className="brain-section" style={{ padding: 'clamp(4rem, 8vh, 8rem) clamp(1rem, 5vw, 2rem)', background: '#f5f5f5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: '#000', borderRadius: '50px', padding: '0.5rem 1.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Brain size={16} /> Brain AI
                        </div>
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', color: '#1a1a1a' }}>
                        The memory that powers {data.name}
                    </h2>
                    <p style={{ color: '#666', maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                        {data.name} remembers your preferences, brand voice, and past interactions to deliver consistently personalized results.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        {[
                            { title: 'Brand Voice', desc: 'Maintains your unique tone across all generated content.' },
                            { title: 'Goal Alignment', desc: 'Understands your business objectives and targets.' },
                            { title: 'Adaptive Learning', desc: 'Gets smarter and more accurate with every interaction.' }
                        ].map((item, i) => (
                            <div key={i} className="brain-item" style={{ background: '#fff', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>{item.title}</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    );
};

export default DepartmentDetail;
