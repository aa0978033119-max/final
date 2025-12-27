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
    if (!bannerImage) return;
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

  window.nextBanner = nextBanner;
  window.prevBanner = prevBanner;

  showBanner(currentIndex);
  setInterval(nextBanner, 4000);

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
  const user = localStorage.getItem("user");

  if (!userArea) return;

  if (user) {
    userArea.innerHTML = `
      <div class="user-menu">
        <img src="images/user.png" alt="Member">
        <span style="margin-left:8px;">Hi, ${user}</span>
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

      // 若首頁已開啟，讓它同步更新
      if (window.opener?.renderUserArea) window.opener.renderUserArea();
    });
  }

});
