document.documentElement.classList.add('js-ready');

const sections = document.querySelectorAll<HTMLElement>('section[id]');
const backToTopButton = document.querySelector<HTMLElement>('.back-to-top');
const revealElements = document.querySelectorAll<HTMLElement>('.reveal-up, .habilidade-card, .contato-item, .info-card, .timeline-item, .chips span, .links-list a');

function activateMenuAtCurrentSection(): void {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 140;
    const sectionId = current.getAttribute('id');
    const menuLink = document.querySelector<HTMLElement>(`.menu a[href="#${sectionId}"]`);

    if (!menuLink) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      menuLink.classList.add('active-link');
    } else {
      menuLink.classList.remove('active-link');
    }
  });
}

function toggleBackToTopButton(): void {
  if (!backToTopButton) return;
  if (window.scrollY > 380) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

const observer = new IntersectionObserver(
  (entries, observerRef) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('revealed');
        observerRef.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 320)}ms`;
  observer.observe(element);
});

window.addEventListener('scroll', activateMenuAtCurrentSection);
window.addEventListener('scroll', toggleBackToTopButton);

activateMenuAtCurrentSection();
toggleBackToTopButton();
