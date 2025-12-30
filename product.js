document.addEventListener("DOMContentLoaded", () => {

  // 取得商品 id
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id")) || 1;

  // 找商品
  const product = products.find(p => p.id === id);
  if (!product) {
    alert("找不到商品");
    return;
  }

  // 塞資料
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDesc").innerText = product.desc;
  document.getElementById("productPrice").innerText = `NT$ ${product.price}`;
  document.getElementById("detail").innerText = product.detail;

  const img = document.getElementById("mainImage");
  img.src = product.images[0];
  img.alt = product.name;

  // 尺寸選擇
  const sizeSelect = document.getElementById("sizeSelect");
  sizeSelect.innerHTML = "";
  product.sizes.forEach(size => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  // 加入購物車
  const cartBtn = document.queryS
});  
