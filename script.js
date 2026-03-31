// ========================================
// Sondos Elsayed - Portfolio JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Scroll Reveal Animation =====
  const reveals = document.querySelectorAll('.reveal');
  function revealOnScroll() {
    reveals.forEach(function (el) {
      const windowHeight = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ===== Skill Bars Animation =====
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  function animateSkillBars() {
    skillBars.forEach(function (bar) {
      const windowHeight = window.innerHeight;
      const top = bar.getBoundingClientRect().top;
      if (top < windowHeight - 50) {
        bar.style.width = bar.getAttribute('data-width');
      }
    });
  }
  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars();

  // ===== Typing Effect =====
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = ['Frontend Developer', 'UI/UX Enthusiast', 'Creative Coder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = words[wordIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // Reset
      [name, email, message].forEach(function (el) {
        el.classList.remove('is-invalid');
      });

      if (!name.value.trim() || name.value.trim().length < 2) {
        name.classList.add('is-invalid');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
      }

      if (isValid) {
        const successAlert = document.getElementById('formSuccess');
        if (successAlert) {
          successAlert.style.display = 'block';
          setTimeout(function () {
            successAlert.style.display = 'none';
          }, 4000);
        }
        contactForm.reset();
      }
    });
  }

  // ===== Active Nav Link =====
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'home.html')) {
      link.classList.add('active');
    }
  });

  // ===== Dark/Light Mode Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  const rootElement = document.documentElement;
  const swappedClass = 'light-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      rootElement.classList.add(swappedClass);
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      rootElement.classList.remove(swappedClass);
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }

  const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const nextTheme = rootElement.classList.contains(swappedClass) ? 'dark' : 'light';
      applyTheme(nextTheme);
      localStorage.setItem('portfolioTheme', nextTheme);
    });
  }

  // ===== Slider Controls =====
  const sliderTrack = document.querySelector('.slider-track');
  const sliderItems = document.querySelectorAll('.slider-item');

  if (sliderTrack && sliderItems.length > 0) {
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    let currentIndex = 0;

    function scrollToIndex(index) {
      const item = sliderItems[index];
      item && item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        scrollToIndex(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        scrollToIndex(currentIndex);
      });
    }

    setInterval(function () {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      scrollToIndex(currentIndex);
    }, 5000);
  }

});
