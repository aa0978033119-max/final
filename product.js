// Tabs 切換
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// 回到頂部
document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 加入購物車（示意）
document.querySelector('.add-cart').addEventListener('click', () => {
  const size = document.getElementById('size').value;
  const qty = document.getElementById('qty').value;
  alert(`已加入購物車\n尺寸：${size}\n數量：${qty}`);
});
