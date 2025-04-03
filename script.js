document.addEventListener('DOMContentLoaded', async () => {
    // Manejo del menú responsive (ícono hamburguesa)
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
  
    // Cuando doy click en el ícono, se muestra u oculta el menú
    menuIcon?.addEventListener('click', () => {
      navbar.classList.toggle('active');
      menuIcon.classList.toggle('bx-x'); // cambia el ícono de hamburguesa a X
    });
  
    // Cuando se hace clic en un enlace del navbar, se cierra el menú automáticamente
    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
      });
    });
  
    // Esto resalta el link activo en el navbar mientras hago scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
  
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
  
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
  
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  
    // Cargar la info desde un archivo JSON externo (data.json)
    try {
      const res = await fetch('data.json');
      const data = await res.json();
  
      // Datos de la sección Home
      document.querySelector('.home-content h1').innerHTML = `Hi, It's <span>${data.home.name}</span>`;
      document.querySelector('.home-content p').textContent = data.home.description;
  
      // Redes sociales en el Home
      const socials = document.querySelector('.social-icons');
      socials.innerHTML = `
        <a href="${data.home.socials.linkedin}"><i class='bx bxl-linkedin'></i></a>
        <a href="${data.home.socials.github}"><i class='bx bxl-github'></i></a>
        <a href="${data.home.socials.instagram}"><i class='bx bxl-instagram-alt'></i></a>
        <a href="${data.home.socials.twitter}"><i class='bx bxl-twitter'></i></a>
      `;
  
      // Educación
      const educationContainer = document.querySelector('.timeline-items');
      educationContainer.innerHTML = data.education.map(item => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">${item.date}</div>
          <div class="timeline-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </div>
      `).join('');
  
      // Servicios
      const servicesContainer = document.querySelector('.services-container');
      servicesContainer.innerHTML = data.services.map(service => `
        <div class="service-box">
          <div class="service-info">
            <h4>${service.title}</h4>
            <p>${service.description}</p>
          </div>
        </div>
      `).join('');
  
      // Testimonios
      const testimonialsWrapper = document.querySelector('.wrapper');
      testimonialsWrapper.innerHTML = data.testimonials.map(t => `
        <div class="testimonial-item">
          <img src="${t.image}" alt="${t.name}" />
          <h2>${t.name}</h2>
          <div class="rating"></div>
          <p>${t.text}</p>
        </div>
      `).join('');
  
    } catch (err) {
      // Por si algo falla cargando el JSON
      console.error('Error loading data.json:', err);
    }
  });
  
