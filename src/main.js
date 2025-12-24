/**
 * ZENTRAQ FLUX - Official Script 2025
 * Использование методов forEach для всех коллекций элементов
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Инициализация плавного скролла Lenis
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // 2. Инициализация иконок Lucide
  const iconContainers = document.querySelectorAll('[data-lucide]');
  iconContainers.forEach(() => {
      lucide.createIcons();
  });

  // 3. Навигация и Мобильное Меню
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link, .footer__list a, .hero__btns a');

  // Переключение меню
  const toggleMenu = () => {
      burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);

  // Плавный скролл для всех ссылок через forEach
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');

          if (href.startsWith('#')) {
              e.preventDefault();

              // Если меню открыто — закрываем
              if (mobileMenu.classList.contains('active')) toggleMenu();

              const target = document.querySelector(href);
              if (target) {
                  lenis.scrollTo(target, { offset: -80 });
              }
          }
      });
  });

  // 4. Анимации GSAP (ScrollTrigger)
  gsap.registerPlugin(ScrollTrigger);

  // Анимация карточек программ
  const programCards = document.querySelectorAll('.program-card');
  programCards.forEach((card, i) => {
      gsap.from(card, {
          scrollTrigger: {
              trigger: card,
              start: "top 90%"
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.1
      });
  });

  // Анимация отзывов (эффект парения)
  const reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach((card) => {
      const speed = card.getAttribute('data-speed') || 1;
      gsap.to(card, {
          y: -20 * speed,
          repeat: -1,
          yoyo: true,
          duration: 2 + Math.random(),
          ease: "sine.inOut"
      });
  });

  // 5. Валидация Формы и Капча
  const form = document.getElementById('main-form');
  const phoneInput = document.getElementById('phone-input');
  const captchaQ = document.getElementById('captcha-question');
  const captchaA = document.getElementById('captcha-answer');
  const formMsg = document.getElementById('form-message');

  // Только цифры в телефоне через forEach (если бы полей было много)
  [phoneInput].forEach(input => {
      input.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
      });
  });

  let n1, n2, sum;
  const genCaptcha = () => {
      n1 = Math.floor(Math.random() * 10);
      n2 = Math.floor(Math.random() * 5);
      sum = n1 + n2;
      captchaQ.innerText = `${n1} + ${n2} = ?`;
  };
  genCaptcha();

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (parseInt(captchaA.value) !== sum) {
          formMsg.innerText = "Неверная капча!";
          formMsg.className = "form-message error";
          return;
      }

      formMsg.innerText = "Отправка...";
      formMsg.className = "form-message success";

      setTimeout(() => {
          formMsg.innerText = "Успешно отправлено! Мы свяжемся с вами.";
          form.reset();
          genCaptcha();
      }, 1500);
  });

  // 6. Cookie Popup
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtns = document.querySelectorAll('#cookie-accept');

  if (!localStorage.getItem('zentraq_cookie_accepted')) {
      setTimeout(() => { cookiePopup.style.display = 'flex'; }, 2000);
  }

  acceptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          localStorage.setItem('zentraq_cookie_accepted', 'true');
          cookiePopup.style.display = 'none';
      });
  });
});