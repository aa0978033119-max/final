document.addEventListener("DOMContentLoaded", () => {

  //取得商品 ID
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id")) || 1;

  //找到對應商品
  const product = products.find(p => p.id === productId);
  if (!product) {
    alert("找不到商品");
    return;
  }

  //填充商品資料
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDesc").innerText = product.desc;
  document.getElementById("productPrice").innerText = `NT$ ${product.price}`;
  document.getElementById("detail").innerHTML = product.detail;
  document.getElementById("mainImage").src = product.images[0];
  document.getElementById("mainImage").alt = product.name;

  // 尺寸
  const sizeSelect = document.getElementById("sizeSelect");
  sizeSelect.innerHTML = "";
  product.sizes.forEach(size => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  //加入購物車
  document.querySelector(".add-cart").addEventListener("click", () => {
    const qty = document.querySelector("input[type='number']").value;
    alert(`已加入購物車\n尺寸：${sizeSelect.value}\n數量：${qty}`);
  });

  //Tab 切換
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // 顧客評價
  const productReviews = reviews[productId] || [];
  const reviewContainer = document.getElementById("review");
  reviewContainer.innerHTML = "";

  if (productReviews.length === 0) {
    reviewContainer.innerText = "尚無評價";
  } else {
    productReviews.forEach(r => {
      const div = document.createElement("div");
      div.className = "review-item";
      div.innerHTML = `
        <strong>${r.name}</strong> - ${"★".repeat(r.rating)}<br>
        <p>${r.text}</p>
      `;
      reviewContainer.appendChild(div);
    });
  }

  //送貨及付款方式
  const shippingContainer = document.getElementById("shipping");
  shippingContainer.innerHTML = `
    <p>宅配 7-11 全家</p>
    <p>Apple Pay LINE Pay 銀行轉帳 信用卡 超商取貨付款</p>
  `;
});
