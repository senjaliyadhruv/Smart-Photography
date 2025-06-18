// Portfolio Website JavaScript - Cleaned Version
(function () {
    'use strict';

    // Global variables
    let gradientAngle = 0;
    let currentSlide = 0;
    let lastScrollTop = 0;

    // DOM elements cache
    const elements = {
        loadingScreen: null,
        cursor: null,
        cursorFollower: null,
        navbar: null,
        navLinks: null,
        mobileMenuBtn: null,
        contactForm: null,
        submitBtn: null,
        successMessage: null,
        heroBg: null,
        slides: null,
        progressFill: null,
        nextBtn: null,
        prevBtn: null
    };

    // Initialize all CSS animations in one place
    function initializeStyles() {
        const styles = `
            @keyframes sparkle {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
            
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Cache DOM elements
    function cacheElements() {
        elements.loadingScreen = document.getElementById('loadingScreen');
        elements.cursor = document.querySelector('.cursor');
        elements.cursorFollower = document.querySelector('.cursor-follower');
        elements.navbar = document.getElementById('navbar');
        elements.navLinks = document.getElementById('navLinks');
        elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        elements.contactForm = document.getElementById('contactForm');
        elements.submitBtn = document.getElementById('submitBtn');
        elements.successMessage = document.getElementById('successMessage');
        elements.heroBg = document.querySelector('.hero-bg');
        elements.slides = document.querySelectorAll('.showcase-item');
        elements.progressFill = document.querySelector('.progress-fill');
        elements.nextBtn = document.getElementById('nextBtn');
        elements.prevBtn = document.getElementById('prevBtn');
    }

    // Loading Screen
    function initLoadingScreen() {
        if (!elements.loadingScreen) return;

        setTimeout(() => {
            elements.loadingScreen.style.opacity = '0';
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 1000);
        }, 2000);
    }

    // Custom Cursor (desktop only)
    function initCustomCursor() {
        if (!elements.cursor || !elements.cursorFollower || window.innerWidth <= 768) return;

        // Mouse move handler
        const handleMouseMove = (e) => {
            elements.cursor.style.left = e.clientX + 'px';
            elements.cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                elements.cursorFollower.style.left = e.clientX - 20 + 'px';
                elements.cursorFollower.style.top = e.clientY - 20 + 'px';
            }, 100);

            // Sparkle effect (reduced frequency)
            if (Math.random() > 0.985) {
                createSparkle(e.clientX, e.clientY);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                elements.cursor.style.transform = 'scale(2)';
                elements.cursorFollower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                elements.cursor.style.transform = 'scale(1)';
                elements.cursorFollower.style.transform = 'scale(1)';
            });
        });
    }

    // Navbar functionality
    function initNavbar() {
        if (!elements.navbar) return;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Hide/show navbar
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                elements.navbar.style.transform = 'translateY(-100%)';
            } else {
                elements.navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;

            // Background opacity
            if (scrollTop > 100) {
                elements.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                elements.navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        };

        window.addEventListener('scroll', handleScroll);
    }

    // Smooth scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Intersection Observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax effect
    function initParallax() {
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');

            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', handleParallax);
    }

    // Portfolio interactions
    function initPortfolio() {
        // Portfolio item click effect
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'scale(1.05) rotate(2deg)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1) rotate(0deg)';
                    }, 200);
                }, 150);
            });
        });

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Dynamic gradient animation
    function initGradientAnimation() {
        if (!elements.heroBg) return;

        const animateGradient = () => {
            gradientAngle += 1;
            elements.heroBg.style.background =
                `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`;
        };

        setInterval(animateGradient, 100);
    }

    // Floating elements
    function initFloatingElements() {
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const animate = () => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                element.style.transform =
                    `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
            };

            setInterval(animate, 3000 + index * 500);
        });
    }

    // Service cards
    function initServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });
    }

    // Mobile menu
    function initMobileMenu() {
        if (!elements.mobileMenuBtn || !elements.navLinks) return;

        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.navLinks.classList.toggle('active');
            const span = elements.mobileMenuBtn.querySelector('span');
            span.textContent = elements.navLinks.classList.contains('active') ? '✕' : '≡';
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                elements.navLinks.classList.remove('active');
                const span = elements.mobileMenuBtn.querySelector('span');
                if (span) span.textContent = '≡';
            });
        });
    }

    // Contact form
    function initContactForm() {
        if (!elements.contactForm || !elements.submitBtn) return;

        elements.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Loading state
            elements.submitBtn.innerHTML = 'Sending...';
            elements.submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            elements.submitBtn.disabled = true;

            try {
                // Simulate sending (replace with actual service)
                await new Promise(resolve => setTimeout(resolve, 2000));
                showSuccessMessage();
                elements.contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                // Reset button
                elements.submitBtn.innerHTML = 'Send Message';
                elements.submitBtn.style.background = 'var(--gradient-1)';
                elements.submitBtn.disabled = false;
            }
        });
    }

    // Showcase/slider functionality
    function initShowcase() {
        if (!elements.slides || elements.slides.length === 0) return;

        const totalSlides = elements.slides.length;

        function showSlide(index) {
            elements.slides.forEach(slide => slide.classList.remove('active'));
            elements.slides[index].classList.add('active');
            if (elements.progressFill) {
                elements.progressFill.style.width = ((index + 1) / totalSlides) * 100 + '%';
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-rotate
        setInterval(nextSlide, 5000);

        // Navigation buttons
        if (elements.nextBtn) elements.nextBtn.addEventListener('click', nextSlide);
        if (elements.prevBtn) elements.prevBtn.addEventListener('click', prevSlide);
    }

    // Statistics counter
    function initStatistics() {
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const increment = target / 100;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        const suffix = counter.textContent.includes('+') ? '+' :
                            counter.textContent.includes('%') ? '%' : '';
                        counter.textContent = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    }
                };

                updateCounter();
            });
        };

        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            counterObserver.observe(aboutSection);
        }
    }

    // Utility functions
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--primary-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkle 1s ease-out forwards;
        `;

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }

    function createConfetti() {
        const colors = ['var(--primary-gold)', 'var(--accent-rose)', '#fff'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 10002;
                border-radius: 50%;
                animation: confetti-fall 3s ease-out forwards;
            `;

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    function showSuccessMessage() {
        if (elements.successMessage) {
            elements.successMessage.classList.add('show');
            createConfetti();
            setTimeout(() => {
                elements.successMessage.classList.remove('show');
            }, 5000);
        }
    }

    // Responsive handling
    function handleResize() {
        if (window.innerWidth > 768 && elements.navLinks) {
            elements.navLinks.classList.remove('active');
            const span = elements.mobileMenuBtn?.querySelector('span');
            if (span) span.textContent = '≡';
        }

        // Disable heavy animations on mobile
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.floating-element').forEach(el => {
                el.style.animation = 'none';
            });
        }
    }

    // Initialize everything
    function init() {
        cacheElements();
        initializeStyles();
        initLoadingScreen();
        initCustomCursor();
        initNavbar();
        initSmoothScrolling();
        initScrollAnimations();
        initParallax();
        initPortfolio();
        initGradientAnimation();
        initFloatingElements();
        initServiceCards();
        initMobileMenu();
        initContactForm();
        initShowcase();
        initStatistics();

        // Event listeners
        window.addEventListener('resize', handleResize);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Start loading screen animation immediately
    window.addEventListener('load', initLoadingScreen);

})();