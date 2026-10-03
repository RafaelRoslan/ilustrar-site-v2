(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const hero = carousel.closest('.hero');
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const dotsContainer = hero?.querySelector('[data-carousel-dots]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentSlide = 0;
  let autoplayId = null;
  let touchStartX = 0;
  let touchStartY = 0;

  /*
   * PAGINAÇÃO AUTOMÁTICA
   * Uma bolinha é criada para cada elemento com [data-slide].
   * Para incluir outro destaque, basta duplicar um slide no HTML.
   */
  const createPagination = () => {
    if (!dotsContainer) return [];

    dotsContainer.innerHTML = '';

    return slides.map((_, index) => {
      const dot = document.createElement('button');
      const isFirst = index === 0;

      dot.type = 'button';
      dot.className = `hero-carousel-dot${isFirst ? ' is-active' : ''}`;
      dot.dataset.carouselDot = String(index);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Mostrar destaque ${index + 1}`);
      dot.setAttribute('aria-selected', String(isFirst));

      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const dots = createPagination();

  const applyHeroTheme = (slide) => {
    if (!hero) return;
    hero.dataset.heroTheme = slide.dataset.theme || 'default';
  };

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === currentSlide;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });

    applyHeroTheme(slides[currentSlide]);
  };

  const stopAutoplay = () => {
    if (autoplayId) window.clearInterval(autoplayId);
    autoplayId = null;
  };

  const startAutoplay = () => {
    if (reducedMotion || slides.length < 2) return;

    stopAutoplay();
    autoplayId = window.setInterval(() => {
      showSlide(currentSlide + 1);
    }, 7000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  /*
   * SWIPE MOBILE
   * Gestos majoritariamente horizontais com pelo menos 48px mudam o slide.
   * A rolagem vertical continua nativa graças a listeners passivos + pan-y.
   */
  carousel.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      stopAutoplay();
    },
    { passive: true }
  );

  carousel.addEventListener(
    'touchend',
    (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.15;

      if (isHorizontal && Math.abs(deltaX) >= 48) {
        showSlide(deltaX < 0 ? currentSlide + 1 : currentSlide - 1);
      }

      startAutoplay();
    },
    { passive: true }
  );

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  });

  showSlide(0);
  startAutoplay();
})();
