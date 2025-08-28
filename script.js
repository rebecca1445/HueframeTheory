
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
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    } else {
        header.style.background = 'transparent';
    }
});

// Zoom window effect (only on home page)
const zoomWindow = document.querySelector('.zoom-window');
if (zoomWindow) {
    let zoomTriggered = false;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Zoom window activation
        if (scrolled > windowHeight * .9 && scrolled < windowHeight * 1.9 && !zoomTriggered) {
            zoomWindow.classList.add('active');
            zoomTriggered = true;
        } else if (scrolled > windowHeight * 1.9 && zoomTriggered) {
            zoomWindow.classList.remove('active');
            zoomTriggered = false;
        }
    });
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-dot');
    
    parallax.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.content-card, .page-title, .page-subtitle').forEach(el => {
    observer.observe(el);
});

// Active navigation highlighting
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
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
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 200);
};

// Don't Touch Button Confetti Effect
document.addEventListener('DOMContentLoaded', () => {
    const dontTouchBtn = document.getElementById('dontTouchBtn');
    
    if (dontTouchBtn) {
        dontTouchBtn.addEventListener('click', () => {
            createConfetti();
            
            // Change button text temporarily
            const originalText = dontTouchBtn.textContent;
            dontTouchBtn.textContent = "I Told You So!";
            dontTouchBtn.style.background = "linear-gradient(45deg, #4CAF50, #45a049)";
            
            setTimeout(() => {
                dontTouchBtn.textContent = originalText;
                dontTouchBtn.style.background = "linear-gradient(45deg, #ff6b6b, #ee5a52)";
            }, 3000);
        });
    }
    
    function createConfetti() {
        const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f1c40f', '#e67e22'];
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

// Add transition effect to navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== window.location.pathname.split('/').pop()) {
            e.preventDefault();
            handlePageTransition(href);
        }
    });
});
