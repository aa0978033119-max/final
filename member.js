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

// 進會員中心就視為已登入
if (!localStorage.getItem("user")) {
  localStorage.setItem("user", "STANDARD DAY 會員");
}

  
