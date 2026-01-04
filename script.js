document.addEventListener("DOMContentLoaded", () => {

  const banners = [
    { 
      img: "images/banner1.jpg",
      title: "NEW ARRIVAL",
      desc: "秋冬新品 8 折起",
      productId: 4
    },
    { 
      img: "images/banner2.jpg",
      title: "SALE",
      desc: "限時優惠 20% OFF",
      productId: 14
    },
    { 
      img: "images/banner3.jpg",
      title: "HOT ITEMS",
      desc: "人氣熱銷商品",
      productId: 3
    }
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

    //banner bottom
  const bannerButton = document.querySelector(".banner-text button");
  
  bannerButton.addEventListener("click", () => {
    const currentBanner = banners[currentIndex];
    // 這裡跳轉到產品頁，使用 productId
    window.location.href = `product.html?id=${currentBanner.productId}`;
  });

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
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.querySelectorAll(".product").forEach(product => {
    const name = product.querySelector(".product-name")?.textContent;
    const icon = product.querySelector(".favorite-icon");
    if (name && icon && favorites.includes(name)) {
      icon.src = "images/love.png";
    }
  });

  /* ========= Header 搜尋 & 商品分類 ========= */
document.addEventListener("DOMContentLoaded", () => {

  /* ========= Header 搜尋 ========= */
  const searchIcon   = document.getElementById("searchIcon");
  const searchBox    = document.getElementById("searchBox");
  const searchInput  = document.getElementById("searchInput");
  const searchResult = document.getElementById("searchResult");

  if (searchIcon && searchBox && searchInput && searchResult) {

    /* 點擊搜尋 icon */
    searchIcon.addEventListener("click", e => {
      e.stopPropagation();
      searchBox.classList.toggle("active");
      searchInput.focus();
    });

    /* 即時搜尋 */
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.trim().toLowerCase();
      searchResult.innerHTML = "";

      if (!keyword) return;

      const results = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
      );

      if (results.length === 0) {
        searchResult.innerHTML = "<p>找不到商品</p>";
        return;
      }

      results.forEach(p => {
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

    /* Enter 鍵搜尋（跳第一個商品） */
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();

        const keyword = searchInput.value.trim().toLowerCase();
        if (!keyword) return;

        const results = products.filter(p =>
          p.name.toLowerCase().includes(keyword)
        );

        if (results.length > 0) {
          window.location.href = `product.html?id=${results[0].id}`;
        } else {
          alert("找不到商品");
        }
      }
    });

    /* 點搜尋欄本身不關閉 */
    searchBox.addEventListener("click", e => {
      e.stopPropagation();
    });

    /* 點空白處關閉搜尋 */
    document.addEventListener("click", () => {
      searchBox.classList.remove("active");
    });
  }

  /* ========= Menu ========= */
  const menuIcon = document.getElementById("menuIcon");
  const menuBox  = document.getElementById("menuBox");

  if (menuIcon && menuBox) {
    menuIcon.addEventListener("click", e => {
      e.stopPropagation();
      menuBox.classList.toggle("active");
    });

    menuBox.addEventListener("click", e => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      menuBox.classList.remove("active");
    });
  }

});


  /* ========= 收藏切換 ========= */
  window.toggleFavorite = function(el) {
  const productName = el.closest(".product")
    .querySelector(".product-name")?.textContent;
  if (!productName) return;

  if (el.src.includes("heart.png")) {
    el.src = "images/love.png";
    if (!favorites.includes(productName)) {
      favorites.push(productName);
    }
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
    e.preventDefault();    // 阻止 <a> 的預設跳轉
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

const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    searchResult.innerHTML = "";

    if (keyword === "") return;

    const results = products.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );

    if (results.length === 0) {
      searchResult.innerHTML = "<p>找不到商品</p>";
      return;
    }

    results.forEach(p => {
      const item = document.createElement("a");
      item.className = "search-item";
      item.href = `product.html?id=${p.id}`;
      item.textContent = p.name;
    
      item.addEventListener("click", () => {
        searchBox.classList.remove("active");
        searchInput.value = "";
        searchResult.innerHTML = "";
      });
    
      searchResult.appendChild(item);
    });
  });
}

searchResult?.addEventListener("click", e => {
  e.stopPropagation();
});

