function showSection(sectionId) {
    // 取得所有區塊
    const sections = document.querySelectorAll('.content-section');
  
    // 全部隱藏
    sections.forEach(section => {
      section.classList.remove('active');
    });
  
    // 顯示被點擊的區塊
    document.getElementById(sectionId).classList.add('active');
  }
  
// 登出
  function logout() {
  localStorage.removeItem("user");   // 登出
  alert("已登出");
  window.location.href = "index.html";
}

// 登入
function loginAsGuest() {
  // 統一登入狀態
  localStorage.setItem("isLogin", "true");
  localStorage.setItem("user", "STANDARD DAY 會員");

  // 看是不是從購物車被擋來的
  const redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
  localStorage.removeItem("redirectAfterLogin");

  location.href = redirect;
}

document.addEventListener("DOMContentLoaded", () => {
  const isLogin = localStorage.getItem("isLogin");
  const loginBox = document.getElementById("loginBox");
  const memberContent = document.getElementById("memberContent");

  if (isLogin) {
    // 已登入
    if (loginBox) loginBox.style.display = "none";
    if (memberContent) memberContent.style.display = "flex";
  } else {
    // 未登入
    if (loginBox) loginBox.style.display = "flex";
    if (memberContent) memberContent.style.display = "none";
  }
});




