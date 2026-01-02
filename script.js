document.addEventListener("DOMContentLoaded", () => {

  const banners = [
    { img: "images/08.jpg", title: "NEW ARRIVAL", desc: "秋冬新品 8 折起" },
    { img: "images/13.jpg", title: "SALE", desc: "限時優惠 20% OFF" },
    { img: "images/14.jpg", title: "HOT ITEMS", desc: "人氣熱銷商品" }
  ];

  let currentIndex = 0;
  let timer = null;

  const bannerImage = document.getElementById("bannerImage");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc  = document.getElementById("bannerDesc");
  const dotsContainer = document.getElementById("dotsContainer");

  if (!bannerImage || !dotsContainer) {
    console.error("Banner DOM not found");
    return;
  }

  function showBanner(index) {
    clearTimeout(timer);

    currentIndex = index;
    
    if (index >= banners.length) currentIndex = 0;
    if (index < 0) currentIndex = banners.length - 1;

    bannerImage.src = banners[currentIndex].img;
    bannerTitle.textContent = banners[currentIndex].title;
    bannerDesc.textContent  = banners[currentIndex].desc;

    updateDots();
    timer = setTimeout(nextBanner, 4000);
  }

  function nextBanner() {
    currentIndex++;
    showBanner(currentIndex);
  }

  function prevBanner() {
    currentIndex--;
    showBanner(currentIndex);
  }

  // dots
  banners.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => {
      currentIndex = index;
      showBanner(currentIndex);
    };
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // 初始化
  showBanner(currentIndex);

  // 給 HTML onclick 用
  window.nextBanner = nextBanner;
  window.prevBanner = prevBanner;
});


  /* ========= 收藏初始化 ========= */
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.querySelectorAll(".product").forEach(product => {
    const name = product.querySelector(".product-name")?.textContent;
    const icon = product.querySelector(".favorite-icon");
    if (name && icon && favorites.includes(name)) {
      icon.src = "images/love.png";
    }
  });

  /* ========= Header 搜尋 & 商品分類 ========= */
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const menuIcon = document.getElementById("menuIcon");
  const menuBox = document.querySelector(".menu-box");

  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", e => {
      e.stopPropagation();
      searchBox.classList.toggle("active");
      menuBox?.classList.remove("active");
      searchBox.querySelector("input")?.focus();
    });
  }

  if (menuIcon && menuBox) {
    menuIcon.addEventListener("click", e => {
      e.stopPropagation();
      menuBox.classList.toggle("active");
      searchBox?.classList.remove("active");
    });
  }

  [searchBox, menuBox].forEach(box => {
    box?.addEventListener("click", e => e.stopPropagation());
  });

  document.addEventListener("click", () => {
    searchBox?.classList.remove("active");
    menuBox?.classList.remove("active");
  });

  /* ========= 收藏切換 ========= */
  window.toggleFavorite = function(el) {
    const productName = el.closest(".product").querySelector(".product-name")?.textContent;
    if (!productName) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (el.src.includes("heart.png")) {
      el.src = "images/love.png";
      if (!favorites.includes(productName)) favorites.push(productName);
    } else {
      el.src = "images/heart.png";
      favorites = favorites.filter(name => name !== productName);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  /* ========= 會員登入狀態渲染 ========= */
  function renderUserArea() {
    const userArea = document.getElementById("user-area");
    if (!userArea) return;

    const user = localStorage.getItem("user");

    if (user) {
      // 已登入
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
      // 未登入
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
  window.logout = function() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    alert("已登出");
    renderUserArea();
    window.location.href = "index.html";
  };

  /* ========= profileForm 提交 ========= */
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
      localStorage.setItem("user", "STANDARD DAY 會員");

      alert("會員資料已更新，登入成功！");
      renderUserArea();

      if (window.opener?.renderUserArea) window.opener.renderUserArea();
    });
  }

document.querySelectorAll('.product-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();    // 阻止 <a> 的預設跳轉（若有 href）
    e.stopPropagation();   // 防止冒泡到其他元素

    const productDiv = link.closest('.product');
    if (!productDiv) return;

    const productId = productDiv.getAttribute('data-id');
    if (productId) {
      window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
    } else {
      console.warn('此商品缺少 data-id 屬性');
    }
  });
});
