const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Nav scroll
const nav = document.getElementById('nav');
const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Mobile menu
const toggle = document.getElementById('nav-toggle');
const links  = document.getElementById('nav-links');

function setMenu(open) {
    toggle.classList.toggle('active', open);
    links.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
}

toggle?.addEventListener('click', () => setMenu(!links.classList.contains('open')));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
    }
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll(
    '.section-header, .proj-card, .feature-card, .stack-item, .spec-card, .hw-table, .code-block, .about-grid'
).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${Math.min(i * 0.06, 0.36)}s`;
    observer.observe(el);
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const hash = a.getAttribute('href');
        const target = hash.length > 1 ? document.querySelector(hash) : null;
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
            });
        }
    });
});
