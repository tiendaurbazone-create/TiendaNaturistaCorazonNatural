// Corazón Natural - UI Management and Utilities

// Toast notifications
function showToast(message, type = 'info', duration = null) {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${getBootstrapColor(type)} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Agregar al container de toasts
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Determinar duración según el tipo de mensaje
    let toastDelay = duration;
    if (!toastDelay) {
        if (message.includes('agregado al carrito')) {
            toastDelay = 800; // Solo 0.8 segundos para productos agregados
        } else {
            toastDelay = 1200; // 1.2 segundos para otros mensajes
        }
    }
    
    // Mostrar el toast con duración reducida
    const bsToast = new bootstrap.Toast(toast, {
        delay: toastDelay
    });
    bsToast.show();
    
    // Eliminar el toast del DOM después de que se oculte
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function getBootstrapColor(type) {
    const colors = {
        'success': 'success',
        'error': 'danger',
        'warning': 'warning',
        'info': 'info'
    };
    return colors[type] || 'info';
}

// Smooth scrolling para navegación
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Loading spinner
function showLoading(element) {
    if (element) {
        element.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        `;
    }
}

function hideLoading(element, originalContent) {
    if (element) {
        element.innerHTML = originalContent;
    }
}

// Inicializar animaciones AOS (Animate On Scroll)
function initAnimations() {
    // Simular AOS básico sin la librería
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    document.querySelectorAll('.product-card, .benefit-item, .section').forEach(el => {
        observer.observe(el);
    });
}

// Lazy loading para imágenes
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Contador animado
function animateCounter(element, finalValue, duration = 2000) {
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Manejar formularios genéricos
function handleFormSubmit(form, onSuccess) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Mostrar loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
        
        // Simular envío
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            if (onSuccess) {
                onSuccess();
            }
        }, 1500);
    });
}

// Inicializar botones de filtro de productos
function initProductFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el filtro y llamar la función
            const filter = this.getAttribute('data-filter');
            if (typeof filterProducts === 'function') {
                filterProducts(filter);
            } else {
                console.error('La función filterProducts no está disponible');
            }
        });
    });
}

// Inicializar botón "Cargar más productos"
function initLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            if (typeof loadMoreProducts === 'function') {
                loadMoreProducts();
            } else {
                console.error('La función loadMoreProducts no está disponible');
            }
        });
    }
}

// Inicializar botón del carrito - SIMPLIFICADO
function initCartButton() {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.show();
        });
    }
}

// Función para actualizar el contador del carrito - SIMPLIFICADA
function updateCartCounters(count) {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initNavbarScrollEffect();
    initAnimations();
    initLazyLoading();
    initProductFilters();
    initLoadMoreButton();
    initCartButton();
    
    // Inicializar autocompletado después de que los productos estén cargados
    setTimeout(() => {
        if (typeof initializeAutocomplete === 'function') {
            initializeAutocomplete();
        }
    }, 500);
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers de Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Utilidades adicionales
const Utils = {
    // Formatear precio
    formatPrice: (price) => {
        return `$${price.toLocaleString()}`;
    },
    
    // Formatear texto para URL
    slugify: (text) => {
        return text.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    },
    
    // Capitalizar primera letra
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    // Truncar texto
    truncate: (str, length = 100) => {
        return str.length > length ? str.substring(0, length) + '...' : str;
    },
    
    // Validar si es móvil
    isMobile: () => {
        return window.innerWidth <= 768;
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};