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
    alert('已登出');
    // 清除登入資訊
    // localStorage.removeItem("user");
    window.location.href = 'login.html';
  }
  