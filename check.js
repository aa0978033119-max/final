document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    if (formData.name.length < 2) {
        alert("請輸入有效的收件人姓名");
        return;
    }
    console.log("訂單資料傳輸中...", formData);

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "處理中...";
    submitBtn.disabled = true;

    setTimeout(() => {
      successMessage.classList.remove('hidden');
    }, 1000);
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

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    alert("請輸入正確的資料格式");
    return;
  }
