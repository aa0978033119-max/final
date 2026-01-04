document.addEventListener("DOMContentLoaded", () => {

  // ===================== Toast =====================
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  }

  // ===================== Header 搜尋 / 漢堡選單 =====================
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const searchResult = document.getElementById("searchResult");
  const menuIcon = document.getElementById("menuIcon");
  const menuBox = document.getElementById("menuBox");

  // 搜尋框切換
  searchIcon?.addEventListener("click", e => {
    e.stopPropagation();
    searchBox.classList.toggle("active");
    menuBox?.classList.remove("active");
  });

  // 漢堡選單切換
  menuIcon?.addEventListener("click", e => {
    e.stopPropagation();
    menuBox.classList.toggle("active");
    searchBox?.classList.remove("active");
  });

  // 點擊其他地方收起搜尋或選單
  document.addEventListener("click", () => {
    searchBox?.classList.remove("active");
    menuBox?.classList.remove("active");
    if (searchResult) searchResult.innerHTML = "";
  });

  searchBox?.addEventListener("click", e => e.stopPropagation());
  menuBox?.addEventListener("click", e => e.stopPropagation());

  // ===================== 搜尋商品 =====================
  if (searchInput && searchResult && products) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      searchResult.innerHTML = "";

      if (!query) return;

      const matches = products.filter(p => p.name.toLowerCase().includes(query));

      if (matches.length === 0) {
        searchResult.innerHTML = "<p style='padding:10px;color:#777'>沒有找到商品</p>";
        return;
      }

      matches.forEach(p => {
        const div = document.createElement("div");
        div.className = "search-item";
        div.style = "display:flex; align-items:center; padding:5px; cursor:pointer; border-bottom:1px solid #eee";
        div.innerHTML = `
          <img src="${p.images[0]}" alt="${p.name}" style="width:40px;height:40px;object-fit:cover;margin-right:8px;">
          <span>${p.name}</span>
        `;
        div.addEventListener("click", () => {
          window.location.href = `product.html?id=${p.id}`;
        });
        searchResult.appendChild(div);
      });
    });
  }

  // ===================== 登入檢查 / 登出 =====================
  function requireLogin(redirectTo) {
    if (localStorage.getItem("isLogin") !== "true") {
      localStorage.setItem("redirectAfterLogin", redirectTo);
      showToast("請先登入會員");
      setTimeout(() => window.location.href = "member.html", 800);
      return false;
    }
    return true;
  }

  function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    showToast("已登出");
    setTimeout(() => window.location.href = "index.html", 800);
  }

  // header 會員顯示
  function renderUserArea() {
    const userArea = document.getElementById("user-area");
    if (!userArea) return;

    const isLogin = localStorage.getItem("isLogin") === "true";
    const user = localStorage.getItem("user");

    if (isLogin && user) {
      userArea.innerHTML = `
        <div class="user-menu">
          <img src="images/user.png" alt="Member">
          <span class="user-name">Hi, ${user}</span>
          <div class="dropdown">
            <a href="member.html">會員中心</a>
            <a href="#" id="logoutBtn">登出</a>
          </div>
        </div>
      `;
      document.getElementById("logoutBtn").addEventListener("click", e => {
        e.preventDefault();
        logout();
      });
    } else {
      userArea.innerHTML = `
        <a href="member.html">
          <img src="images/user.png" title="註冊 / 登入">
        </a>
      `;
    }
  }
  renderUserArea();
  window.renderUserArea = renderUserArea;

  // ===================== 回到頂部 =====================
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===================== product.html 的商品 / 評價 / 加入購物車 =====================
  const productContainer = document.querySelector(".product-container");
  if (productContainer && products && reviews) {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id")) || 1;
    const product = products.find(p => p.id === id);
    if (!product) return;

    // 塞商品資訊
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productDesc").innerText = product.desc;
    document.getElementById("productPrice").innerText = `NT$ ${product.price}`;
    document.getElementById("detail").innerText = product.detail;
    const mainImg = document.getElementById("mainImage");
    mainImg.src = product.images[0];
    mainImg.alt = product.name;

    // 尺寸
    const sizeSelect = document.getElementById("sizeSelect");
    sizeSelect.innerHTML = "";
    product.sizes.forEach(size => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });

    // 顧客評價
    const reviewContainer = document.getElementById("review");
    const productReviews = reviews[id] || [];
    reviewContainer.innerHTML = "";
    if (productReviews.length === 0) {
      reviewContainer.innerText = "尚無評價";
    } else {
      productReviews.forEach(r => {
        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `<strong>${r.name}</strong> - ${"★".repeat(r.rating)}<br><p>${r.text}</p>`;
        reviewContainer.appendChild(div);
      });
    }

    // 加入購物車
    const addCartBtn = document.querySelector(".add-cart");
    if (addCartBtn) {
      addCartBtn.addEventListener("click", () => {
        const size = sizeSelect.value;
        const qty = Number(document.querySelector("input[type='number']").value);
        if (!requireLogin("product.html?id=" + id)) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[id] = cart[id]
          ? { ...cart[id], quantity: cart[id].quantity + qty }
          : { id, name: product.name, price: product.price, img: product.images[0], quantity: qty };
        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`${product.name} 已加入購物車！尺寸：${size} 數量：${qty}`);
      });
    }

    // tabs 切換
    document.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".content").forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });
  }

});
