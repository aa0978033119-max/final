const subtotal = parseInt(localStorage.getItem('cartSubtotal')) || 0;
const shipping = parseInt(localStorage.getItem('shippingFee')) || 0;
const total = subtotal + shipping;

function formatCurrency(num) {
    return '$' + num.toLocaleString();
}

const form = document.getElementById('checkoutForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

window.addEventListener('DOMContentLoaded', () => {
    const subtotalDisplay = document.getElementById('subtotal-display');
    const shippingDisplay = document.getElementById('shipping-fee-display');
    const totalDisplay = document.getElementById('total-Amount');

    if (subtotalDisplay) subtotalDisplay.innerText = formatCurrency(subtotal);
    if (shippingDisplay) shippingDisplay.innerText = formatCurrency(shipping);
    if (totalDisplay) totalDisplay.innerText = formatCurrency(total);
});

nameInput.oninput = () => {
    nameInput.value = nameInput.value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');
};

phoneInput.oninput = () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
};

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: document.getElementById('address').value.trim(),
        amount: total
    };


    if (formData.name.length < 2) {
        alert("請輸入有效的收件人姓名");
        return;
    }


    if (!form.checkValidity()) {
        alert("請輸入正確的資料格式");
        return;
    }

    console.log("訂單資料傳輸中...", formData);
    
    submitBtn.innerText = "處理中...";
    submitBtn.disabled = true;

    setTimeout(() => {

        if (successMessage) {
            successMessage.classList.remove('hidden');
        }
        
        alert("訂單已成功送出！");
    }, 1000);
});
