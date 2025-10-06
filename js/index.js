// ========== Typed.js ==========
new Typed("#typing", {
    strings: ["Lary Danial", "Designer", "Developer"],
    typeSpeed: 100,
    backSpeed: 30,
    backDelay: 1000,
    loop: true
});

// ========== Progress Bars ==========
const bars = document.querySelectorAll('.progress-bar');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const bar = entry.target;
        if (entry.isIntersecting) {
            bar.style.width = bar.dataset.per + "%";
        } else {
            bar.style.width = "0";
        }
    });
}, { threshold: 0.5 });

bars.forEach(bar => observer.observe(bar));

// ========== Counters ==========
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('numbers');
    if (!section) return;

    const counters = section.querySelectorAll('.counter');
    if (!counters.length) return;

    const animMap = new Map();

    function animateCounter(counter, duration = 1500) {
        if (animMap.has(counter)) {
            cancelAnimationFrame(animMap.get(counter));
            animMap.delete(counter);
        }

        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        if (!target) {
            counter.textContent = '0';
            return;
        }

        const startTime = performance.now();
        counter.textContent = '0';

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value;

            if (progress < 1) {
                const rafId = requestAnimationFrame(tick);
                animMap.set(counter, rafId);
            } else {
                counter.textContent = target;
                animMap.delete(counter);
            }
        }

        const rafId = requestAnimationFrame(tick);
        animMap.set(counter, rafId);
    }

    const numbersObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(c => animateCounter(c));
            } else {
                counters.forEach(c => {
                    if (animMap.has(c)) {
                        cancelAnimationFrame(animMap.get(c));
                        animMap.delete(c);
                    }
                    c.textContent = '0';
                });
            }
        });
    }, { threshold: 0.5 });

    numbersObserver.observe(section);
});

// ========== Navbar Scroll ==========
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 600);
});
// =====================

window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

