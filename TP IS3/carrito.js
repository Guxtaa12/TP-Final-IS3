document.addEventListener('DOMContentLoaded', () => {
    const envioCostoBase = 8000; // Costo de envío base
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const cartItemsContainer = document.getElementById('cart-items');

    // Calcula el subtotal sumando los precios de cada producto
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const envioCosto = (cart.length > 0 && subtotal < 30000) ? envioCostoBase : 0; // Envío gratis si el subtotal supera 30,000
    const total = subtotal + envioCosto; // Total = Subtotal + Envío

    // Muestra los productos en el carrito
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.classList.add('cart-item-image');

        const name = document.createElement('span');
        name.innerText = item.name;
        name.classList.add('cart-item-name');

        const price = document.createElement('span');
        price.innerText = '$' + item.price.toFixed(2);
        price.classList.add('cart-item-price');

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Eliminar';
        removeButton.classList.add('remove-button');
        removeButton.onclick = () => removeFromCart(index);

        cartItem.appendChild(img);
        cartItem.appendChild(name);
        cartItem.appendChild(price);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    });

    // Muestra el subtotal, costo de envío (o "Gratis") y total en el HTML
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('envio').innerText = subtotal >= 30000 ? "Gratis" : `$${envioCosto.toFixed(2)}`;
    document.getElementById('total').innerText = total.toFixed(2);

    document.getElementById('clear-cart').addEventListener('click', clearCart);
});

function removeFromCart(index) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Recalcula el subtotal después de eliminar un producto
    const envioCostoBase = 8000;
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const envioCosto = (cart.length > 0 && subtotal < 30000) ? envioCostoBase : 0; // Envío gratis si el subtotal supera 30,000
    const total = subtotal + envioCosto;
    localStorage.setItem('cartTotal', total);

    // Actualiza la interfaz sin recargar
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('envio').innerText = subtotal >= 30000 ? "Gratis" : `$${envioCosto.toFixed(2)}`;
    document.getElementById('total').innerText = total.toFixed(2);

    // Recarga la página para actualizar la lista de productos
    location.reload();
}

function clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');
    location.reload();
}
