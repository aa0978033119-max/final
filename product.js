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
  
document.querySelector(".add-cart").addEventListener("click", () => {
    const qty = document.querySelector("input[type='number']").value;
    alert(`已加入購物車\n尺寸：${sizeSelect.value}\n數量：${qty}`);
  
  //Tab 切換
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // 顧客回饋處理
  const feedbackContainer = document.getElementById("feedback-list");
  const noFeedbacksText = document.getElementById("no-feedbacks");
  const feedbackForm = document.getElementById("feedback-form");
  const submitFeedbackButton = document.getElementById("submit-feedback");

  // 回饋數據
  let productFeedbacks = JSON.parse(
    localStorage.getItem(`feedbacks_${productId}`)
  );
  
  // 如果 localStorage 還沒有，使用 reviews.js 的預設評價
  if (!productFeedbacks) {
    productFeedbacks = reviews[productId] || [];
    localStorage.setItem(
      `feedbacks_${productId}`,
      JSON.stringify(productFeedbacks)
    );
  }

  // 顯示現有的回饋
  function renderFeedbacks() {
    feedbackContainer.innerHTML = "";
    if (productFeedbacks.length === 0) {
      noFeedbacksText.style.display = "block";
    } else {
      noFeedbacksText.style.display = "none";
      productFeedbacks.forEach(feedback => {
        const div = document.createElement("div");
        div.className = "feedback-item";
        div.innerHTML = `
          <strong>${feedback.name}</strong> - ${"★".repeat(feedback.rating)}<br>
          <p>${feedback.text}</p>
        `;
        feedbackContainer.appendChild(div);
      });
    }
  }

  renderFeedbacks(); // 初始化顯示回饋

  // 提交回饋
  submitFeedbackButton.addEventListener("click", () => {
    const name = document.getElementById("feedback-name").value;
    const rating = parseInt(document.getElementById("feedback-rating").value);
    const text = document.getElementById("feedback-text").value;

    if (!name || !rating || !text) {
      alert("請填寫所有欄位！");
      return;
    }

    // 儲存回饋
    const newFeedback = { name, rating, text };
    productFeedbacks.push(newFeedback);

    // 更新 localStorage
    localStorage.setItem(`feedbacks_${productId}`, JSON.stringify(productFeedbacks));

    // 清空表單並重新渲染回饋
    document.getElementById("feedback-name").value = "";
    document.getElementById("feedback-text").value = "";
    renderFeedbacks();
  });

  // 送貨及付款方式
  const shippingContainer = document.getElementById("shipping");
  shippingContainer.innerHTML = `
    <h4>配送方式</h4>
    <p>宅配 / 7-11 / 全家</p>
    <h4>付款方式</h4>
    <p>Apple Pay / LINE Pay / 銀行轉帳 / 信用卡 / 超商取貨付款</p>
  `;
});
