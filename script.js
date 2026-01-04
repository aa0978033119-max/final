document.addEventListener("DOMContentLoaded", () => {
    
      // 點擊會員中心
    const memberLink = document.getElementById("memberLink");
    if (memberLink) {
        memberLink.addEventListener("click", (e) => {
            const isLogin = localStorage.getItem("isLogin") === "true";
            if (!isLogin) {
                e.preventDefault();
                alert("請先註冊 / 登入");
                localStorage.setItem("redirectAfterLogin", "member.html");
                window.location.href = "member.html";
            }
        });
    }
    
    // 點擊購物車
    const cartLink = document.getElementById("cartLink");
    if (cartLink) {
        cartLink.addEventListener("click", (e) => {
            const isLogin = localStorage.getItem("isLogin") === "true";
            if (!isLogin) {
                e.preventDefault();
                alert("請先註冊 / 登入");
                localStorage.setItem("redirectAfterLogin", "cart.html");
                window.location.href = "member.html";
            }
        });
    }

  // ===== 會員登入狀態 =====
  function renderUserArea() {
    const userArea = document.getElementById("user-area");
    if (!userArea) return;

    const user = localStorage.getItem("user");
    if (user && localStorage.getItem("isLogin") === "true") {
      userArea.innerHTML = `
        <div class="user-menu">
          <img src="images/user.png" alt="Member">
          <span class="user-name">Hi, ${user}</span>
          <div class="dropdown">
            <a href="member.html">會員中心</a>
            <a href="#" onclick="logout()">登出</a>
          </div>
        </div>
      `;
    } else {
      userArea.innerHTML = `<a href="member.html"><img src="images/user.png" title="註冊 / 登入"></a>`;
    }
  }
  window.renderUserArea = renderUserArea;
  renderUserArea();

  // 登出
  window.logout = function() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    alert("已登出");
    renderUserArea();
    window.location.href = "index.html";
  };

  // ===== 加入購物車 =====
  window.addToCart = function(button) {
    if (localStorage.getItem("isLogin") !== "true") {
      alert("請先註冊/登入會員！");
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "member.html";
      return;
    }

    const product = button.closest(".product");
    if (!product) return;

    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const img = product.dataset.img;

    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      cart[id] = { id, name, price, img, quantity: 1 };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} 已加入購物車！`);
  };

  // ===== 點擊購物車圖示 =====
  const cartIcon = document.querySelector('a[title="購物車"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", e => {
      e.preventDefault();
      if (localStorage.getItem("isLogin") !== "true") {
        alert("請先註冊/登入會員！");
        localStorage.setItem("redirectAfterLogin", "cart.html");
        window.location.href = "member.html";
        return;
      }
      window.location.href = "cart.html";
    });
  }
  // ===== 初始化收藏圖示 =====
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    document.querySelectorAll(".product").forEach(product => {
        const id = product.dataset.id;
        const icon = product.querySelector(".favorite-icon");
        if (icon && favorites.some(item => item.id === id)) icon.src = "images/love.png";
    });

  // ===== Header 搜尋 & Menu =====
  const searchIcon   = document.getElementById("searchIcon");
  const searchBox    = document.getElementById("searchBox");
  const searchInput  = document.getElementById("searchInput");
  const searchResult = document.getElementById("searchResult");
  const menuIcon     = document.getElementById("menuIcon");
  const menuBox      = document.getElementById("menuBox");

  if (searchIcon && searchBox && searchInput && searchResult) {
    searchIcon.addEventListener("click", e => {
      e.stopPropagation();
      searchBox.classList.toggle("active");
      searchInput.focus();
    });

    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.trim().toLowerCase();
      searchResult.innerHTML = "";
      if (!keyword) return;

      const results = window.products?.filter(p => p.name.toLowerCase().includes(keyword)) || [];

      if (results.length === 0) searchResult.innerHTML = "<p>找不到商品</p>";
      else results.forEach(p => {
        const a = document.createElement("a");
        a.className = "search-item";
        a.href = `product.html?id=${p.id}`;
        a.textContent = p.name;
        a.addEventListener("click", () => {
          searchBox.classList.remove("active");
          searchInput.value = "";
          searchResult.innerHTML = "";
        });
        searchResult.appendChild(a);
      });
    });

    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        const keyword = searchInput.value.trim().toLowerCase();
        const results = window.products?.filter(p => p.name.toLowerCase().includes(keyword)) || [];
        if (results.length > 0) window.location.href = `product.html?id=${results[0].id}`;
        else alert("找不到商品");
      }
    });

    searchBox.addEventListener("click", e => e.stopPropagation());
    document.addEventListener("click", () => searchBox.classList.remove("active"));
  }

  if (menuIcon && menuBox) {
    menuIcon.addEventListener("click", e => { e.stopPropagation(); menuBox.classList.toggle("active"); });
    menuBox.addEventListener("click", e => e.stopPropagation());
    document.addEventListener("click", () => menuBox.classList.remove("active"));
  }

  // ===== 會員登入狀態 =====
  function renderUserArea() {
    const userArea = document.getElementById("user-area");
    if (!userArea) return;

    const user = localStorage.getItem("user");
    if (user) {
      userArea.innerHTML = `
        <div class="user-menu">
          <img src="images/user.png" alt="Member">
          <span class="user-name">Hi, ${user}</span>
          <div class="dropdown">
            <a href="member.html">會員中心</a>
            <a href="#" onclick="logout()">登出</a>
          </div>
        </div>
      `;
    } else {
      userArea.innerHTML = `<a href="member.html"><img src="images/user.png" title="註冊 / 登入"></a>`;
    }
  }
  window.renderUserArea = renderUserArea;
  renderUserArea();

  window.logout = function() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    alert("已登出");
    renderUserArea();
    window.location.href = "index.html";
  };
});
