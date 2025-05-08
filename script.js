document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('nav ul');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link (para single page)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.onscroll = function() {
        scrollFunction();
        handleNavLinkActiveOnScroll(); // Adicionado para atualizar active link no scroll
    };

    function scrollFunction() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            if(backToTopBtn) backToTopBtn.style.display = "flex"; // Usa flex por causa do align/justify
        } else {
            if(backToTopBtn) backToTopBtn.style.display = "none";
        }
    }

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Atualizar ano no rodapé
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Funcionalidade do Acordeão
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        if (header && content) { // Verifica se os elementos existem
            header.addEventListener('click', () => {
                // Comentado para permitir múltiplos abertos. Descomente para acordeão exclusivo.
                /*
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.accordion-content');
                        const otherHeader = otherItem.querySelector('.accordion-header');
                        if (otherContent && otherContent.classList.contains('active')) {
                            otherContent.classList.remove('active');
                            otherContent.style.maxHeight = null;
                            if(otherHeader) otherHeader.classList.remove('active');
                        }
                    }
                });
                */

                const isActive = content.classList.contains('active');
                if (isActive) {
                    content.classList.remove('active');
                    content.style.maxHeight = null;
                    header.classList.remove('active');
                } else {
                    content.classList.add('active');
                    // Fecha outros itens se o comportamento exclusivo estiver ativado
                    if (document.querySelector('.accordion-exclusive')) { // Adicione essa classe se quiser exclusivo
                         accordionItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                const otherContent = otherItem.querySelector('.accordion-content');
                                const otherHeader = otherItem.querySelector('.accordion-header');
                                if (otherContent && otherContent.classList.contains('active')) {
                                    otherContent.classList.remove('active');
                                    otherContent.style.maxHeight = null;
                                    if(otherHeader) otherHeader.classList.remove('active');
                                }
                            }
                        });
                    }
                    content.style.maxHeight = content.scrollHeight + "px";
                    header.classList.add('active');
                }
            });
        }
    });

    // Active link na navegação ao rolar
    const sections = document.querySelectorAll('main section[id]'); // Pega apenas seções com ID
    const navLinks = document.querySelectorAll('nav ul li a');
    const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 75;


    function handleNavLinkActiveOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // Subtrai altura do header e uma margem
            if (pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Caso especial para o topo da página (seção "inicio")
        if (pageYOffset < (document.getElementById('inicio') ? document.getElementById('inicio').offsetTop + document.getElementById('inicio').offsetHeight - headerHeight - 20 : 200) ) {
             currentSectionId = 'inicio';
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            // Verifica se o href do link (removendo o '#') corresponde ao ID da seção atual
            if (link.getAttribute('href') && link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    // Chama uma vez para definir o estado inicial ao carregar a página
    handleNavLinkActiveOnScroll();


}); // Fim do DOMContentLoaded