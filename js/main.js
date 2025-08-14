// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Slider de depoimentos
const depoimentos = document.querySelectorAll('.depoimento');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentIndex = 0;

function showDepoimento(index) {
    depoimentos.forEach(depoimento => depoimento.classList.remove('active'));
    depoimentos[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : depoimentos.length - 1;
    showDepoimento(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < depoimentos.length - 1) ? currentIndex + 1 : 0;
    showDepoimento(currentIndex);
});

// Auto-rotacionar depoimentos
setInterval(() => {
    currentIndex = (currentIndex < depoimentos.length - 1) ? currentIndex + 1 : 0;
    showDepoimento(currentIndex);
}, 5000);

// Tabs de serviços
const tabBtns = document.querySelectorAll('.tab-btn');
const servicoContents = document.querySelectorAll('.servico-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover active de todos os botões e conteúdos
        tabBtns.forEach(btn => btn.classList.remove('active'));
        servicoContents.forEach(content => content.classList.remove('active'));
        
        // Adicionar active ao botão clicado
        btn.classList.add('active');
        
        // Mostrar o conteúdo correspondente
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        answer.classList.toggle('active');
    });
});

// Animação de contagem
const countElements = document.querySelectorAll('.count');

function animateCount() {
    countElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 16ms por frame
        
        let current = 0;
        const increment = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(increment);
            } else {
                element.textContent = target;
            }
        };
        
        increment();
    });
}

// Observador para animar quando o elemento estiver visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

countElements.forEach(element => {
    observer.observe(element);
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
