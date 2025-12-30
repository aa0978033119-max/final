// Tabs 切換
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// 回到頂部
document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 加入購物車（示意）
document.querySelector('.add-cart').addEventListener('click', () => {
const size = document.getElementById('sizeSelect').value;
const qty = document.querySelector('input[type="number"]').value;
  alert(`已加入購物車\n尺寸：${size}\n數量：${qty}`);
});

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id")) || 1;

const product = products.find(p => p.id === id);

document.getElementById("productName").innerText = product.name;
document.getElementById("productDesc").innerText = product.desc;
document.getElementById("productPrice").innerText = `NT$ ${product.price}`;
document.getElementById("mainImage").src = product.images[0];
document.getElementById("detail").innerText = product.detail;

const sizeSelect = document.getElementById("sizeSelect");
product.sizes.forEach(size => {
  const option = document.createElement("option");
  option.value = size;
  option.textContent = size;
  sizeSelect.appendChild(option);
});

// tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab, .content").forEach(el => el.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
