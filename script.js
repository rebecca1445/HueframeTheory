// Page loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Custom cursor
const cursor = document.querySelector('.cursor');
if (cursor) {
    const links = document.querySelectorAll('a, .service-card, .content-card, .btn-primary, .btn-secondary, .work-preview-item, .dont-touch-btn');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 22, 18, 0.95)';
        header.style.borderBottom = '1px solid rgba(139, 155, 142, 0.2)';
    } else {
        header.style.background = 'transparent';
        header.style.borderBottom = 'none';
    }
});

// Zoom window effect (simplified and working)
const zoomWindow = document.querySelector('.zoom-window');
if (zoomWindow) {
    console.log('Zoom window found');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const scrollPercent = (scrolled / windowHeight) * 100;
        
        // Show zoom window between 50% and 200% of viewport height
        if (scrollPercent > 50 && scrollPercent < 200) {
            zoomWindow.classList.add('active');
        } else {
            zoomWindow.classList.remove('active');
        }
    });
}

// Parallax effect for floating elements
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-dot');
    
    parallax.forEach((element, index) => {
        const speed = (index + 1) * 0.05;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Text reveal animation
const textReveal = document.querySelectorAll('.text-reveal');
textReveal.forEach(element => {
    const span = element.querySelector('span');
    if (span) {
        setTimeout(() => {
            element.classList.add('animate');
        }, 500);
    }
});

// Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.content-card, .section-title, .page-title, .page-subtitle, .work-preview-item').forEach(el => {
    observer.observe(el);
});

// Active navigation highlighting
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentPage || 
            (currentPage === '' && linkPath === 'index.html') ||
            (currentPage === 'index.html' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Handle page navigation with fade effect
const handlePageTransition = (url) => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (url === currentPage) return;
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
};

// Add transition effect to navigation links
document.querySelectorAll('.nav-links a, .btn-primary, .btn-secondary').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            handlePageTransition(href);
        });
    }
});

// Don't Touch Button Confetti Effect
document.addEventListener('DOMContentLoaded', () => {
    const dontTouchBtn = document.getElementById('dontTouchBtn');
    
    if (dontTouchBtn) {
        console.log('Don\'t Touch button found!');
        
        dontTouchBtn.addEventListener('click', () => {
            console.log('Don\'t Touch button clicked!');
            createConfetti();
            
            // Change button text temporarily
            const originalText = dontTouchBtn.textContent;
            dontTouchBtn.textContent = "I Told You So!";
            dontTouchBtn.style.background = "linear-gradient(45deg, #8B9B8E, #6B7C5D)";
            
            setTimeout(() => {
                dontTouchBtn.textContent = originalText;
                dontTouchBtn.style.background = "linear-gradient(45deg, #9B7B6B, #8B6B5B)";
            }, 3000);
        });
    } else {
        console.log('Don\'t Touch button not found!');
    }
    
    function createConfetti() {
        console.log('Creating confetti!');
        const colors = ['#D4C3B0', '#8B9B8E', '#9B7B6B', '#6B7C5D', '#A69B94', '#B5A392'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
                
                // Random shapes
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                document.body.appendChild(confetti);
                
                // Animate the confetti falling
                let pos = -10;
                const speed = Math.random() * 5 + 2;
                const swing = Math.random() * 2 - 1;
                let swingPos = 0;
                
                const fall = setInterval(() => {
                    pos += speed;
                    swingPos += swing;
                    confetti.style.top = pos + 'px';
                    confetti.style.transform = `translateX(${Math.sin(swingPos * 0.1) * 20}px) rotate(${pos * 2}deg)`;
                    
                    if (pos > window.innerHeight) {
                        clearInterval(fall);
                        confetti.remove();
                    }
                }, 20);
                
            }, i * 20);
        }
    }
});

// Photo stacking animation (for work page)
const photoStack = document.querySelector('.photo-stack');
if (photoStack) {
    const stackObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stackItems = entry.target.querySelectorAll('.photo-item');
                
                stackItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add(`stacked-${index + 1}`);
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    stackObserver.observe(photoStack);
}

// Form handling (for contact page)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#8B9B8E';
            submitBtn.style.color = '#1A1612';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    const immediateAnimations = document.querySelectorAll('.hero-title, .hero-subtitle, .services-preview');
    immediateAnimations.forEach(el => {
        el.style.animationPlayState = 'running';
    });
});
