function updateAmount() {
    let subtotal = 0;
    const shipping = 60;
    const items = document.querySelectorAll('.cart-item');
    
    items.forEach(item => {
        const isChecked = item.querySelector('.item-checkbox').checked;
        const price = parseFloat(item.querySelector('.price').dataset.value);
        const qty = parseInt(item.querySelector('.quantity').value);
        if (isChecked) {
            subtotal += price * qty;
        }
    });

    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-amount');
    if(subtotalDisplay) subtotalDisplay.innerText = `$${subtotal.toLocaleString()}`;
    const finalTotal = subtotal > 0 ? subtotal + shipping : 0;
    if(totalDisplay) totalDisplay.innerText = `$${finalTotal.toLocaleString()}`;
}

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('item-checkbox') || e.target.classList.contains('quantity')) {
        updateAmount();
    }
});

const form = document.getElementById('checkoutForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');

nameInput.oninput = () => {
    nameInput.value = nameInput.value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');
};

phoneInput.oninput = () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
};

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

    console.log("訂單資料傳輸中...", formData);

    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerText = "處理中...";
    submitBtn.disabled = true;

    setTimeout(() => {
        document.getElementById('successMessage').classList.remove('hidden');
    }, 1000);
});

updateAmount();;
