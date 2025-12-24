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

  banners.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentIndex = index;
      showBanner(currentIndex);
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  window.nextBanner = nextBanner;
  window.prevBanner = prevBanner;

  showBanner(currentIndex);
  setInterval(nextBanner, 4000);

  /* ========= 收藏狀態 ========= */
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

  // 點擊搜尋圖示
  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // 阻止事件傳到 document
      searchBox.classList.toggle("active");
      if (menuBox) menuBox.classList.remove("active"); // 關閉另一個

      const input = searchBox.querySelector("input");
      if (input) input.focus();
    });
  }

  // 點擊衣服圖示
  if (menuIcon && menuBox) {
    menuIcon.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // 阻止事件傳到 document
      menuBox.classList.toggle("active");
      if (searchBox) searchBox.classList.remove("active"); // 關閉另一個
    });
  }

  // 點擊選單內部時，不要觸發 document 的關閉事件
  [searchBox, menuBox].forEach(box => {
    if (box) {
      box.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });

  // 點擊頁面其他地方關閉選單
  document.addEventListener("click", () => {
    if (searchBox) searchBox.classList.remove("active");
    if (menuBox) menuBox.classList.remove("active");
  });

/* 收藏切換 */
window.toggleFavorite = function(el) {
  el.src = el.src.includes("heart") ? "images/love.png" : "images/heart.png";
};
