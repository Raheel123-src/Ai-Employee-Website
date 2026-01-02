/* public/script.js */
const runWhenReady = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
        callback();
    }
};

runWhenReady(() => {
    const track = document.querySelector('.carousel-track');
    // We only need one set of cards now, JS will handle the looping
    // But since we have duplicates in HTML, let's just use them all for density
    const cards = Array.from(document.querySelectorAll('.card'));

    if (!track || !cards.length) return;

    // CONFIGURATION
    const CONFIG = {
        speed: 1,
        cardWidth: 220,
        gap: 5,
        depth: 600,
        rotation: 45,
        scaleCenter: 0.8,
        scaleEdge: 1.4,
    };

    // State
    let scrollOffset = 0;
    const totalItemWidth = CONFIG.cardWidth + CONFIG.gap;
    const totalWidth = cards.length * totalItemWidth;

    // Center of the container
    const container = document.querySelector('.carousel-container');

    function animate() {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;

        // Update scroll position
        scrollOffset -= CONFIG.speed;

        // We don't reset scrollOffset globally anymore to avoid jumps
        // Instead we wrap individual cards relative to the viewport

        cards.forEach((card, index) => {
            // Calculate base position
            let cardX = (index * totalItemWidth) + scrollOffset;

            // Infinite Loop Logic:
            const buffer = totalItemWidth * 4;

            // Wrap Left
            while (cardX < -buffer) {
                cardX += totalWidth;
            }
            // Wrap Right
            while (cardX > containerRect.width + buffer) {
                cardX -= totalWidth;
            }

            // Calculate center position of the card relative to container center
            const cardCenterX = cardX + (CONFIG.cardWidth / 2);
            const distFromCenter = cardCenterX - centerX;

            // Normalized distance (-1 to 1) for effects
            // We use 0.5 to ensure the effect reaches 100% exactly at the screen edges
            const normX = distFromCenter / (containerRect.width * 0.5);

            const absX = Math.abs(normX);

            // --- VISUAL EFFECTS ---

            // 1. DEPTH (Translate Z)
            const translateZ = -CONFIG.depth * (1 - Math.pow(Math.min(1, absX), 2));

            // 2. ROTATION (Rotate Y)
            const rotateY = -normX * CONFIG.rotation;

            // 3. SCALE
            const scale = CONFIG.scaleCenter + (Math.pow(Math.min(1, absX), 2) * (CONFIG.scaleEdge - CONFIG.scaleCenter));

            // 4. OPACITY
            const opacity = 1 - Math.pow(Math.min(1, absX), 10);

            // Apply transform
            // We use `translateX` for position and other props for 3D effect
            card.style.transform = `
        translateX(${cardX}px)
        translateZ(${translateZ}px) 
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

            // Ensure absolute positioning for manual control
            card.style.position = 'absolute';
            card.style.left = '0';
            // Center vertically: (Container Height - Card Height) / 2
            // Card height is approx 300px from CSS
            const cardHeight = 300;
            const topPos = (containerRect.height - cardHeight) / 2;
            card.style.top = `${topPos}px`;
            card.style.opacity = Math.max(0, opacity);
        });

        requestAnimationFrame(animate);
    }

    // Initialize
    // Remove CSS animation class if any
    track.style.animation = 'none';
    track.style.display = 'block'; // Remove flex, we use absolute
    track.style.position = 'relative';
    track.style.height = '100%';
    track.style.width = '100%';

    animate();
    console.log('JS-driven infinite carousel initialized');
});

// ========================================
// Scroll-based Timeline Animation
// ========================================
runWhenReady(() => {
    const sections = document.querySelectorAll('.why-section');
    const navItems = document.querySelectorAll('.nav-item');

    if (!sections.length || !navItems.length) return;

    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Trigger when section is in middle 60% of viewport
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                // Add active class to the section
                entry.target.classList.add('active');

                // Update sidebar navigation
                const sectionId = entry.target.id;
                navItems.forEach(item => {
                    if (item.dataset.section === sectionId) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            } else if (entry.intersectionRatio < 0.2) {
                // Remove active class when section is far from view
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll on nav click
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.dataset.section;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    console.log('Scroll timeline animation initialized');
});
