document.addEventListener("DOMContentLoaded", () => {

  /* ========= Banner ========= */
  const banners = [
    { img: "images/banner1.jpg", title: "NEW ARRIVAL", desc: "秋冬新品 8 折起" },
    { img: "images/banner2.jpg", title: "SALE", desc: "限時優惠 20% OFF" },
    { img: "images/banner3.jpg", title: "HOT ITEMS", desc: "人氣熱銷商品" }
  ];

  let currentIndex = 0;
  const bannerImage = document.getElementById("bannerImage");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerDesc = document.getElementById("bannerDesc");
  const dotsContainer = document.getElementById("dotsContainer");

  function showBanner(index) {
    if (!bannerImage) return; // 安全檢查
    bannerImage.src = banners[index].img;
    bannerTitle.textContent = banners[index].title;
    bannerDesc.textContent = banners[index].desc;
    updateDots();
  }

  function nextBanner() {
    currentIndex = (currentIndex + 1) % banners.length;
    showBanner(currentIndex);
  }

  function prevBanner() {
    currentIndex = (currentIndex - 1 + banners.length) % banners.length;
    showBanner(currentIndex);
  }

  if (dotsContainer) {
    banners.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        currentIndex = index;
        showBanner(currentIndex);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // 將按鈕功能掛載到 window，讓 HTML 的 onclick 可以用到
  window.nextBanner = nextBanner;
  window.prevBanner = prevBanner;

  showBanner(currentIndex);
  setInterval(nextBanner, 4000);

  /* ========= 收藏狀態初始化 ========= */
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.querySelectorAll(".product").forEach(product => {
    const name = product.querySelector(".product-name")?.textContent;
    const icon = product.querySelector(".favorite-icon");
    if (name && icon && favorites.includes(name)) {
      icon.src = "images/love.png";
    }
  });

  /* ========= Header：搜尋 & 商品分類 ========= */
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const menuIcon = document.getElementById("menuIcon");
  const menuBox = document.querySelector(".menu-box");

  // 搜尋圖示點擊
  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchBox.classList.toggle("active");
      if (menuBox) menuBox.classList.remove("active");

      const input = searchBox.querySelector("input");
      if (input) input.focus();
    });
  }

  // 衣服圖示點擊
  if (menuIcon && menuBox) {
    menuIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      menuBox.classList.toggle("active");
      if (searchBox) searchBox.classList.remove("active");
    });
  }

  // 防止點擊選單內部時自動關閉
  [searchBox, menuBox].forEach(box => {
    if (box) {
      box.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });

  // 點擊頁面其他地方關閉所有選單
  document.addEventListener("click", () => {
    if (searchBox) searchBox.classList.remove("active");
    if (menuBox) menuBox.classList.remove("active");
  });

  /* 收藏切換函數 (全域) */
  window.toggleFavorite = function(el) {
    // 簡單檢查目前的圖片路徑來切換
    if (el.src.includes("heart.png")) {
      el.src = "images/love.png";
    } else {
      el.src = "images/heart.png";
    }
  };

}); // 第一行 DOMContentLoaded 的閉合

  /* ========= Header：登入狀態 ========= */
  const userArea = document.getElementById("user-area");
  const user = localStorage.getItem("user");

  if (userArea) {
    if (user) {
      userArea.innerHTML = `
        <span style="margin-right:8px;">Hi, ${user}</span>
        <button onclick="logout()">登出</button>
      `;
    } else {
      userArea.innerHTML = `
        <a href="member.html">註冊 / 登入</a>
      `;
    }
  }

if (userArea) {
  if (user) {
    userArea.innerHTML = `
      <div class="user-menu">
        <img src="images/user.png">
        <div class="dropdown">
          <a href="member.html">會員中心</a>
          <a href="#" onclick="logout()">登出</a>
        </div>
      </div>
    `;
  } else {
    userArea.innerHTML = `
      <a href="member.html">
        <img src="images/user.png" title="註冊 / 登入">
      </a>
    `;
  }
}

function goMember() {
  location.href = "member.html";
}
