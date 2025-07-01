// 🚀 Scroll suave para enlaces internos (como #programa)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute("href"));
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 🎯 Mensaje al hacer clic en el botón principal del hero
const botonHero = document.querySelector('.btn');
if (botonHero) {
  botonHero.addEventListener('click', () => {
    console.log("Botón principal clickeado: scroll activado.");
  });
}

// 💡 Mensaje al hacer clic en las tarjetas
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    alert("📣 Esta sección estará disponible muy pronto. ¡Gracias por tu interés!");
  });
});
