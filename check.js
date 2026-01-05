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
    const addressInput = document.getElementById('address');

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

            // 表單驗證
            if (nameInput.value.length < 2) {
                alert("請輸入完整的收件人姓名");
                return;
            }
            if (phoneInput.value.length < 9) {
                alert("請輸入有效的電話號碼");
                return;
            }

            const formData = {
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                payment: document.querySelector('input[name="payment"]:checked').value,
                total: document.getElementById('total-amount').innerText
            };

            console.log("訂單資料傳輸中...", formData);

            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerText = "處理中...";
                submitBtn.disabled = true;
            }
            
            setTimeout(() => {
                const successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    successMsg.style.display = 'block'; // 顯示成功訊息
                    localStorage.removeItem("cart");    // 清空購物車
                    form.reset();                       // 重置表單
                    submitBtn.innerText = "訂單已送出";
                }
            }, 1500);
        });
    }
});
