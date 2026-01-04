document.addEventListener("DOMContentLoaded", () => {

  // ===== Banner =====
  const bannerImage = document.getElementById("bannerImage");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc  = document.getElementById("bannerDesc");
  const dotsContainer = document.getElementById("dotsContainer");

  if (bannerImage && bannerTitle && bannerDesc && dotsContainer) {
    const banners = [
      { img: "images/banner1.jpg", title: "NEW ARRIVAL", desc: "秋冬新品 8 折起", productId: 4 },
      { img: "images/banner2.jpg", title: "SALE", desc: "限時優惠 20% OFF", productId: 14 },
      { img: "images/banner3.jpg", title: "HOT ITEMS", desc: "人氣熱銷商品", productId: 3 }
    ];

    let currentIndex = 0;
    let timer = null;

    function showBanner(index) {
      clearTimeout(timer);
      currentIndex = index;
      if (index >= banners.length) currentIndex = 0;
      if (index < 0) currentIndex = banners.length - 1;

      bannerImage.src = banners[currentIndex].img;
      bannerTitle.textContent = banners[currentIndex].title;
      bannerDesc.textContent = banners[currentIndex].desc;

      updateDots();
      timer = setTimeout(nextBanner, 4000);
    }

    function nextBanner() { currentIndex++; showBanner(currentIndex); }
    function prevBanner() { currentIndex--; showBanner(currentIndex); }

    const bannerButton = document.querySelector(".banner-text button");
    if (bannerButton) {
      bannerButton.addEventListener("click", () => {
        window.location.href = `product.html?id=${banners[currentIndex].productId}`;
      });
    }

    banners.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.onclick = () => showBanner(i);
      dotsContainer.appendChild(dot);
    });

    function updateDots() {
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
    }

    showBanner(currentIndex);
    window.nextBanner = nextBanner;
    window.prevBanner = prevBanner;
  }

  // ===== 收藏 & 購物車 =====
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  window.toggleFavorite = function(el) {
    if (!el) return;
    const product = el.closest(".product");
    if (!product) return;

    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = product.dataset.price;
    const img = product.dataset.img;
    if (!id || !name || !price || !img) return;

    const index = favorites.findIndex(item => item.id === id);
    if (el.src.includes("heart.png")) {
      el.src = "images/love.png";
      if (index === -1) favorites.push({ id, name, price, img });
    } else {
      el.src = "images/heart.png";
      if (index !== -1) favorites.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  // ===== 檢查登入 & 會員資料完整 =====
  function profileComplete() {
    const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
    return profile.name && profile.email && profile.phone;
  }

  function requireLoginThen(actionCallback) {
    const isLogin = localStorage.getItem("isLogin") === "true";

    if (!isLogin) {
      alert("請先註冊 / 登入");
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "member.html";
      return false;
    }

    if (!profileComplete()) {
      alert("請先填寫完整會員資料");
      localStorage.setItem("redirectAfterLogin", window.location.href);
      window.location.href = "member.html";
      return false;
    }

    if (actionCallback) actionCallback();
    return true;
  }

  window.addToCart = function(button) {
    requireLoginThen(() => {
      const product = button.closest(".product");
      if (!product) return;
      const id = product.dataset.id;
      const name = product.dataset.name;
      const price = parseInt(product.dataset.price);
      const img = product.dataset.img;
      if (!id || !name || !price || !img) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      if (cart[id]) cart[id].quantity += 1;
      else cart[id] = { id, name, price, img, quantity: 1 };

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${name} 已加入購物車！`);
    });
  };

  // 點擊購物車圖示
  const cartIcon = document.querySelector('a[title="購物車"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", e => {
      e.preventDefault();
      requireLoginThen(() => {
        window.location.href = "cart.html";
      });
    });
  }

  // ===== 初始化收藏圖示 =====
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
