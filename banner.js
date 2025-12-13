const banners = [
  {
    img: "images/banner1.jpg",
    title: "NEW ARRIVAL",
    desc: "秋冬新品 8 折起"
  },
  {
    img: "images/banner2.jpg",
    title: "SALE",
    desc: "限時優惠 20% OFF"
  },
  {
    img: "images/banner3.jpg",
    title: "HOT ITEMS",
    desc: "人氣熱銷商品"
  }
];

let currentIndex = 0;

const bannerImage = document.getElementById("bannerImage");
const bannerTitle = document.getElementById("bannerTitle");
const bannerDesc = document.getElementById("bannerDesc");

function showBanner(index) {
  bannerImage.src = banners[index].img;
  bannerTitle.textContent = banners[index].title;
  bannerDesc.textContent = banners[index].desc;
}

function nextBanner() {
  currentIndex = (currentIndex + 1) % banners.length;
  showBanner(currentIndex);
}

function prevBanner() {
  currentIndex = (currentIndex - 1 + banners.length) % banners.length;
  showBanner(currentIndex);
}

/* 自動輪播 */
setInterval(nextBanner, 4000);

// dots
const dotsContainer = document.getElementById("dotsContainer");

banners.forEach((banner, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    currentIndex = index;
    showBanner(currentIndex);
  });
  dotsContainer.appendChild(dot);
});

// active dot
function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// 修改 showBanner 函數，加上更新 dot
function showBanner(index) {
  bannerImage.src = banners[index].img;
  bannerTitle.textContent = banners[index].title;
  bannerDesc.textContent = banners[index].desc;
  updateDots();
}

// 初始化
showBanner(currentIndex);
