// Navegación del menú principal
function cargarIframe(pagina) {
  window.location.href = pagina;
}

// Feedback del usuario en la guía vecinal
function submitFeedback(respuesta) {
  const mensaje = document.getElementById('feedbackMessage');
  const botones = document.querySelectorAll('.feedback-btn');

  botones.forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
  });

  mensaje.style.display = 'block';
  mensaje.innerHTML = respuesta === 'si'
    ? '<p>¡Excelente! Nos alegra que la guía te haya sido útil 🌟</p>'
    : '<p>Gracias por tu feedback. Trabajaremos para mejorar 🔧</p>';
}

// 🚀 Scroll suave para enlaces internos
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

// ✨ Animación suave cuando los tips aparecen en pantalla
const tips = document.querySelectorAll('.tip');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

tips.forEach(tip => {
  tip.style.opacity = '0';
  tip.style.transform = 'translateY(20px)';
  tip.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(tip);
});

// 🖱️ Efecto visual al hacer clic en los tips
tips.forEach(tip => {
  tip.addEventListener('click', function () {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
});

// ☎️ Animación del número de emergencia
const phoneNumber = document.querySelector('.phone-number');
if (phoneNumber) {
  phoneNumber.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
    this.style.boxShadow = '0 5px 20px rgba(255, 255, 255, 0.3)';
  });
  phoneNumber.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'none';
  });
}

// 📥 Función para manejar el feedback
function submitFeedback(response) {
  const feedbackMessage = document.getElementById('feedbackMessage');
  const buttons = document.querySelectorAll('.feedback-btn');

  // Deshabilitar botones
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
  });

  // Mostrar mensaje
  feedbackMessage.style.display = 'block';

  console.log('Feedback enviado:', response);

  // Mensaje personalizado
  if (response === 'si') {
    feedbackMessage.innerHTML = '<p>¡Excelente! Nos alegra que la guía te haya sido útil 🌟</p>';
  } else {
    feedbackMessage.innerHTML = '<p>Gracias por tu feedback. Trabajaremos para mejorar 🔧</p>';
  }
}

