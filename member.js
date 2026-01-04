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
    localStorage.removeItem("userProfile");
    alert("已登出");
    window.location.href = "index.html";
}

// 判斷會員資料是否完整
function profileComplete() {
    const profile = JSON.parse(localStorage.getItem("userProfile")) || {};
    return profile.name && profile.email && profile.phone;
}

// DOM 加載完畢
document.addEventListener("DOMContentLoaded", () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const loginBox = document.getElementById("loginBox");
    const memberContent = document.getElementById("memberContent");

    if (isLogin) {
        if (loginBox) loginBox.style.display = "none";
        if (memberContent) memberContent.style.display = "flex";

        // 載入會員資料
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
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim()
            };

            if (!profileData.name || !profileData.email || !profileData.phone) {
                alert("請完整填寫姓名、Email、電話！");
                return;
            }

            localStorage.setItem('userProfile', JSON.stringify(profileData));
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("user", profileData.name || "STANDARD DAY 會員");

            alert('登入成功！');

            // 更新 header 顯示會員icon
            const userArea = document.getElementById("user-area");
            if (userArea) {
                userArea.innerHTML = `
                    <a href="member.html" title="會員中心">
                        <img src="images/user.png" alt="Member">
                    </a>
                `;
            }

            // 自動返回先前頁面
            const redirectUrl = localStorage.getItem("redirectAfterLogin");
            if (redirectUrl) {
                localStorage.removeItem("redirectAfterLogin");
                window.location.href = redirectUrl;
            }
        });
    }
});
