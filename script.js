document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const backToTopButton = document.querySelector('.back-to-top');
    const revealElements = document.querySelectorAll('.reveal-up, .habilidade-card, .contato-item');

    function activateMenuAtCurrentSection() {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute('id');
            const menuLink = document.querySelector(`.menu a[href="#${sectionId}"]`);

            if (!menuLink) return;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                menuLink.classList.add('active-link');
            } else {
                menuLink.classList.remove('active-link');
            }
        });
    }

    function toggleBackToTopButton() {
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
                    entry.target.classList.add('revealed');
                    observerRef.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 60, 260)}ms`;
        observer.observe(element);
    });

    window.addEventListener('scroll', activateMenuAtCurrentSection);
    window.addEventListener('scroll', toggleBackToTopButton);

    // Fixa estado inicial sem depender do primeiro scroll.
    activateMenuAtCurrentSection();
    toggleBackToTopButton();
});