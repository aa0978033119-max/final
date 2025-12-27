// 切換右側內容
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// 登出
function logout() {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    alert("已登出");
    window.location.href = "index.html";
}

// 登入（模擬）
function loginAsGuest() {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", "STANDARD DAY 會員");

    const redirect = localStorage.getItem("redirectAfterLogin") || "index.html";
    localStorage.removeItem("redirectAfterLogin");
    location.href = redirect;
}

// DOM 加載完畢
document.addEventListener("DOMContentLoaded", () => {
    const isLogin = localStorage.getItem("isLogin");
    const loginBox = document.getElementById("loginBox");
    const memberContent = document.getElementById("memberContent");

    if (isLogin) {
        if (loginBox) loginBox.style.display = "none";
        if (memberContent) memberContent.style.display = "flex";

        // 如果有儲存過會員資料，顯示在表單
        const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
        if (profile.name) document.getElementById("name").value = profile.name;
        if (profile.email) document.getElementById("email").value = profile.email;
        if (profile.phone) document.getElementById("phone").value = profile.phone;

    } else {
        if (loginBox) loginBox.style.display = "flex";
        if (memberContent) memberContent.style.display = "none";
    }

    // 會員資料表單送出
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', e => {
            e.preventDefault();

            const profileData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };

            localStorage.setItem('userProfile', JSON.stringify(profileData));
            alert('會員資料已更新！');
        });
    }
});
