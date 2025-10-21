// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize navbar highlighting based on scroll position
    initNavHighlighting();
    
    // Initialize reveal animations for sections
    initRevealAnimations();
    
    // Initialize button interactions
    initButtonInteractions();
});

// Smooth scrolling for anchor links
function initSmoothScroll() {
    console.log('Initializing smooth scroll');
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            console.log('Anchor clicked:', this.getAttribute('href'));
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced parallax effect
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const stars = document.querySelector('.stars');
        const middleLayer = document.querySelector('.middle-layer');
        const gridLayer = document.querySelector('.grid-layer');
        const digitalRain = document.querySelector('.digital-rain');
        
        // Apply different scroll speeds to create parallax effect
        if (stars) {
            stars.style.transform = `translateZ(-10px) scale(2) translateY(${scrollPosition * 0.1}px)`;
        }
        
        if (middleLayer) {
            middleLayer.style.transform = `translateZ(-5px) scale(1.5) translateY(${scrollPosition * 0.05}px)`;
        }
        
        if (gridLayer) {
            gridLayer.style.transform = `translateZ(-3px) scale(1.3) translateY(${scrollPosition * 0.03}px)`;
        }
        
        if (digitalRain) {
            digitalRain.style.transform = `translateZ(-2px) scale(1.2) translateY(${scrollPosition * 0.02}px)`;
        }
    });
}

// Highlight active navigation link based on scroll position
function initNavHighlighting() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Add offset for fixed header and some additional space
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Reveal animations for sections as they enter viewport
function initRevealAnimations() {
    const categories = document.querySelectorAll('.category');
    
    // Add CSS for reveal animations (since we're separating files)
    const style = document.createElement('style');
    style.textContent = `
        .reveal-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s ease, transform 1s ease;
        }
        
        .reveal {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Create IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all category elements
        categories.forEach(category => {
            // Add base reveal class
            category.classList.add('reveal-ready');
            // Observe element
            observer.observe(category);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        categories.forEach(category => {
            category.classList.add('reveal');
        });
    }
}

// Add "active" class to button when clicked
function initButtonInteractions() {
    console.log('Initializing button interactions');
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        console.log('Found button:', button);
        // Explicitly add the event listener for click
        button.addEventListener('click', function(e) {
            console.log('Button clicked:', this);
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('btn-active'));
            
            // Add active class to clicked button
            this.classList.add('btn-active');
        });
        
        // Also add for touchstart for mobile devices
        button.addEventListener('touchstart', function(e) {
            console.log('Button touched:', this);
            // Don't prevent default here to allow the link to work
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('Button activated by keyboard:', this);
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Direct fix for Explore Resources button
document.addEventListener('DOMContentLoaded', function() {
    // Direct targeting of the main CTA button
    const mainCTAButton = document.querySelector('.hero .btn');
    if (mainCTAButton) {
        console.log('Found main CTA button');
        mainCTAButton.addEventListener('click', function(e) {
            console.log('Main CTA clicked');
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add active class
                    this.classList.add('btn-active');
                }
            }
        });
    }
});

// Add polyfill for smooth scrolling in Safari and older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdnjs.cloudflare.com/ajax/libs/smoothscroll-polyfill/0.4.4/smoothscroll.min.js')
        .then(() => {
            window.__forceSmoothScrollPolyfill__ = true;
        });
}

// Ensure buttons work on touch devices too
document.addEventListener('touchstart', function() {
    // This empty handler will enable active states on touch devices
}, { passive: true });

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust parallax positions if needed
    initParallax();
});