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

  window.addToCart = function(button) {
    if (!button) return;
    const product = button.closest(".product");
    if (!product) return;

    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const img = product.dataset.img;
    if (!id || !name || !price || !img) return;

    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      // 未登入 → 記錄返回頁面 & 自動加入的商品
      localStorage.setItem("redirectAfterLogin", window.location.href);
      localStorage.setItem("autoAddCart", JSON.stringify({ id, name, price, img, quantity: 1 }));
      window.location.href = "member.html";
      return;
    }

    // 已登入 → 加入購物車
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      cart[id] = { id, name, price, img, quantity: 1 };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} 已加入購物車！`);
  };

  // 初始化收藏圖示
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

  // ===== profileForm 提交 =====
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", e => {
      e.preventDefault();
      const profileData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
      };
      localStorage.setItem("userProfile", JSON.stringify(profileData));
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("user", profileData.name || "STANDARD DAY 會員");

      alert("會員資料已更新，登入成功！");
      renderUserArea();

      // ===== 自動加入購物車 & 返回原頁 =====
      const autoAdd = JSON.parse(localStorage.getItem("autoAddCart"));
      if (autoAdd) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        const { id, name, price, img, quantity } = autoAdd;
        if (cart[id]) cart[id].quantity += quantity;
        else cart[id] = { id, name, price, img, quantity };
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.removeItem("autoAddCart");
        alert(`${name} 已自動加入購物車！`);
      }

      const redirectUrl = localStorage.getItem("redirectAfterLogin") || "index.html";
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectUrl;
    });
  }

  // ===== Product 點擊跳轉 =====
  document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const productDiv = link.closest('.product');
      if (!productDiv) return;
      const productId = productDiv.getAttribute('data-id');
      if (productId) window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
    });
  });

});
