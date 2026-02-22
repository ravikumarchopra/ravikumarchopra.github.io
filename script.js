/* ========================================================
   NAVBAR SCROLL
   ======================================================== */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 400);
});

/* ========================================================
   HAMBURGER MENU
   ======================================================== */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

/* ========================================================
   TYPED TEXT
   ======================================================== */
const phrases = [
  'Co-founder & CTO',
  'AI Automation Expert',
  'Voice Agent Builder',
  'Chatbot Developer',
  'Python / FastAPI Engineer',
  'Node.js / Express Developer',
  'Full-Stack Architect',
  'Tech Entrepreneur'
];
const typedEl = document.querySelector('.typed-text');
let pIdx = 0, cIdx = 0, del = false;

function type() {
  const phrase = phrases[pIdx];
  typedEl.textContent = del ? phrase.slice(0, cIdx--) : phrase.slice(0, cIdx++);
  let delay = del ? 50 : 90;
  if (!del && cIdx > phrase.length) { delay = 2200; del = true; }
  else if (del && cIdx < 0) { del = false; pIdx = (pIdx + 1) % phrases.length; delay = 500; }
  setTimeout(type, delay);
}
type();

/* ========================================================
   SKILL BAR ANIMATION
   ======================================================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sr-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

/* ========================================================
   SKILLS FILTER TABS
   ======================================================== */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.tab;
    document.querySelectorAll('.skill-group').forEach(g => {
      const cat = g.dataset.category;
      const show = filter === 'all' || cat === filter;
      g.style.display = show ? 'block' : 'none';
      g.style.opacity = show ? '1' : '0';
    });
  });
});

/* ========================================================
   SCROLL REVEAL
   ======================================================== */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal], [data-reveal-delay]').forEach(el => revealObs.observe(el));

// Staggered children
document.querySelectorAll('.services-grid, .skills-masonry, .edu-grid, .products-grid, .trust-pillars').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.1}s`;
    if (!child.hasAttribute('data-reveal')) {
      child.setAttribute('data-reveal', '');
      revealObs.observe(child);
    }
  });
});

/* ========================================================
   ACTIVE NAV HIGHLIGHT
   ======================================================== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}, { passive: true });

/* ========================================================
   CONTACT FORM
   ======================================================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const contactSubmitBtn = document.getElementById('contactSubmitBtn');

if (contactForm && formSuccess && formError && contactSubmitBtn) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formError.style.display = 'none';
    formSuccess.style.display = 'none';

    const spamTrap = contactForm.querySelector('input[name="website"]');
    if (spamTrap && spamTrap.value.trim() !== '') {
      return;
    }

    const selectedService = contactForm.querySelector('select[name="service"]');
    const selectedBudget = contactForm.querySelector('select[name="budget"]');

    if (!selectedService || !selectedService.value || !selectedBudget || !selectedBudget.value) {
      formError.innerHTML = '<i class="fas fa-circle-exclamation"></i> Please select both service and budget range before sending.';
      formError.style.display = 'flex';
      return;
    }

    const originalContent = contactSubmitBtn.innerHTML;
    contactSubmitBtn.disabled = true;
    contactSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/r.k.chopra5000@gmail.com', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Message received! I\'ll respond within 24 hours.';
      formSuccess.style.display = 'flex';
      contactForm.reset();
      window.location.hash = 'thank-you';
    } catch (error) {
      formSuccess.innerHTML = '<i class="fas fa-circle-exclamation"></i> Could not send message right now. Please email me directly at r.k.chopra5000@gmail.com.';
      formSuccess.style.display = 'flex';
    } finally {
      contactSubmitBtn.disabled = false;
      contactSubmitBtn.innerHTML = originalContent;
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }
  });
}

/* ========================================================
   ORBIT ANIMATION (CSS fallback fix)
   ======================================================== */
document.querySelectorAll('.orbit-icon').forEach(icon => {
  const angle = parseInt(icon.style.getPropertyValue('--angle'));
  icon.style.transform = `
    translate(-50%, -50%)
    rotate(${angle}deg)
    translateX(170px)
    rotate(-${angle}deg)
  `;
});

/* ========================================================
   CURSOR GLOW EFFECT
   ======================================================== */
const cursor = document.createElement('div');
cursor.style.cssText = `
  position:fixed; width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
  pointer-events:none; z-index:0; transform:translate(-50%,-50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(cursor);
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
}, { passive: true });