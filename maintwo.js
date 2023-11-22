$(document).ready(function () {
  $(".w-webflow-badge").removeClass("w-webflow-badge").empty();
});

const elementos = ["body", ".nav_overlay", ".barra"];

function cambiarColorDeFondo() {
  // Colores específicos para el degradado
  const color1 = "#4F90FD";  // Azul
  const color2 = "#00D14F";  // Rojo
  const color3 = "#FD990F";  // Rojo

  // Aplicar el degradado al fondo de cada elemento
  for (let i = 0; i < elementos.length; i++) {
    const elemento = document.querySelector(elementos[i]);
    elemento.style.background = `linear-gradient(to right, ${color1}, ${color2},${color3})`;
  }

  // Restaurar el fondo original después de un segundo
  setTimeout(() => {
    for (let i = 0; i < elementos.length; i++) {
      const elemento = document.querySelector(elementos[i]);
      elemento.style.background = "";
    }
  }, 2000);
}

// Cambiar el color de fondo cada 5 segundos
setInterval(cambiarColorDeFondo, 10000);
