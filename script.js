// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.card-animate').forEach(el => observer.observe(el));

// ===== Q&A TOGGLE =====
function toggleAnswer(button) {
    const item = button.closest('.qa-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.qa-item').forEach(q => q.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SLIDESHOW =====
const slides = document.querySelectorAll('.slide');
const slidePrev = document.getElementById('slidePrev');
const slideNext = document.getElementById('slideNext');
const slideDots = document.getElementById('slideDots');
const slideProgress = document.getElementById('slideProgress');
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slide-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    slideDots.appendChild(dot);
});

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    slideDots.children[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    slideDots.children[currentSlide].classList.add('active');
    slideProgress.style.width = ((currentSlide + 1) / slides.length * 100) + '%';
    slidePrev.disabled = currentSlide === 0;
    slideNext.disabled = currentSlide === slides.length - 1;
}

slidePrev.addEventListener('click', () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
});
slideNext.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
});

// Keyboard navigation for slides
document.addEventListener('keydown', (e) => {
    const slidesSection = document.getElementById('slides');
    const rect = slidesSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft' && currentSlide > 0) goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
    }
});

// Initialize slide state
goToSlide(0);

// ===== FLOATING PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#f59e0b', '#10b981', '#ec4899'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 10 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            width: ${size}px; height: ${size}px;
            background: ${color};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100 + 100}%;
            opacity: ${Math.random() * 0.4 + 0.1};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
}
createParticles();
