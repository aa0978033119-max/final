document.addEventListener("DOMContentLoaded", () => {
  // 1. 取得商品 id
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id")) || 1;

  // 2. 找出商品資料
  const product = products.find(p => p.id === productId);
  if (!product) {
    alert("找不到商品");
    return;
  }

  // 3. 塞商品資料到頁面
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productDesc").innerText = product.desc;
  document.getElementById("productPrice").innerText = `NT$ ${product.price}`;
  document.getElementById("detail").innerText = product.detail;

  const img = document.getElementById("mainImage");
  img.src = product.images[0];
  img.alt = product.name;

  const sizeSelect = document.getElementById("sizeSelect");
  sizeSelect.innerHTML = "";
  product.sizes.forEach(size => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.appendChild(option);
  });

  // 4. 加入購物車按鈕
  document.querySelector(".add-cart").addEventListener("click", () => {
    const qty = document.querySelector("input[type='number']").value;
    alert(`已加入購物車\n尺寸：${sizeSelect.value}\n數量：${qty}`);
  });

  // 5. Tabs 切換
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // 6. 讀取並渲染對應商品評價
  const productReviews = reviews[productId] || [];
  const reviewContainer = document.getElementById("review");
  reviewContainer.innerHTML = ""; // 先清空

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
});
