// Smooth scrolling para navegação, descontando sempre a altura atual do menu
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Recalcula a altura do nav no momento do clique
    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight;

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    // Posição do elemento + scroll da página, já subtraindo navHeight
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});
