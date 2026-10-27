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
    '.section-header, .proj-card, .feature-card, .stack-item, .spec-card, .hw-table, .code-block, .about-grid, .rs-paper, .rs-interest, .rs-aside-inner'
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

// Back pill: return to the braunf.com page the visitor came from (for example the orb),
// remembered for the whole visit; visitors from anywhere else get a link to braunf.com.
(function () {
    var pill = document.querySelector('[data-back]');
    if (!pill) return;
    var key = 'braunf-back', stored = null;
    try { stored = sessionStorage.getItem(key); } catch (e) {}
    var ref = document.referrer, host = '';
    try { host = new URL(ref).hostname; } catch (e) {}
    if (ref && host !== location.hostname && /(^|\.)braunf\.com$/.test(host)) {
        stored = ref;
        try { sessionStorage.setItem(key, ref); } catch (e) {}
    }
    if (stored) { pill.href = stored; pill.textContent = '\u2190 Back'; }
})();

// Research hero: a quiet neural-network of drifting nodes that reaches toward the cursor
(function () {
    var cv = document.getElementById('hero-net');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, nodes = [];
    var mouse = { x: -9999, y: -9999 };
    var TEAL = '16,217,160', BLUE = '56,189,248';

    function resize() {
        var r = cv.getBoundingClientRect();
        W = r.width; H = r.height;
        cv.width = W * dpr; cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.max(32, Math.min(104, Math.round(W * H / 12000)));
        nodes = [];
        for (var i = 0; i < n; i++) {
            nodes.push({ x: W * (0.12 + 0.88 * Math.pow(Math.random(), 0.85)), y: Math.random() * H, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: 1.6 + Math.random() * 2.4, c: Math.random() > 0.72 ? BLUE : TEAL });
        }
    }
    function frame() {
        ctx.clearRect(0, 0, W, H);
        var LINK = 175, i, j, a, b, dx, dy, d;
        for (i = 0; i < nodes.length; i++) {
            a = nodes[i];
            if (!reduce) {
                a.x += a.vx; a.y += a.vy;
                if (a.x < 0 || a.x > W) a.vx *= -1;
                if (a.y < 0 || a.y > H) a.vy *= -1;
            }
            for (j = i + 1; j < nodes.length; j++) {
                b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
                if (d < LINK) {
                    ctx.strokeStyle = 'rgba(' + a.c + ',' + (0.42 * (1 - d / LINK)).toFixed(3) + ')';
                    ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                }
            }
            dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
            if (d < 190) {
                ctx.strokeStyle = 'rgba(' + a.c + ',' + (0.75 * (1 - d / 190)).toFixed(3) + ')';
                ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                if (!reduce) { a.x += (mouse.x - a.x) * 0.002; a.y += (mouse.y - a.y) * 0.002; }
            }
            ctx.fillStyle = 'rgba(' + a.c + ',1)'; ctx.shadowColor = 'rgba(' + a.c + ',0.9)'; ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill(); ctx.shadowBlur = 0;
        }
        if (!reduce) raf = requestAnimationFrame(frame);
    }
    var raf = 0;
    resize(); frame();
    window.addEventListener('resize', function () { resize(); if (reduce) frame(); });
    window.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    document.addEventListener('visibilitychange', function () { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) { cancelAnimationFrame(raf); frame(); } });
})();

// Copy BibTeX
document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var pre = btn.parentElement.querySelector('.rs-bib');
        var done = function (ok) { var t = btn.textContent; btn.textContent = ok ? 'Copied' : 'Select and copy manually'; setTimeout(function () { btn.textContent = 'Copy BibTeX'; }, 1800); };
        try { navigator.clipboard.writeText(pre.textContent).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
    });
});
