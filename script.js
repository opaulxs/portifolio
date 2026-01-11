// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate child elements with stagger
            const children = entry.target.querySelectorAll('.stack-item, .project-card, .contact-link');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Initialize child elements for animation
    const animatedElements = document.querySelectorAll('.stack-item, .project-card, .contact-link');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Parallax effect for hero section
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollY < heroHeight) {
        const parallaxValue = scrollY * 0.5;
        const heroContainer = hero.querySelector('.hero-container');
        if (heroContainer) {
            heroContainer.style.transform = `translateY(${parallaxValue}px)`;
            heroContainer.style.opacity = 1 - (scrollY / heroHeight) * 0.5;
        }
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Text reveal animation for hero
function initTextReveal() {
    const heroTitleFilled = document.querySelector('.hero-title-filled');
    const heroSubtitleFilled = document.querySelector('.hero-subtitle-filled');
    
    if (heroTitleFilled) {
        const revealWidth = 50; // Start at 50%
        heroTitleFilled.style.clipPath = `polygon(0 0, ${revealWidth}% 0, ${revealWidth}% 100%, 0 100%)`;
        
        // Animate on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.getElementById('hero')?.offsetHeight || 0;
            
            if (scrollY < heroHeight) {
                const progress = Math.min(scrollY / (heroHeight * 0.5), 1);
                const newWidth = 50 + (progress * 50);
                heroTitleFilled.style.clipPath = `polygon(0 0, ${newWidth}% 0, ${newWidth}% 100%, 0 100%)`;
                
                if (heroSubtitleFilled) {
                    const subtitleWidth = 45 + (progress * 55);
                    heroSubtitleFilled.style.clipPath = `polygon(0 0, ${subtitleWidth}% 0, ${subtitleWidth}% 100%, 0 100%)`;
                }
            }
        }, { passive: true });
    }
}

// Initialize text reveal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTextReveal);
} else {
    initTextReveal();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Microinteractions for hover effects
document.querySelectorAll('.stack-item, .project-card, .contact-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Cursor effect (optional subtle enhancement)
let cursorX = 0;
let cursorY = 0;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Subtle parallax for project cards (optimized)
let cardParallaxTicking = false;

function updateCardParallax() {
    const projectCards = document.querySelectorAll('.project-card');
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    
    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + scrollY;
        const cardCenter = cardTop + rect.height / 2;
        const viewportCenter = scrollY + windowHeight / 2;
        const distance = cardCenter - viewportCenter;
        
        if (Math.abs(distance) < windowHeight * 1.5) {
            const parallax = distance * 0.03;
            card.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    cardParallaxTicking = false;
}

function requestCardParallaxTick() {
    if (!cardParallaxTicking) {
        requestAnimationFrame(updateCardParallax);
        cardParallaxTicking = true;
    }
}

window.addEventListener('scroll', requestCardParallaxTick, { passive: true });
