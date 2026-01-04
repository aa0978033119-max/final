document.addEventListener("DOMContentLoaded", () => {

    /* ========= Header Search / Menu ========= */
  const searchIcon = document.getElementById("searchIcon");
  const searchBox  = document.getElementById("searchBox");
  const menuIcon   = document.getElementById("menuIcon");
  const menuBox    = document.querySelector(".menu-box");

  /* ========= 會員 / 購物車：未登入攔截 ========= */

  function requireLogin(redirectTo) {
    if (localStorage.getItem("isLogin") !== "true") {
      alert("請先註冊 / 登入");
      localStorage.setItem("redirectAfterLogin", redirectTo);
      window.location.href = "member.html";
      return false;
    }
    return true;
  }

  // 點擊會員中心
  const memberLink = document.getElementById("memberLink");
  if (memberLink) {
    memberLink.addEventListener("click", e => {
      if (!requireLogin("member.html")) e.preventDefault();
    });
  }

  // 點擊購物車（連結）
  const cartLink = document.getElementById("cartLink");
  if (cartLink) {
    cartLink.addEventListener("click", e => {
      if (!requireLogin("cart.html")) e.preventDefault();
    });
  }

  // 點擊購物車 icon
  const cartIcon = document.querySelector('a[title="購物車"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", e => {
      e.preventDefault();
      if (requireLogin("cart.html")) {
        window.location.href = "cart.html";
      }
    });
  }

  /* ========= Header 會員顯示 ========= */

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

  window.renderUserArea = renderUserArea;
  renderUserArea();

  /* ========= 登出 ========= */

  function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    alert("已登出");
    window.location.href = "index.html";
  }

  window.logout = logout;

  /* ========= 加入購物車（唯一檢查點） ========= */

  window.addToCart = function (button) {
    if (!requireLogin(window.location.href)) return;

    const product = button.closest(".product");
    if (!product) return;

    const { id, name, price, img } = product.dataset;

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[id] = cart[id]
      ? { ...cart[id], quantity: cart[id].quantity + 1 }
      : { id, name, price: Number(price), img, quantity: 1 };

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} 已加入購物車！`);
  };
  
    /* ========= Toast ========= */
    function showToast(message, type = "success") {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.textContent = message;
    
      document.body.appendChild(toast);
    
      // 顯示
      requestAnimationFrame(() => {
        toast.classList.add("show");
      });
    
      // 自動消失
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
      }, 2000);
    }

    /* ========= 回到頂部按鈕 ========= */

  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {

    // 捲動時顯示 / 隱藏
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    // 點擊回到頂部
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  if (searchIcon) {
      searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      searchBox.classList.toggle("active");
      menuBox?.classList.remove("active");
    });
  }
    
    if (menuIcon) {
      menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        menuBox.classList.toggle("active");
        searchBox?.classList.remove("active");
      });
    }


});
