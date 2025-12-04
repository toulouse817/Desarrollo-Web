// Esperamos a que el documento cargue
console.log("Sistema cargado correctamente.");

// Seleccionamos el botón del HTML por su ID
const boton = document.getElementById('btn-saludo');

// Agregamos un "oído" (EventListener) para cuando hagan clic
boton.addEventListener('click', function() {
    alert("¡Felicidades! Tu entorno de JavaScript está funcionando perfectamente 🚀");
    
    // Cambiar el texto del botón después del clic
    boton.textContent = "¡Ya hiciste clic!";
    boton.style.backgroundColor = "#28a745"; // Cambia a verde
});


