document.addEventListener("DOMContentLoaded", () => {
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

  // dots
  banners.forEach((banner, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentIndex = index;
      showBanner(currentIndex);
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // 暴露給 HTML onclick
  window.nextBanner = nextBanner;
  window.prevBanner = prevBanner;

  // 鍵盤左右鍵
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevBanner();
    else if (e.key === "ArrowRight") nextBanner();
  });

  // 初始化
  showBanner(currentIndex);

  // 自動輪播
  setInterval(nextBanner, 4000);
});
