const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// 找到對應商品
const product = products.find(p => p.id === productId);

// 如果找不到商品，顯示錯誤
if (!product) {
  document.body.innerHTML = "<h2>找不到商品</h2>";
} else {
  // 渲染商品圖片、名稱、價格
  document.getElementById('product-img').src = product.img;
  document.getElementById('product-img').alt = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `NT$${product.price}`;

  // 渲染 Tab 內容
  document.getElementById('description').textContent = product.description;
  document.getElementById('shipping').textContent = product.shipping;
  document.getElementById('reviews').innerHTML = product.reviews.map(r => `<p>• ${r}</p>`).join('');
}

// Tab 切換功能
const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabContents = document.querySelectorAll('.tab-content div');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 切換按鈕 active 樣式
    tabButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    // 顯示對應內容
    const tab = button.getAttribute('data-tab');
    tabContents.forEach(content => {
      content.id === tab ? content.classList.add('active') : content.classList.remove('active');
    });
  });
});
