"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useWaitlist } from '@/context/WaitlistContext';

const Navbar = () => {
    const { openWaitlist } = useWaitlist();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Why Now', href: '/why-now' },
        { name: 'AI Employee Core', href: '/ai-employee-core' },
        { name: 'Departments', href: '/departments' },
        { name: 'Security', href: '/security' },
        { name: 'Pricing', href: '/pricing' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link href="/" className="navbar-logo">
                    Lisa
                </Link>

                {/* Desktop Menu */}
                <div className="navbar-links desktop-only">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions desktop-only">
                    <Link href="#" className="btn-secondary">Log In</Link>
                    <button onClick={openWaitlist} className="btn-primary" style={{ cursor: 'pointer', border: 'none', background: '#1a1a1a', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
                        Join Waitlist
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
                </button>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="mobile-nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mobile-actions">
                        <Link href="#" className="btn-secondary full-width">Log In</Link>
                        <button onClick={() => { openWaitlist(); setIsMobileMenuOpen(false); }} className="btn-primary full-width" style={{ cursor: 'pointer', border: 'none', background: '#1a1a1a', color: 'white', padding: '1rem', borderRadius: '0.5rem' }}>
                            Join Waitlist
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
