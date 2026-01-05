const subtotal = parseInt(localStorage.getItem('cartSubtotal')) || 0;
const shipping = parseInt(localStorage.getItem('shippingFee')) || 0;
const total = subtotal + shipping;

function formatCurrency(num) {
    return '$' + num.toLocaleString();
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('subtotal-display').innerText = formatCurrency(subtotal);
    document.getElementById('shipping-fee-display').innerText = formatCurrency(shipping);
    document.getElementById('total-Amount').innerText = formatCurrency(total);
});

const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');

if(nameInput) {
    nameInput.oninput = () => {
        nameInput.value = nameInput.value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');
    };
}

if(phoneInput) {
    phoneInput.oninput = () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '');
    };
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (name.length < 2) {
            alert("請輸入有效的收件人姓名");
            return;
        }
        if (phone.length < 10) {
            alert("請輸入有效的電話號碼");
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerText = "處理中...";
        submitBtn.disabled = true;

        setTimeout(() => {
            document.getElementById('successMessage').classList.remove('hidden');
            localStorage.removeItem('cartSubtotal');
            console.log("訂單提交成功！");
        }, 1500);
    });
}
function updateCartTotal() {
    let subtotal = 0;
    const items = document.querySelectorAll('.cart-item');
    
    items.forEach(item => {
        const price = parseInt(item.getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity').value);
        subtotal += price * quantity;
    });

    document.getElementById('totalAmount').innerText = subtotal.toLocaleString();
    localStorage.setItem('cartSubtotal', subtotal);
    localStorage.setItem('shippingFee', 60);
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
    updateCartTotal();
    
    window.location.href = 'check.html';
});
document.addEventListener('DOMContentLoaded', () => {
    updateCartTotal();
});
