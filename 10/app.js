const slides = document.querySelectorAll('.slide');
const leftClick = document.querySelector('.leftClick');
const rightClick = document.querySelector('.rightClick');

console.log(slides, typeof slides);

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
};

rightClick.addEventListener('click', () => {
    currentSlide = (currentSlide + 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

leftClick.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

showSlide(currentSlide);