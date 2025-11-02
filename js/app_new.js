// Corazón Natural - Aplicación Principal
// Archivo principal simplificado que coordina todos los módulos

// Funciones del modal de productos
function increaseQuantity(maxStock) {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < maxStock) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function addToCartFromModal(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);
    addToCart(productId, quantity);
    
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar productos primero
    initializeProducts();
    
    // Cargar productos al iniciar
    loadProducts();
    
    // Actualizar UI del carrito
    updateCartUI();
    
    console.log('✅ Corazón Natural - Aplicación inicializada correctamente');
    console.log('📦 Productos cargados:', products.length);
});