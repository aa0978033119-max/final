const subtotal = parseInt(localStorage.getItem('cartSubtotal')) || 0;
const shipping = parseInt(localStorage.getItem('shippingFee')) || 0;
const total = subtotal + shipping;


function formatCurrency(num) {
    return '$' + num.toLocaleString();
}

window.addEventListener('DOMContentLoaded', () => {
    const subtotalDisplay = document.getElementById('subtotal-display');
    const shippingDisplay = document.getElementById('shipping-fee-display');
    const totalDisplay = document.getElementById('total-Amount');

    if (subtotalDisplay) subtotalDisplay.innerText = formatCurrency(subtotal);
    if (shippingDisplay) shippingDisplay.innerText = formatCurrency(shipping);
    if (totalDisplay) totalDisplay.innerText = formatCurrency(total);

    if (subtotal === 0) {
        console.warn("注意：目前購物車小計為 0");
    }
});

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const form = document.getElementById('checkoutForm');

nameInput.oninput = () => {
    nameInput.value = nameInput.value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');
};

phoneInput.oninput = () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
};

// --- 4. 表單提交處理 (整合原本的所有 submit 事件) ---
form.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表單跳轉

    // A. 收集資料
    const formData = {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        address: document.getElementById('address').value.trim(),
        amount: total // 連動的總金額
    };

    // B. 驗證邏輯
    if (formData.name.length < 2) {
        alert("請輸入有效的收件人姓名");
        return;
    }

    if (!form.checkValidity()) {
        alert("請輸入正確的資料格式");
        return;
    }

    console.log("訂單資料傳輸中...", formData);

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "處理中...";
    submitBtn.disabled = true;

    setTimeout(() => {
        document.getElementById('successMessage').classList.remove('hidden');
        
        
        alert("訂單已成功送出！");
    }, 1000);
});
