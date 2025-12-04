// ESPERAR A QUE EL DOM ESTÉ CARGADO
// Esto asegura que el script no corra antes de que exista el HTML
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DE MODO OSCURO / CLARO
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle'); // Botón
    const themeIcon = themeToggleBtn.querySelector('i'); // Icono dentro del botón
    const body = document.body; // Elemento body

    // Recuperar preferencia guardada en el navegador (LocalStorage)
    const currentTheme = localStorage.getItem('theme');
    
    // Si la preferencia era 'light', aplicar clase y cambiar icono
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Escuchar el evento 'click' en el botón de tema
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode'); // Alternar clase
        
        // Comprobar si ahora es light mode para guardar preferencia y cambiar icono
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light'); // Guardar 'light'
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');  // Guardar 'dark'
        }
    });

    // ==========================================
    // 2. MENÚ MÓVIL (HAMBURGUESA)
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle para abrir/cerrar menú
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Añadir/Quitar clase CSS
        
        // Cambiar icono de hamburguesa (bars) a cerrar (times)
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Cerrar menú automáticamente al hacer click en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active'); // Quitar clase activa
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars'); // Restaurar icono
        });
    });

    // ==========================================
    // 3. SCROLLSPY (NAVEGACIÓN ACTIVA)
    // Marca el enlace del menú según la sección visible
    // ==========================================
    const sections = document.querySelectorAll('section'); // Todas las secciones
    const navItems = document.querySelectorAll('.nav-links a'); // Todos los links

    window.addEventListener('scroll', () => {
        let current = ''; // Variable para guardar el ID de la sección actual
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Posición superior de la sección
            const sectionHeight = section.clientHeight; // Altura de la sección
            
            // Si el scroll ha bajado hasta esta sección (menos 100px de margen)
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id'); // Obtener ID (ej: 'proyectos')
            }
        });

        // Actualizar clases en el menú
        navItems.forEach(a => {
            a.classList.remove('active'); // Limpiar todos
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active'); // Activar el correcto
            }
        });
    });

    // ==========================================
    // 4. ANIMACIONES AL SCROLL (INTERSECTION OBSERVER)
    // Detecta cuando los elementos entran en pantalla
    // ==========================================
    
    // Seleccionamos todos los elementos con la clase 'reveal'
    const revealElements = document.querySelectorAll('.reveal');

    // Configuración del observador
    const revealOptions = {
        threshold: 0.1,       // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Margen inferior para activar un poco antes de llegar al final
    };

    // Crear el observador
    const revealOnScroll = new IntersectionObserver(function(entries, revealOnScroll) {
        entries.forEach(entry => {
            // Si el elemento no está en pantalla, no hacemos nada
            if (!entry.isIntersecting) {
                return; 
            } else {
                // Si está en pantalla, añadimos la clase 'active'
                entry.target.classList.add('active');
                // Dejamos de observar este elemento (para que no se anime de nuevo al subir)
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Aplicar el observador a cada elemento seleccionado
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // ==========================================
    // 5. MANEJO DEL FORMULARIO (SIMULACIÓN)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if(contactForm){ // Verificación de seguridad
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga de página
            
            // Referencia al botón y su texto original
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Estado de carga
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // Simular petición asíncrona (1.5 segundos)
            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! (Esto es una demo)');
                contactForm.reset(); // Limpiar campos
                btn.innerText = originalText; // Restaurar texto
                btn.disabled = false; // Habilitar botón
            }, 1500);
        });
    }
});