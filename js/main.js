/* ============================================
   D.Softworks — Main JavaScript
   ============================================ */

(function() {
    'use strict';

    // ---------- DOM Elements ----------
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section[id]');

    // ---------- Preloader ----------
    function hidePreloader() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 2000);
    }

    // ---------- Header Scroll ----------
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ---------- Mobile Navigation ----------
    function openNav() {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ---------- Active Navigation Link ----------
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ---------- Smooth Scroll ----------
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile nav if open
            if (navMenu.classList.contains('active')) {
                closeNav();
            }
        }
    }

    // ---------- Scroll Reveal ----------
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // ---------- Counter Animation ----------
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    // ---------- Form Handling ----------
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showToast('Por favor, completa todos los campos requeridos.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Por favor, ingresa un email válido.', 'error');
            return;
        }

        // Submit to Netlify Forms via fetch
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.disabled = true;

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
            redirect: 'follow'
        })
        .then(response => {
            if (response.ok) {
                showToast('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch((error) => {
            showToast('Error al enviar. Intenta de nuevo.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // ---------- Toast Notification ----------
    function showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Hide toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ---------- Scroll Progress ----------
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        }
    }

    // ---------- Lazy Load Images ----------
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ---------- FAQ Accordion ----------
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-question');
        
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                const faqItem = item.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all items
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    // ---------- Event Listeners ----------
    document.addEventListener('DOMContentLoaded', () => {
        // Hide preloader
        hidePreloader();

        // Header scroll effect
        window.addEventListener('scroll', handleHeaderScroll);

        // Mobile navigation
        if (navToggle) {
            navToggle.addEventListener('click', openNav);
        }
        if (navClose) {
            navClose.addEventListener('click', closeNav);
        }

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });

        // Active link on scroll
        window.addEventListener('scroll', updateActiveLink);

        // Scroll reveal
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check

        // Counter animation
        animateCounters();

        // Form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Scroll progress
        window.addEventListener('scroll', updateScrollProgress);

        // Lazy load images
        lazyLoadImages();

        // FAQ accordion
        initFAQ();

        // Close nav on link click
        navLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeNav();
            }
        });
    });

    // ---------- Expose functions globally ----------
    window.DSoftworks = {
        showToast,
        smoothScroll
    };

})();
