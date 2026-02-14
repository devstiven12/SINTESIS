const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

function scrollHeader() {
  if (window.scrollY >= 50) {
    header.classList.add('scroll-header');
  } else {
    header.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', scrollHeader);

const sections = document.querySelectorAll('.section');
const options = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, options);

sections.forEach(section => {
  sectionObserver.observe(section);
});

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
      showMessage('Por favor, completa todos los campos requeridos.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }

    // Construir mensaje para WhatsApp
    const phoneNumber = '573104710120'; // REEMPLAZAR con el número real
    const whatsappMessage = `🤖✨ *¡NUEVO CONTACTO SINTESIS!* ✨🤖\n\n` +
      `👋 *Hola, soy:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📲 *WhatsApp:* ${phone}\n\n` +
      `💡 *Idea / Mensaje:*\n${message}\n\n` +
      `🚀 *¡Transformemos esto en realidad!* 🚀\n` +
      `💻 _Enviado desde tu Sitio Web_`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Crear un enlace temporal y simular clic para abrir en nueva pestaña de forma segura
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();

    showMessage('¡Mensaje listo para enviar! Abriendo WhatsApp...', 'success');
    contactForm.reset();
  });
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';

  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* Mobile Card Interaction Logic */
const aboutCards = document.querySelectorAll('.about-card');

if (aboutCards.length > 0) {
  // Check if device supports hover
  const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  };

  aboutCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Only apply click logic on touch devices or small screens
      if (isTouchDevice() || window.innerWidth <= 768) {
        // Remove active class from other cards
        aboutCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('active');
          }
        });
        
        // Toggle active class on clicked card
        card.classList.toggle('active');
      }
    });
  });

  // Close card when clicking outside
  document.addEventListener('click', (e) => {
    if (isTouchDevice() || window.innerWidth <= 768) {
      if (!e.target.closest('.about-card')) {
        aboutCards.forEach(card => {
          card.classList.remove('active');
        });
      }
    }
  });
}

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('show-menu');
  }
});
