document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    if (name.length < 2) {
        alert("請輸入有效的收件人姓名");
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "處理中...";
    submitBtn.disabled = true;

    setTimeout(() => {

        document.getElementById('successMessage').classList.remove('hidden');

        localStorage.removeItem('cart');
        localStorage.removeItem('cartSubtotal');
        localStorage.removeItem('shippingFee');

    }, 1500);
});
const subtotal = parseInt(localStorage.getItem('cartSubtotal')) || 0;
const shipping = parseInt(localStorage.getItem('shippingFee')) || 0;
const total = subtotal + shipping;

function formatCurrency(num) {
    return '$' + num.toLocaleString();
}

window.addEventListener('DOMContentLoaded', () => {
    const subtotalEl = document.getElementById('subtotal-display');
    const shippingEl = document.getElementById('shipping-fee-display');
    const totalEl = document.getElementById('total-Amount');

    if (subtotalEl) subtotalEl.innerText = formatCurrency(subtotal);
    if (shippingEl) shippingEl.innerText = formatCurrency(shipping);
    if (totalEl) totalEl.innerText = formatCurrency(total);
});
function saveCart() {
    let subtotal = 0;
    const cart = {};
    const shippingFee = 60;

    document.querySelectorAll(".cart-item").forEach(item => {
        const price = parseInt(item.dataset.price);
        const qty = parseInt(item.querySelector(".quantity").value);
        if (qty > 0) {
            const name = item.querySelector("p").innerText;
            const img = item.querySelector("img").src;
            cart[name] = { name, price, img, quantity: qty };
            subtotal += price * qty;
        }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartSubtotal", subtotal); 
    localStorage.setItem("shippingFee", subtotal > 0 ? shippingFee : 0); 

    updateTotal();
}
