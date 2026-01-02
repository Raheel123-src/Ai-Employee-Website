"use client";

import React, { useState } from 'react';
import { useWaitlist } from '@/context/WaitlistContext';
import { X, Loader2, CheckCircle } from 'lucide-react';

const WaitlistModal = () => {
    const { isWaitlistOpen, closeWaitlist } = useWaitlist();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        orgName: '',
        phone: '',
        email: '',
        aiInterest: '',
        useCases: ''
    });

    if (!isWaitlistOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call to Google Sheets
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    closeWaitlist();
                    setIsSuccess(false);
                    setFormData({ fullName: '', orgName: '', phone: '', email: '', aiInterest: '', useCases: '' });
                }, 3000);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error submitting form.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: '#fff',
                width: '90%',
                maxWidth: '600px',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <button
                    onClick={closeWaitlist}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    <X size={24} />
                </button>

                {isSuccess ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <CheckCircle size={64} color="#16a34a" />
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a1a1a' }}>You're on the list!</h2>
                        <p style={{ color: '#666' }}>Thanks for joining. We'll be in touch soon.</p>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#1a1a1a', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                            Join Our Waitlist Now
                        </h2>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>
                            Be the first to hire AI employees for your team.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e5e7eb',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Organization Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="orgName"
                                        value={formData.orgName}
                                        onChange={handleChange}
                                        placeholder="Acme Corp"
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e5e7eb',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e5e7eb',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Email ID</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem',
                                            borderRadius: '0.75rem',
                                            border: '1px solid #e5e7eb',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Which AI Employee are you interested in?</label>
                                <select
                                    required
                                    name="aiInterest"
                                    value={formData.aiInterest}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.9rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        background: '#fff'
                                    }}
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="Sales AI">Sales AI</option>
                                    <option value="Marketing AI">Marketing AI</option>
                                    <option value="Support AI">Support AI</option>
                                    <option value="HR AI">HR AI</option>
                                    <option value="Operations AI">Operations AI</option>
                                    <option value="Other">Other / Custom</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>Your Use Cases</label>
                                <textarea
                                    required
                                    name="useCases"
                                    value={formData.useCases}
                                    onChange={handleChange}
                                    placeholder="Briefly describe what you want to automate..."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.9rem',
                                        borderRadius: '0.75rem',
                                        border: '1px solid #e5e7eb',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'none'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    background: '#1a1a1a',
                                    color: '#fff',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : 'Join Waitlist'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default WaitlistModal;
