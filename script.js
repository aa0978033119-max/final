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

  // ===================== 登入檢查 =====================
  function requireLogin(redirectTo) {
    if (localStorage.getItem("isLogin") !== "true") {
      localStorage.setItem("redirectAfterLogin", redirectTo);
      showToast("請先登入會員");
      setTimeout(() => window.location.href = "member.html", 800);
      return false;
    }
    return true;
  }

  // ===================== header 會員顯示 =====================
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
        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
        showToast("已登出");
        setTimeout(() => window.location.href = "index.html", 800);
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

  // ===================== 加入購物車事件代理 =====================
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-cart-btn")) {
      const btn = e.target;
      const product = btn.closest(".product");
      if (!product) return;

      if (!requireLogin(window.location.href)) return;

      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);
      const img = product.dataset.img;
      if (!id || !name || !price || !img) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      const key = id; // 如果要分尺寸可以改成 id + "-" + size

      if (cart[key]) {
        cart[key].quantity += 1;
      } else {
        cart[key] = { id, name, price, img, quantity: 1 };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showToast(`${name} 已加入購物車！`);
    }
  });

  // ===================== 收藏功能 =====================
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(item => item && item.id);

  window.toggleFavorite = function(el) {
    if (!el) return;
    const product = el.closest(".product");
    if (!product) return;

    const id = String(product.dataset.id);
    const name = product.dataset.name;
    const price = product.dataset.price;
    const img = product.dataset.img;
    if (!id || !name || !price || !img) return;

    const index = favorites.findIndex(item => String(item.id) === id);

    if (el.src.includes("heart.png")) {
      el.src = "images/love.png";
      if (index === -1) favorites.push({ id, name, price, img });
      showToast("已加入收藏");
    } else {
      el.src = "images/heart.png";
      if (index !== -1) favorites.splice(index, 1);
      showToast("已移除收藏");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  // 初始化收藏 icon
  document.querySelectorAll(".product").forEach(product => {
    const id = String(product.dataset.id);
    const icon = product.querySelector(".favorite-icon");
    if (!icon) return;
    icon.addEventListener("click", () => toggleFavorite(icon));
    if (favorites.some(item => String(item.id) === id)) icon.src = "images/love.png";
    else icon.src = "images/heart.png";
  });

});

