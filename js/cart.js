// Corazón Natural - Shopping Cart Management

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
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Usar la nueva función para actualizar el contador
    if (typeof updateCartCounters === 'function') {
        updateCartCounters(totalItems);
    } else {
        // Fallback por si la función no está disponible
        const cartCount = document.getElementById('cartCount');
        if (cartCount) cartCount.textContent = totalItems;
    }
    
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
        <div class="cart-item mb-3 p-3 border rounded">
            <div class="row align-items-center">
                <div class="col-3 col-sm-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" style="max-height: 60px;">
                </div>
                <div class="col-9 col-sm-4">
                    <h6 class="mb-1 text-truncate">${item.name}</h6>
                    <small class="text-muted">$${item.price.toLocaleString()} c/u</small>
                </div>
                <div class="col-12 col-sm-3 mt-2 mt-sm-0">
                    <div class="quantity-controls d-flex align-items-center justify-content-center">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="width: 32px; height: 32px; padding: 0;">-</button>
                        <span class="mx-2 fw-bold">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="width: 32px; height: 32px; padding: 0;">+</button>
                    </div>
                </div>
                <div class="col-8 col-sm-2 mt-2 mt-sm-0">
                    <strong class="text-success">$${(item.price * item.quantity).toLocaleString()}</strong>
                </div>
                <div class="col-4 col-sm-1 mt-2 mt-sm-0 text-end">
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})" style="width: 35px; height: 35px; padding: 0;">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function sendToWhatsApp() {
    if (cart.length === 0) {
        showToast('Tu carrito está vacío', 'error');
        return;
    }
    
    // Crear el mensaje del pedido personalizado
    const currentDate = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let message = `🌿🛒 *NUEVO PEDIDO - CORAZÓN NATURAL* 🛒🌿\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📅 Fecha: ${currentDate}\n`;
    message += `🆔 Pedido: #CN${Date.now().toString().slice(-6)}\n\n`;
    
    message += `�️ *DETALLE DE TU PEDIDO:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `\n${index + 1}. 🌱 *${item.name}*\n`;
        message += `    � Precio unitario: $${item.price.toLocaleString()}\n`;
        message += `    📦 Cantidad: ${item.quantity} unidad${item.quantity > 1 ? 'es' : ''}\n`;
        message += `    � Subtotal: $${subtotal.toLocaleString()}\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL A PAGAR: $${total.toLocaleString()}* 💰\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `📍 *SIGUIENTE PASO:*\n`;
    message += `Por favor confirma:\n`;
    message += `• 🏠 Dirección de entrega completa\n`;
    message += `• 💳 Método de pago preferido\n`;
    message += `• 📞 Teléfono de contacto\n\n`;
    
    message += `⏰ *Horario de entrega:* Lunes a Sábado 8AM - 6PM\n`;
    message += `🚚 *Tiempo de entrega:* 1-2 días hábiles\n`;
    message += `💚 *Envío GRATIS* en compras superiores a $50.000\n\n`;
    
    message += `🌿 ¡Gracias por elegir *CORAZÓN NATURAL*! 🌿\n`;
    message += `_Tu salud es nuestra prioridad_ 💚\n\n`;
    message += `📱 También puedes visitarnos en nuestras redes sociales\n`;
    message += `� www.corazonnatural.com`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear el enlace de WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en una nueva ventana
    window.open(whatsappURL, '_blank');
    
    // Mostrar mensaje de confirmación
    showToast('Redirigiendo a WhatsApp para completar tu pedido...', 'success');
    
    // Opcional: Limpiar el carrito después de enviar
    setTimeout(() => {
        cart = [];
        updateCartUI();
        
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();
        
        showToast('¡Pedido enviado! Te contactaremos pronto por WhatsApp.', 'success');
    }, 2000);
}

// Event listeners para el carrito
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp button
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', sendToWhatsApp);
    }
});