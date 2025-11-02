// Corazón Natural - Main JavaScript File

// Global Variables
let products = [];
let cart = [];
let currentFilter = 'all';
let productsLoaded = 12;
const productsPerPage = 12;

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
    phoneNumber: '573019638924', // +57 301 9638924
    businessName: 'Corazón Natural'
};

// Product Data - Using your available images
const productData = [
    {
        id: 1,
        name: "Té Verde Orgánico",
        category: "infusiones",
        price: 25000,
        originalPrice: 30000,
        image: "imagenes/MADRID (1).png",
        description: "Té verde 100% orgánico, rico en antioxidantes y propiedades depurativas.",
        benefits: ["Antioxidante", "Energizante", "Digestivo"],
        stock: 15
    },
    {
        id: 2,
        name: "Aceite de Coco Virgen",
        category: "aceites",
        price: 35000,
        originalPrice: 40000,
        image: "imagenes/MADRID (2).png",
        description: "Aceite de coco virgen extraído en frío, ideal para cocina y cuidado personal.",
        benefits: ["Hidratante", "Nutritivo", "Antimicrobiano"],
        stock: 22
    },
    {
        id: 3,
        name: "Manzanilla Premium",
        category: "hierbas",
        price: 18000,
        originalPrice: 22000,
        image: "imagenes/MADRID (3).png",
        description: "Flores de manzanilla secas, perfectas para infusiones relajantes.",
        benefits: ["Relajante", "Digestivo", "Anti-inflamatorio"],
        stock: 30
    },
    {
        id: 4,
        name: "Aceite Esencial de Lavanda",
        category: "aceites",
        price: 45000,
        originalPrice: 50000,
        image: "imagenes/MADRID (4).png",
        description: "Aceite esencial puro de lavanda, ideal para aromaterapia y relajación.",
        benefits: ["Relajante", "Aromático", "Cicatrizante"],
        stock: 18
    },
    {
        id: 5,
        name: "Hierba Buena Fresca",
        category: "hierbas",
        price: 12000,
        originalPrice: 15000,
        image: "imagenes/MADRID (5).png",
        description: "Hierba buena fresca y aromática, perfecta para tés e infusiones.",
        benefits: ["Digestivo", "Refrescante", "Descongestionante"],
        stock: 25
    },
    {
        id: 6,
        name: "Infusión de Jengibre",
        category: "infusiones",
        price: 28000,
        originalPrice: 32000,
        image: "imagenes/MADRID (6).png",
        description: "Raíz de jengibre deshidratada, excelente para la digestión y sistema inmune.",
        benefits: ["Digestivo", "Inmunológico", "Anti-inflamatorio"],
        stock: 20
    },
    {
        id: 7,
        name: "Aceite de Almendras",
        category: "aceites",
        price: 32000,
        originalPrice: 38000,
        image: "imagenes/MADRID (7).png",
        description: "Aceite de almendras dulces, ideal para masajes y cuidado de la piel.",
        benefits: ["Hidratante", "Nutritivo", "Suavizante"],
        stock: 16
    },
    {
        id: 8,
        name: "Eucalipto Medicinal",
        category: "hierbas",
        price: 22000,
        originalPrice: 26000,
        image: "imagenes/MADRID (8).png",
        description: "Hojas de eucalipto secas, perfectas para vaporizaciones y tés.",
        benefits: ["Expectorante", "Descongestionante", "Antiséptico"],
        stock: 28
    },
    {
        id: 9,
        name: "Té de Menta",
        category: "infusiones",
        price: 20000,
        originalPrice: 24000,
        image: "imagenes/MADRID (9).png",
        description: "Hojas de menta premium para preparar deliciosas infusiones digestivas.",
        benefits: ["Digestivo", "Refrescante", "Antiespasmódico"],
        stock: 24
    },
    {
        id: 10,
        name: "Aceite de Árbol de Té",
        category: "aceites",
        price: 42000,
        originalPrice: 48000,
        image: "imagenes/MADRID (10).png",
        description: "Aceite esencial de árbol de té, potente antiséptico natural.",
        benefits: ["Antiséptico", "Antimicrobiano", "Cicatrizante"],
        stock: 12
    },
    {
        id: 11,
        name: "Romero Orgánico",
        category: "hierbas",
        price: 16000,
        originalPrice: 20000,
        image: "imagenes/MADRID (11).png",
        description: "Hojas de romero orgánico, excelente para condimentar y propiedades medicinales.",
        benefits: ["Antioxidante", "Estimulante", "Digestivo"],
        stock: 32
    },
    {
        id: 12,
        name: "Infusión de Tilo",
        category: "infusiones",
        price: 24000,
        originalPrice: 28000,
        image: "imagenes/MADRID (12).png",
        description: "Flores de tilo secas, perfectas para infusiones relajantes nocturnas.",
        benefits: ["Relajante", "Sedante", "Antiespasmódico"],
        stock: 19
    },
    {
        id: 13,
        name: "Aceite de Jojoba",
        category: "aceites",
        price: 55000,
        originalPrice: 62000,
        image: "imagenes/MADRID (13).png",
        description: "Aceite de jojoba puro, excelente para todo tipo de piel.",
        benefits: ["Hidratante", "Regenerador", "Equilibrante"],
        stock: 14
    },
    {
        id: 14,
        name: "Tomillo Natural",
        category: "hierbas",
        price: 19000,
        originalPrice: 23000,
        image: "imagenes/MADRID (14).png",
        description: "Hojas de tomillo secas, con propiedades antisépticas y expectorantes.",
        benefits: ["Antiséptico", "Expectorante", "Digestivo"],
        stock: 26
    },
    {
        id: 15,
        name: "Té de Hibisco",
        category: "infusiones",
        price: 26000,
        originalPrice: 30000,
        image: "imagenes/MADRID (15).png",
        description: "Flores de hibisco secas, ricas en vitamina C y antioxidantes.",
        benefits: ["Antioxidante", "Vitamina C", "Diurético"],
        stock: 21
    },
    {
        id: 16,
        name: "Aceite de Rosa Mosqueta",
        category: "aceites",
        price: 48000,
        originalPrice: 55000,
        image: "imagenes/MADRID (16).png",
        description: "Aceite de rosa mosqueta, excelente para cicatrices y regeneración.",
        benefits: ["Regenerador", "Cicatrizante", "Anti-edad"],
        stock: 11
    },
    {
        id: 17,
        name: "Albahaca Sagrada",
        category: "hierbas",
        price: 21000,
        originalPrice: 25000,
        image: "imagenes/MADRID (17).png",
        description: "Hojas de albahaca sagrada, conocida por sus propiedades adaptógenas.",
        benefits: ["Adaptógeno", "Antiestrés", "Inmunológico"],
        stock: 17
    },
    {
        id: 18,
        name: "Infusión de Valeriana",
        category: "infusiones",
        price: 29000,
        originalPrice: 34000,
        image: "imagenes/MADRID (18).png",
        description: "Raíz de valeriana, perfecta para combatir el insomnio naturalmente.",
        benefits: ["Sedante", "Relajante", "Inductor del sueño"],
        stock: 13
    },
    {
        id: 19,
        name: "Aceite de Argán",
        category: "aceites",
        price: 65000,
        originalPrice: 75000,
        image: "imagenes/MADRID (19).png",
        description: "Aceite de argán marroquí, oro líquido para cabello y piel.",
        benefits: ["Nutritivo", "Hidratante", "Anti-edad"],
        stock: 9
    },
    {
        id: 20,
        name: "Orégano Silvestre",
        category: "hierbas",
        price: 17000,
        originalPrice: 21000,
        image: "imagenes/MADRID (20).png",
        description: "Orégano silvestre seco, con alta concentración de aceites esenciales.",
        benefits: ["Antibacteriano", "Antifúngico", "Digestivo"],
        stock: 29
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = [...productData];
    loadProducts();
    setupEventListeners();
    updateCartUI();
    
    // Add animation class to elements as they come into view
    observeElements();
}

function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = e.target.getAttribute('data-filter');
            filterProducts(filter);
            
            // Update active button
            document.querySelectorAll('[data-filter]').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Load more products
    document.getElementById('loadMoreBtn').addEventListener('click', loadMoreProducts);

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Smooth scrolling for navigation links
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

function loadProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);
    
    const productsToShow = filteredProducts.slice(0, productsLoaded);
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
    
    // Update load more button visibility
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (productsToShow.length >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    col.innerHTML = `
        <div class="card product-card h-100 shadow-sm" onclick="showProductDetail(${product.id})">
            ${discount > 0 ? `<span class="badge bg-danger">-${discount}%</span>` : ''}
            <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted flex-grow-1">${product.description}</p>
                <div class="mb-2">
                    ${product.benefits.map(benefit => `<span class="badge bg-light text-success me-1">${benefit}</span>`).join('')}
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="price">$${product.price.toLocaleString()}</span>
                        ${product.originalPrice !== product.price ? `<span class="original-price ms-2">$${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div>
                        <button class="btn btn-outline-success btn-sm me-1" onclick="event.stopPropagation(); showProductDetail(${product.id})">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
                <small class="text-muted mt-2">
                    <i class="bi bi-box"></i> ${product.stock} disponibles
                </small>
            </div>
        </div>
    `;
    
    return col;
}

function filterProducts(filter) {
    currentFilter = filter;
    productsLoaded = productsPerPage;
    loadProducts();
}

function loadMoreProducts() {
    productsLoaded += productsPerPage;
    loadProducts();
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    modalTitle.textContent = product.name;
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h4 class="text-success">${product.name}</h4>
                <p class="text-muted">${product.description}</p>
                
                <h6 class="mt-3">Beneficios:</h6>
                <div class="mb-3">
                    ${product.benefits.map(benefit => `<span class="badge bg-light text-success me-1 mb-1">${benefit}</span>`).join('')}
                </div>
                
                <div class="mb-3">
                    <span class="price fs-3">$${product.price.toLocaleString()}</span>
                    ${product.originalPrice !== product.price ? `<span class="original-price ms-2 fs-5">$${product.originalPrice.toLocaleString()}</span>` : ''}
                    ${discount > 0 ? `<span class="badge bg-danger ms-2">-${discount}%</span>` : ''}
                </div>
                
                <div class="mb-3">
                    <small class="text-muted">
                        <i class="bi bi-box"></i> ${product.stock} disponibles
                    </small>
                </div>
                
                <div class="d-flex gap-2">
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(-1)" type="button">-</button>
                        <input type="number" id="productQuantity" value="1" min="1" max="${product.stock}" class="form-control text-center" style="width: 60px;">
                        <button onclick="changeQuantity(1)" type="button">+</button>
                    </div>
                    <button class="btn btn-success flex-grow-1" onclick="addToCart(${product.id}, parseInt(document.getElementById('productQuantity').value))">
                        <i class="bi bi-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

function changeQuantity(delta) {
    const quantityInput = document.getElementById('productQuantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + delta;
    const max = parseInt(quantityInput.max);
    
    if (newValue >= 1 && newValue <= max) {
        quantityInput.value = newValue;
    }
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity + quantity <= product.stock) {
            existingItem.quantity += quantity;
        } else {
            showToast('No hay suficiente stock disponible', 'error');
            return;
        }
    } else {
        if (quantity <= product.stock) {
            cart.push({
                ...product,
                quantity: quantity
            });
        } else {
            showToast('No hay suficiente stock disponible', 'error');
            return;
        }
    }
    
    updateCartUI();
    showToast(`${product.name} agregado al carrito`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateCartModal();
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item && product) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            item.quantity = newQuantity;
            updateCartUI();
            updateCartModal();
        } else {
            showToast('No hay suficiente stock disponible', 'error');
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    updateCartModal();
}

function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toLocaleString()}`;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-4">
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">$${item.price.toLocaleString()} c/u</small>
                </div>
                <div class="col-3">
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="col-2">
                    <strong class="text-success">$${(item.price * item.quantity).toLocaleString()}</strong>
                </div>
                <div class="col-1">
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validar que todos los campos estén llenos
    if (!data.name || !data.email || !data.subject || !data.message) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Crear el cuerpo del email con formato profesional
    const emailBody = `
Nombre: ${data.name}
Email: ${data.email}
Asunto: ${data.subject}

Mensaje:
${data.message}

---
Enviado desde: Corazón Natural
Fecha: ${new Date().toLocaleDateString('es-CO')}
Hora: ${new Date().toLocaleTimeString('es-CO')}
    `.trim();
    
    // Crear enlace mailto y abrirlo directamente
    const mailtoLink = `mailto:corazonnaturaltiendanaturista@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir Gmail directamente
    window.location.href = mailtoLink;
    
    // Mostrar mensaje de confirmación y limpiar formulario
    showToast('Abriendo Gmail para enviar tu mensaje...', 'success');
    e.target.reset();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login
    if (email && password) {
        showToast('Inicio de sesión exitoso', 'success');
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        
        // Update UI to show logged in state
        const loginBtn = document.querySelector('[data-bs-target="#loginModal"]');
        loginBtn.innerHTML = '<i class="bi bi-person-check"></i> Bienvenido';
        loginBtn.classList.remove('btn-success');
        loginBtn.classList.add('btn-outline-success');
    } else {
        showToast('Por favor, completa todos los campos', 'error');
    }
}

function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toastEl);
    
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    
    // Remove toast element after it's hidden
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe cards and sections
    document.querySelectorAll('.card, section').forEach(el => {
        observer.observe(el);
    });
}

// Search functionality
function setupSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container mb-4';
    searchContainer.innerHTML = `
        <input type="text" class="form-control" id="searchInput" placeholder="Buscar productos...">
        <i class="bi bi-search search-icon"></i>
    `;
    
    const productsSection = document.querySelector('#productos .container .row:nth-child(2)');
    productsSection.parentNode.insertBefore(searchContainer, productsSection);
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
            );
            
            products = filteredProducts;
        } else {
            products = [...productData];
        }
        
        productsLoaded = productsPerPage;
        loadProducts();
    });
}

// Add search functionality after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupSearch, 1000);
});

// Service Worker for offline functionality (basic)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}