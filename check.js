function loadOrderSummary() {

    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const shipping = 60;
    let subtotal = 0;

    Object.values(cart).forEach(item => {
        subtotal += item.price * item.quantity;

    });

    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-amount');

    if (subtotalDisplay) {
        subtotalDisplay.innerText = `$${subtotal.toLocaleString()}`;

    }



    if (totalDisplay) {
        const finalTotal = subtotal > 0 ? subtotal + shipping : 0;
        totalDisplay.innerText = `$${finalTotal.toLocaleString()}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadOrderSummary();
    const form = document.getElementById('checkoutForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    if (nameInput) {
        nameInput.oninput = () => {
            nameInput.value = nameInput.value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');
        };
    }
    if (phoneInput) {
        phoneInput.oninput = () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, '');
        };
    }
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (nameInput.value.length < 2) {
                alert("請輸入有效的收件人姓名");
                return;

            }
            const formData = {
                name: nameInput.value,
                phone: phoneInput.value,
                address: document.getElementById('address').value,
                total: document.getElementById('total-amount').innerText

            };

            console.log("訂單資料傳輸中...", formData);
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerText = "處理中...";
                submitBtn.disabled = true;
            }
