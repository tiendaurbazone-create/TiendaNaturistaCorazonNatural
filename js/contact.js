// Corazón Natural - Contact Form Management

function handleContactForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Obtener los datos del formulario
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validar que todos los campos estén llenos
    if (!name || !email || !message) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Validar el formato del email
    if (!isValidEmail(email)) {
        showToast('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Crear el asunto y cuerpo del email
    const subject = `Consulta desde la web - ${name}`;
    const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
    
    // Crear el enlace mailto
    const mailtoLink = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir el cliente de correo
    window.location.href = mailtoLink;
    
    // Mostrar mensaje de confirmación
    showToast('Abriendo tu cliente de correo...', 'success');
    
    // Limpiar el formulario después de un momento
    setTimeout(() => {
        form.reset();
        showToast('¡Mensaje preparado! Por favor envía el email desde tu cliente de correo.', 'info');
    }, 1000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Manejar envío del formulario cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});