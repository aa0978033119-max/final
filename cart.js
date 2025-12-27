
let cartData = JSON.parse(localStorage.getItem('cart')) || [
    {id: 'p1', name: '紳士透膚襯衫', option: '白/L', price: 1280, qty: 1, img: 'images/09.jpg'},
    {id: 'p2', name: '質感黑色牛仔夾克', option: '黑/M', price: 1280, qty: 0, img: 'images/09.jpg'}
];


function renderCart() {
    const cartList = document.querySelector('#cartList');
    cartList.innerHTML = '';

    if(cartData.length === 0) {
        cartList.innerHTML = '<p>購物車空空如也</p>';
    }

    cartData.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);
        cartItem.innerHTML = `
            <div class="product-img"><img src="${item.img}" alt="${item.name}"></div>
            <div class="product-name">${item.name}<br>${item.option}
                <div class="price">單價 NT$${item.price}</div>
            </div>
            <div class="quantity">
                <div class="qty-box">
                    <span class="qty-btn">+</span>
                    <span class="qty-num">${item.qty}</span>
                    <span class="qty-btn">−</span>
                </div>
                <span class="trash">刪除</span>
            </div>
            <div class="subtotal">NT$${item.price * item.qty}</div>
        `;
        cartList.appendChild(cartItem);
    });

    bindEvents();
    updateTotal();
}

function bindEvents() {
    document.querySelectorAll('.cart-item').forEach(item => {
        const id = item.getAttribute('data-id');

        item.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const qtyElem = item.querySelector('.qty-num');
                let qty = parseInt(qtyElem.textContent);

                if(btn.textContent === '+') qty++;
                else if(btn.textContent === '−' && qty > 0) qty--;

                qtyElem.textContent = qty;

                const product = cartData.find(p => p.id === id);
                product.qty = qty;

                updateSubtotal(item, product.price, qty);
                updateTotal();
                saveCart();
            });
        });

        item.querySelector('.trash').addEventListener('click', () => {
            cartData = cartData.filter(p => p.id !== id);
            renderCart();
            saveCart();
        });
    });
}

function updateSubtotal(item, price, qty) {
    item.querySelector('.subtotal').textContent = `NT$${price * qty}`;
}

function updateTotal() {
    const total = cartData.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.querySelector('.total').textContent = `總金額：NT$${total}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartData));
}

renderCart();
