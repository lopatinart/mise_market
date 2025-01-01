function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('open');
}

function closeMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.remove('open');
}

// Функция для переноса пользователя на страницу товара
function viewProduct(url) {
    window.location.href = "https://t.me/tengo01";
}