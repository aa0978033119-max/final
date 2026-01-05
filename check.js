function loadOrderSummary() {
    // 從 localStorage 取得購物車資料
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const shipping = 60;
    let subtotal = 0;

    // 計算小計
    Object.values(cart).forEach(item => {
        subtotal += (Number(item.price) || 0) * (Number(item.quantity) || 0);
    });

    const subtotalDisplay = document.getElementById('subtotal-display');
    const totalDisplay = document.getElementById('total-amount');

    // 渲染小計 (使用 toLocaleString 增加千分位)
    if (subtotalDisplay) {
        subtotalDisplay.innerText = `$${subtotal.toLocaleString()}`;
    }

    // 渲染總計 (若無商品則總計為 0)
    if (totalDisplay) {
        const finalTotal = subtotal > 0 ? subtotal + shipping : 0;
        totalDisplay.innerText = `$${finalTotal.toLocaleString()}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. 初始化摘要
    loadOrderSummary();

    // 2. 獲取表單元素
    const form = document.getElementById('checkoutForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address'); // 確保 HTML 有這個 ID

    // 3. 輸入過濾邏輯
    if (nameInput) {
        nameInput.oninput = () => {
            // 只允許中文、英文字母
            nameInput.value = nameInput.value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');
        };
    }

    if (phoneInput) {
        phoneInput.oninput = () => {
            // 只允許數字
            phoneInput.value = phoneInput.value.replace(/\D/g, '');
        };
    }
    
    // 4. 表單提交處理
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // 基本驗證
            if (!nameInput.value || nameInput.value.length < 2) {
                alert("請輸入有效的收件人姓名");
                return;
            }
            if (!phoneInput.value || phoneInput.value.length < 9) {
                alert("請輸入有效的電話號碼");
                return;
            }
            if (!addressInput || !addressInput.value) {
                alert("請填寫地址");
                return;
            }

            // 整合訂單資料
            const formData = {
                name: nameInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                total: document.getElementById('total-amount')?.innerText || "$0",
                payment: document.querySelector('input[name="payment"]:checked')?.value || "未選擇"
            };

            console.log("訂單資料傳輸中...", formData);

            // 按鈕狀態回饋
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.innerText = "處理中...";
                submitBtn.disabled = true;
                submitBtn.style.opacity = "0.7";
            }

            // 模擬異步請求 (API Call)
            setTimeout(() => {
                const successMsg = document.getElementById('successMessage');
                if (successMsg) {
                    successMsg.style.display = 'block'; // 確保訊息可見
                    successMsg.classList.remove('hidden');
                    
                    // 清除購物車與表單
                    localStorage.removeItem("cart");
                    form.reset();
                    
                    // 跳轉或重整邏輯 (可視需求開啟)
                    // window.location.href = "thankyou.html";
                }
            }, 1000);
        });
    }
});
