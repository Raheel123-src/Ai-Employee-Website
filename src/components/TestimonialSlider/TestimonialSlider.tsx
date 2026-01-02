"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/all';

gsap.registerPlugin(Observer);

const testimonials = [
    {
        quote: "Lisa’s AI Employee for HR has basically become our fourth team member. It handles leaves, policy questions and basic HR emails.",
        author: "Priya S., HR Manager",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        bg: "#f5f3ed" // Cream
    },
    {
        quote: "Follow-ups just stopped slipping. Our pipeline hygiene has gone from 4/10 to 9/10.",
        author: "Amit K., Head of Sales",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        bg: "#ffffff" // White
    },
    {
        quote: "No drama, no six-week onboarding. The L&D AI Employee reads our sheets, sends nudges and mails reports.",
        author: "Shreya R., L&D Lead",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        bg: "#f5f3ed" // Cream
    },
    {
        quote: "Our placement chaos moved from WhatsApp to one neat dashboard. My team finally sleeps during placement season.",
        author: "Prof. Nilesh P., Head – Placements",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
        bg: "#ffffff" // White
    }
];

const TestimonialSlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animating = useRef(false);
    const currentIndex = useRef(0);

    useEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".slide");
        const images = gsap.utils.toArray<HTMLElement>(".overlay__img-cont .image");
        const slideImages = gsap.utils.toArray<HTMLElement>(".slide__img");
        const outerWrappers = gsap.utils.toArray<HTMLElement>(".slide__outer");
        const innerWrappers = gsap.utils.toArray<HTMLElement>(".slide__inner");
        const count = document.querySelector(".count");
        const wrap = gsap.utils.wrap(0, sections.length);

        gsap.set(outerWrappers, { xPercent: 100 });
        gsap.set(innerWrappers, { xPercent: -100 });
        gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
        gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });
        gsap.set(images, { opacity: 0, zIndex: 0 });
        gsap.set(images[0], { opacity: 1, zIndex: 1 });

        function gotoSection(index: number, direction: number) {
            animating.current = true;
            index = wrap(index);

            const tl = gsap.timeline({
                defaults: { duration: 1, ease: "expo.inOut" },
                onComplete: () => {
                    animating.current = false;
                }
            });

            const currentSection = sections[currentIndex.current];
            const heading = currentSection.querySelector(".slide__heading");
            const nextSection = sections[index];
            const nextHeading = nextSection.querySelector(".slide__heading");

            gsap.set([sections], { zIndex: 0, autoAlpha: 0 });
            gsap.set([sections[currentIndex.current]], { zIndex: 1, autoAlpha: 1 });
            gsap.set([sections[index]], { zIndex: 2, autoAlpha: 1 });

            // Handle overlay images
            gsap.set(images, { zIndex: 0, autoAlpha: 0 });
            gsap.set(images[index], { zIndex: 2, autoAlpha: 1 });
            gsap.set(images[currentIndex.current], { zIndex: 1, autoAlpha: 1 });


            tl
                .set(count, { text: String(index + 1) }, 0.32)
                .fromTo(
                    outerWrappers[index],
                    { xPercent: 100 * direction },
                    { xPercent: 0 },
                    0
                )
                .fromTo(
                    innerWrappers[index],
                    { xPercent: -100 * direction },
                    { xPercent: 0 },
                    0
                )
                .to(
                    heading,
                    { xPercent: 30 * direction, opacity: 0 },
                    0
                )
                .fromTo(
                    nextHeading,
                    { xPercent: -30 * direction, opacity: 0 },
                    { xPercent: 0, opacity: 1 },
                    0
                )
                .fromTo(
                    images[index],
                    { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 },
                    { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
                    0
                )
                .fromTo(
                    images[currentIndex.current],
                    { xPercent: 0, scaleX: 1, scaleY: 1 },
                    { xPercent: -125 * direction, scaleX: 1.5, scaleY: 1.3 },
                    0
                )
                .fromTo(
                    slideImages[index],
                    { scale: 2 },
                    { scale: 1 },
                    0
                )
                .timeScale(0.8);

            currentIndex.current = index;
        }

        const observer = Observer.create({
            target: containerRef.current,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onUp: () => {
                if (animating.current) return;
                gotoSection(currentIndex.current + 1, +1);
            },
            onDown: () => {
                if (animating.current) return;
                gotoSection(currentIndex.current - 1, -1);
            },
            tolerance: 10,
            preventDefault: true
        });

        return () => {
            observer.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="testimonial-slider-wrapper" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
            {testimonials.map((t, i) => (
                <section key={i} className="slide">
                    <div className="slide__outer">
                        <div className="slide__inner">
                            <div className="slide__content" style={{ backgroundColor: t.bg }}>
                                <div className="slide__container">
                                    <h2 className="slide__heading">
                                        "{t.quote}"
                                        <span className="slide__author">— {t.author}</span>
                                    </h2>
                                    <figure className="slide__img-cont">
                                        <img className="slide__img" src={t.image} alt={t.author} />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            <section className="overlay">
                <div className="overlay__content">
                    <p className="overlay__count">0<span className="count">1</span></p>
                    <figure className="overlay__img-cont">
                        {testimonials.map((t, i) => (
                            <img key={i} className="image" src={t.image} alt={t.author} />
                        ))}
                    </figure>
                </div>
            </section>
        </div>
    );
};

export default TestimonialSlider;
