/* ============================================
   D.Softworks — Animations JavaScript
   ============================================ */

(function() {
    'use strict';

    // ---------- Intersection Observer for Scroll Animations ----------
    class ScrollAnimator {
        constructor() {
            this.observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            this.init();
        }

        init() {
            // Observe all animatable elements
            const animatables = document.querySelectorAll(
                '.service-card, .project-card, .process-step, .contact-method, .section-header'
            );

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add staggered delay
                        setTimeout(() => {
                            entry.target.classList.add('animate-visible');
                        }, index * 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, this.observerOptions);

            animatables.forEach(el => {
                el.classList.add('animate-ready');
                observer.observe(el);
            });
        }
    }

    // ---------- Parallax Effect ----------
    class ParallaxEffect {
        constructor() {
            this.elements = document.querySelectorAll('[data-parallax]');
            this.init();
        }

        init() {
            if (this.elements.length === 0) return;

            window.addEventListener('scroll', () => {
                this.update();
            });
        }

        update() {
            const scrollY = window.scrollY;

            this.elements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }
    }

    // ---------- Text Split Animation ----------
    class TextSplitter {
        constructor(element) {
            this.element = element;
            this.text = element.textContent;
            this.chars = this.text.split('');
            this.init();
        }

        init() {
            this.element.innerHTML = '';
            
            this.chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.03}s`;
                span.classList.add('char');
                this.element.appendChild(span);
            });
        }
    }

    // ---------- Smooth Counter ----------
    class SmoothCounter {
        constructor(element, target, duration = 2000) {
            this.element = element;
            this.target = target;
            this.duration = duration;
            this.start = 0;
            this.startTime = null;
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(this.element);
        }

        animate() {
            this.startTime = performance.now();
            this.update();
        }

        update() {
            const currentTime = performance.now();
            const elapsed = currentTime - this.startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * this.target);

            this.element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(() => this.update());
            } else {
                this.element.textContent = this.target;
            }
        }
    }

    // ---------- Magnetic Button ----------
    class MagneticButton {
        constructor(element) {
            this.element = element;
            this.rect = this.element.getBoundingClientRect();
            this.init();
        }

        init() {
            this.element.addEventListener('mousemove', (e) => {
                const x = e.clientX - this.rect.left - this.rect.width / 2;
                const y = e.clientY - this.rect.top - this.rect.height / 2;
                
                this.element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            this.element.addEventListener('mouseleave', () => {
                this.element.style.transform = 'translate(0, 0)';
            });

            this.element.addEventListener('mouseenter', () => {
                this.rect = this.element.getBoundingClientRect();
            });
        }
    }

    // ---------- Typing Effect ----------
    class TypingEffect {
        constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
            this.element = element;
            this.texts = texts;
            this.typeSpeed = typeSpeed;
            this.deleteSpeed = deleteSpeed;
            this.pauseTime = pauseTime;
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.init();
        }

        init() {
            this.type();
        }

        type() {
            const currentText = this.texts[this.textIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeDelay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeDelay = this.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
            }

            setTimeout(() => this.type(), typeDelay);
        }
    }

    // ---------- Initialize Animations ----------
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize scroll animator
        new ScrollAnimator();

        // Initialize parallax
        new ParallaxEffect();

        // Initialize magnetic buttons
        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-ghost');
        magneticBtns.forEach(btn => new MagneticButton(btn));

        // Initialize typing effect if element exists
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            new TypingEffect(typingElement, [
                'Desarrollo Web',
                'Sistemas Empresariales',
                'Aplicaciones Móviles',
                'Soluciones Digitales'
            ]);
        }

        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-ready {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .char {
                display: inline-block;
                opacity: 0;
                animation: charReveal 0.5s ease forwards;
            }
            
            @keyframes charReveal {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    });

    // ---------- Expose classes globally ----------
    window.DSoftworksAnimations = {
        ScrollAnimator,
        ParallaxEffect,
        TextSplitter,
        SmoothCounter,
        MagneticButton,
        TypingEffect
    };

})();
