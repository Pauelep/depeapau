$(document).ready(function () {
  $(".w-webflow-badge").removeClass("w-webflow-badge").empty();
});

function cambiarColorDeFondo() {
  // Colores específicos para el degradado
  const color1 = "#4F90FD";  // Azul
  const color2 = "#00D14F";  // Rojo
  const color3 = "#FD990F";  // Rojo

  // Aplicar el degradado al fondo del body
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2},${color3})`;

  // Aplicar el degradado al fondo de .barra
  document.querySelector('.barra').style.background = `linear-gradient(to right, ${color1}, ${color2},${color3})`;

  // Restaurar el fondo original después de un segundo
  setTimeout(() => {
    document.body.style.background = "";
    document.querySelector('.barra').style.background = "#ffffff"; // Restaurar el color original de .barra
  }, 2000);
}

// Cambiar el color de fondo cada 5 segundos
setInterval(cambiarColorDeFondo, 60000);
