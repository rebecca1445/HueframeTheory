// Custom cursor
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, .service-card, .content-card, .btn-primary, .btn-secondary');

if (cursor) {
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
        if (scrolled > windowHeight * 0.7 && scrolled < windowHeight * 1.8 && !zoomTriggered) {
            zoomWindow.classList.add('active');
            zoomTriggered = true;
        } else if (scrolled > windowHeight * 1.8 && zoomTriggered) {
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
