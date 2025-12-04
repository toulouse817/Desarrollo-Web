document.addEventListener('DOMContentLoaded', () => {
    const welcomeBtn = document.getElementById('welcome-btn');

    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
            alert('¡Bienvenido a mi portafolio! Gracias por visitar.');
        });
    }
});
