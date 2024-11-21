document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const bullets = document.querySelectorAll('.bullet');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === index);
        });
        const offset = -index * 100;
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 4000); // Cambia de imagen cada 4 segundos

    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    showSlide(currentIndex);
});