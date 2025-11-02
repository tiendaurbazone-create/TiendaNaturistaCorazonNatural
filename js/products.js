// Corazón Natural - Products Management

// Inicializar productos desde la configuración
function initializeProducts() {
    products = [...productData]; // Copiar los productos desde config.js
}

function loadProducts() {
    if (products.length === 0) {
        initializeProducts(); // Asegurar que los productos estén cargados
    }
    
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('Container productsContainer not found');
        return;
    }
    
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
    if (loadMoreBtn) {
        if (productsToShow.length >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    col.innerHTML = `
        <div class="card product-card h-100 shadow-sm" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy" decoding="async">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted flex-grow-1">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="price">$${product.price.toLocaleString()}</span>
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
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h4 class="text-success">${product.name}</h4>
                <p class="text-muted">${product.description}</p>
                
                <div class="mb-3">
                    <span class="price fs-3">$${product.price.toLocaleString()}</span>
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

// Función de búsqueda de productos con autocompletado
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm) {
        // Filtrar productos basado en el término de búsqueda
        const filteredProducts = productData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm))
        );
        
        products = filteredProducts;
    } else {
        // Si no hay término de búsqueda, mostrar todos los productos
        products = [...productData];
    }
    
    // Resetear filtro y cargar productos
    currentFilter = 'all';
    productsLoaded = productsPerPage;
    loadProducts();
    
    // Actualizar botones de filtro
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Ocultar sugerencias al hacer búsqueda
    hideSuggestions();
}

// Función para mostrar sugerencias de autocompletado - OPTIMIZADA
function showSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) { // Cambiado de 1 a 2 caracteres mínimos
        hideSuggestions();
        return;
    }
    
    // Filtrar productos que coincidan con el término - OPTIMIZADO
    const suggestions = productData.filter(product => 
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).slice(0, 3); // Reducido de 5 a 3 sugerencias para mejor rendimiento
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    // Crear o actualizar el contenedor de sugerencias
    let suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'searchSuggestions';
        suggestionsContainer.className = 'search-suggestions';
        
        const searchInput = document.getElementById('searchInput');
        searchInput.parentNode.appendChild(suggestionsContainer);
    }
    
    // Generar HTML de sugerencias
    suggestionsContainer.innerHTML = suggestions.map(product => `
        <div class="suggestion-item" onclick="selectSuggestion('${product.name.replace(/'/g, "\\'")}')">
            <img src="${product.image}" alt="${product.name}" class="suggestion-img">
            <div class="suggestion-content">
                <div class="suggestion-name">${product.name}</div>
                <div class="suggestion-price">$${product.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
    
    suggestionsContainer.style.display = 'block';
}

// Función para ocultar sugerencias
function hideSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Función para seleccionar una sugerencia
function selectSuggestion(productName) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = productName;
    hideSuggestions();
    searchProducts();
}

// Función para inicializar el autocompletado - OPTIMIZADA
function initializeAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    // Debounce para optimizar rendimiento - espera 300ms antes de buscar
    let debounceTimer;
    
    // Event listener para mostrar sugerencias mientras escribe - OPTIMIZADO
    searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchTerm = e.target.value.trim();
            showSuggestions(searchTerm);
        }, 300); // Retraso de 300ms para evitar búsquedas excesivas
    });
    
    // Event listener para búsqueda al presionar Enter
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchProducts();
        }
    });
    
    // Ocultar sugerencias al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.input-group')) {
            hideSuggestions();
        }
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
            const filteredProducts = productData.filter(product => 
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