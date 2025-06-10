  // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                }, 1000);
            }, 2000);
        });

        // Custom Cursor (only on desktop)
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX - 20 + 'px';
                    cursorFollower.style.top = e.clientY - 20 + 'px';
                }, 100);
            });

            // Cursor hover effects
            const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                    cursorFollower.style.transform = 'scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });

            // Add sparkle effect on cursor movement
            document.addEventListener('mousemove', (e) => {
                if (Math.random() > 0.98) {
                    createSparkle(e.clientX, e.clientY);
                }
            });
        }

        // Navbar scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navbar = document.getElementById('navbar');
            
            if (scrollTop > lastScrollTop) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;

            // Navbar background
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Fade in animation on scroll
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

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Portfolio item click effect
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'scale(1.05) rotate(2deg)';
                }, 150);
            });
        });

        // Dynamic gradient animation
        let gradientAngle = 0;
        setInterval(() => {
            gradientAngle += 1;
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                heroBg.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`;
            }
        }, 100);

        // Text typing effect for hero title (alternative animation)
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }

        // Floating elements random movement
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
            }, 3000 + index * 500);
        });

        // Service card interaction
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const span = mobileMenuBtn.querySelector('span');
            span.textContent = navLinks.classList.contains('active') ? '✕' : '≡';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('span').textContent = '≡';
            });
        });

        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            submitBtn.disabled = true;

            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                // Simulate sending email (replace with your actual email service)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                console.error('Error sending message:', error);
                // You can add error handling here
            } finally {
                // Reset button
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.background = 'var(--gradient-1)';
                submitBtn.disabled = false;
            }
        });

        function showSuccessMessage() {
            successMessage.classList.add('show');
            
            // Create confetti effect
            createConfetti();
            
            // Auto close after 5 seconds
            setTimeout(() => {
                closeSuccessMessage();
            }, 5000);
        }

        function closeSuccessMessage() {
            successMessage.classList.remove('show');
        }

        // Confetti effect
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
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }
        }

        // Add confetti animation CSS
        const confettiCSS = `
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
        `;
        
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = confettiCSS;
        document.head.appendChild(confettiStyle);

        
        // Mobile menu toggle (for responsive design)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('span').textContent = '≡';
            }
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = 'var(--primary-gold)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }

        // Add sparkle animation to CSS
        const sparkleCSS = `
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
        `;
        
        const style = document.createElement('style');
        style.textContent = sparkleCSS;
        document.head.appendChild(style);

        // Mobile menu toggle (for responsive design)
        const createMobileMenu = () => {
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                const menuButton = document.createElement('button');
                menuButton.innerHTML = '≡';
                menuButton.style.cssText = `
                    background: none;
                    border: none;
                    color: var(--soft-white);
                    font-size: 2rem;
                    cursor: pointer;
                `;
                
                menuButton.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.background = 'var(--deep-black)';
                    navLinks.style.padding = '2rem';
                });
                
                document.querySelector('.nav-container').appendChild(menuButton);
            }
        };

        // Initialize mobile menu on load and resize
        window.addEventListener('load', () => {
            // Mobile optimizations
            if (window.innerWidth <= 768) {
                // Disable some animations on mobile for better performance
                document.querySelectorAll('.floating-element').forEach(el => {
                    el.style.animation = 'none';
                });
            }
        });

        // Statistics counter animation
        const animateCounters = () => {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '') + (counter.textContent.includes('%') ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = counter.textContent.replace(/^\d+/, target);
                    }
                };
                
                updateCounter();
            });
        };

        // Trigger counter animation when about section is visible
        const aboutSection = document.querySelector('#about');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        if (aboutSection) {
            counterObserver.observe(aboutSection);
        }