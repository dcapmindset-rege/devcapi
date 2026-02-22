/* ============================================
   DEVCAPI LTD — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------
  // NAV SCROLL BEHAVIOR
  // ----------------------------------------
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ----------------------------------------
  // MOBILE MENU
  // ----------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ----------------------------------------
  // SCROLL REVEAL
  // ----------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ----------------------------------------
  // ACTIVE NAV LINK ON SCROLL
  // ----------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` 
            ? 'var(--text-primary)' 
            : '';
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -40% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ----------------------------------------
  // CONTACT FORM
  // ----------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;

      // Basic validation
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const inquiry = contactForm.querySelector('#inquiry').value;

      if (!name || !email || !inquiry) {
        shakeForm(contactForm);
        return;
      }

      if (!isValidEmail(email)) {
        const emailInput = contactForm.querySelector('#email');
        emailInput.style.borderColor = 'rgba(200, 80, 60, 0.5)';
        emailInput.focus();
        setTimeout(() => emailInput.style.borderColor = '', 2000);
        return;
      }

      // Simulate submission (replace with actual endpoint)
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';

      await simulateSubmit();

      // Show success state
      const successEl = document.createElement('div');
      successEl.className = 'form-success visible';
      successEl.innerHTML = `
        <div class="form-success__icon">◆</div>
        <h3 class="form-success__title">Inquiry Received</h3>
        <p class="form-success__text">Thank you for reaching out. A member of our team will respond personally within 48 hours.</p>
      `;

      contactForm.style.opacity = '0';
      contactForm.style.transition = 'opacity 0.4s';

      setTimeout(() => {
        contactForm.parentNode.replaceChild(successEl, contactForm);
        successEl.style.opacity = '0';
        successEl.style.transition = 'opacity 0.6s';
        setTimeout(() => successEl.style.opacity = '1', 50);
      }, 400);
    });
  }


  // ----------------------------------------
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });


  // ----------------------------------------
  // HERO PARALLAX (subtle)
  // ----------------------------------------
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');

  if (hero && heroContent) {
    const handleParallax = () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const offset = scrolled * 0.2;
        heroContent.style.transform = `translateY(${offset}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
      }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
  }


  // ----------------------------------------
  // NUMBER COUNTER ANIMATION
  // ----------------------------------------
  const engagementAmounts = document.querySelectorAll('.engagement__amount');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  engagementAmounts.forEach(el => counterObserver.observe(el));


  // ----------------------------------------
  // HELPERS
  // ----------------------------------------
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function simulateSubmit() {
    return new Promise(resolve => setTimeout(resolve, 1200));
  }

  function shakeForm(form) {
    form.style.animation = 'none';
    form.offsetHeight; // reflow
    form.style.animation = 'shake 0.4s ease';
    setTimeout(() => form.style.animation = '', 400);
  }

  function animateCounter(el) {
    const text = el.textContent;
    const match = text.match(/\$(\d+)M/);
    if (!match) return;

    const target = parseInt(match[1]);
    const duration = 1200;
    const start = performance.now();

    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = `$${current}M`;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = `$${target}M`;
    };

    requestAnimationFrame(update);
  }

});


// ----------------------------------------
// CSS KEYFRAME FOR SHAKE (injected)
// ----------------------------------------
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
