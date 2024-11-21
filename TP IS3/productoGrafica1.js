function addToCart() {
    const product = {
        name: 'RX 5700 XT Asus Rog',
        price: parseInt(document.getElementById('product-price').innerText),
        image: 'grafica1-1.webp'
    };

    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('cartTotal', total);

    alert('Producto agregado al carrito');
}