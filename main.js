/* ============================================================
   CARAVAGE — Main JavaScript
   Navigation, scroll effects, animations
   ============================================================ */

// ── Navigation scroll effect ──
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');
const mobileClose = document.querySelector('.nav-mobile-close');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ── Mobile navigation ──
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

if (mobileClose && mobileNav) {
  mobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Active nav link ──
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  if (link.getAttribute('data-page') === currentPath) {
    link.classList.add('active');
  }
});

// ── Scroll reveal animation ──
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ── Contact form submission ──
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Get form values
    const inquiry = document.querySelector('input[name="inquiry"]:checked').value;
    const fullName = document.getElementById('name').value;
    const org = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // 2. Create Subject
    const subject = `[${inquiry}] Inquiry from Caravage.ch - ${fullName}`;

    // 3. Create Body
    let body = `Hello, Theophane`;
    body += `I am reaching out to you from Caravage.ch%0D%0A%0D%0A`;
    body += `Name: ${fullName}%0D%0A`;
    if (org) body += `Organisation: ${org}%0D%0A`;
    body += `Email: ${email}%0D%0A`;
    if (phone) body += `Phone: ${phone}%0D%0A`;
    body += `Message:%0D%0A${message}`;

    // 4. Encode subject and message content
    const encodedSubject = encodeURIComponent(subject);
    const finalBody = body.replace(message, encodeURIComponent(message));

    // 5. Open email client
    const mailToLink = `mailto:theophane@caravage.ch?subject=${encodedSubject}&body=${finalBody}`;
    window.location.href = mailToLink;

    // Optional: UI feedback
    const btn = contactForm.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Opening Mail Client...';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 3000);
  });
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 20 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
