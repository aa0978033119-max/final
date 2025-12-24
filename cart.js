const pricePerUnit = 1100;

function changeProductQty(val) {
    const qtyInput = document.getElementById('qty');
    let currentQty = parseInt(qtyInput.value);
    if (currentQty + val >= 1) {
        qtyInput.value = currentQty + val;
    }
}

function addToCart() {
    const size = document.getElementById('size').value;
    const qty = parseInt(document.getElementById('qty').value);
    
    let cart = JSON.parse(localStorage.getItem('cartData')) || [];


    const existIndex = cart.findIndex(item => item.size === size);
    
    if (existIndex > -1) {
        cart[existIndex].qty += qty;
    } else {
        cart.push({
            name: "質感牛仔夾克",
            price: pricePerUnit,
            size: size,
            qty: qty,
            img: "images/01.jpg"
        });
    }

    localStorage.setItem('cartData', JSON.stringify(cart));
    renderCart();
}


function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cartData')) || [];
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('grand-total');
    
    container.innerHTML = '';
    let grandTotal = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        grandTotal += subtotal;

        container.innerHTML += `
            <div class="cart-item">
                <div class="info">
                    <strong>${item.name}</strong> (${item.size}) <br>
                    <small>單價: NT$ ${item.price}</small>
                </div>
                <div class="qty-controller">
                    <button onclick="updateCartQty(${index}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateCartQty(${index}, 1)">+</button>
                </div>
                <div class="subtotal">NT$ ${subtotal.toLocaleString()}</div>
                <button onclick="removeItem(${index})" style="background:none; border:none; cursor:pointer;">✕</button>
            </div>
        `;
    });

    totalEl.innerText = `NT$ ${grandTotal.toLocaleString()}`;
}

function updateCartQty(index, val) {
    let cart = JSON.parse(localStorage.getItem('cartData'));
    if (cart[index].qty + val >= 1) {
        cart[index].qty += val;
        localStorage.setItem('cartData', JSON.stringify(cart));
        renderCart();
    }
}


function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cartData'));
    cart.splice(index, 1);
    localStorage.setItem('cartData', JSON.stringify(cart));
    renderCart();
}

renderCart();
