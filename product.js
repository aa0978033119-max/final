document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ 取得商品 id
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id")) || 1;

  // 2️⃣ 找商品
  const product = products.find(p => p.id === id);
  if (!product) {
    alert("找不到商品");
    return;
  }

  // 3️⃣ 塞資料
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDesc").innerText = product.desc;
  document.getElementById("productPrice").innerText = `NT$ ${product.price}`;
  document.getElementById("detail").innerText = product.detail;

  const img = document.getElementById("mainImage");
  img.src = product.images[0];
  img.alt = product.name;

  // 4️⃣ 尺寸
  const sizeSelect = document.getElementById("sizeSelect");
  sizeSelect.innerHTML = "";
  product.sizes.forEach(size => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  // 5️⃣ 加入購物車（示意）
  document.querySelector(".add-cart")?.addEventListener("click", () => {
    const size = sizeSelect.value;
    const qty = document.querySelector("input[type='number']").value;
    alert(`已加入購物車\n尺寸：${size}\n數量：${qty}`);
  });

 document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {

    // 移除全部 active
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));

    // 加到目前點擊的
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
});
