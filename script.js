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

  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      searchBox.classList.toggle("active");
      menuBox.classList.remove("active");

      // 自動 focus
      const input = searchBox.querySelector("input");
      if (input) input.focus();
    });
  }

  if (menuIcon && menuBox) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      menuBox.classList.toggle("active");
      searchBox.classList.remove("active");
    });
  }

  // 點其他地方關閉
  document.addEventListener("click", () => {
    searchBox.classList.remove("active");
    menuBox.classList.remove("active");
  });


/* 收藏切換 */
function toggleFavorite(el) {
  el.src = el.src.includes("heart")
    ? "images/love.png"
    : "images/heart.png";
}
