function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    items.forEach(item => {
        const price = parseInt(item.dataset.price.replace(/,/g, ''));
        const quantity = parseInt(item.querySelector('.quantity').value) || 0;
        total += price * quantity;
    });

    document.getElementById('totalAmount').textContent = total.toLocaleString();
}

document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('.quantity');
        input.value = parseInt(input.value) + 1;
        updateTotal();
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('.quantity');
        if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
            updateTotal();
        }
    });
});

document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('change', () => {
        if (parseInt(input.value) < 0 || isNaN(input.value)) input.value = 0;
        updateTotal();
    });
});

document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.cart-item').remove();
        updateTotal();
    });
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    const total = document.getElementById('totalAmount').textContent;
    if (total === "0") {
        alert("您的購物車目前是空的喔！");
    } else {
        window.location.href = 'check.html';
    }
});
updateTotal();
