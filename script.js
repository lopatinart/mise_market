function toggleMenu() { 
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('open');
}

function closeMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.remove('open');
}

function sendMessageToBot(productName, productPrice, productImageUrl) {
    // Настройки для отправки сообщения
    const adminChatId = '754288295'; // Чат ID администратора
    const botToken = '7574870490:AAEMz1sBMUeerGiBLUefT0OKwwU8YaRces8';
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    // Получение данных пользователя через Telegram Web App
    let userTelegramId = 'Unknown User'; // Значение по умолчанию
    if (window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        userTelegramId = window.Telegram.WebApp.initDataUnsafe.user?.id || 'Unknown User';
    }

    // Полный путь к изображению
    const productImageUrlAbsolute = `https://lopatinart.github.io/mise_market/${productImageUrl}`;

    // Сообщение для отправки
    const message = `
        *Пользователь*: ${userTelegramId}
        *Название товара*: ${productName}
        *Цена*: ${productPrice}
        [Посмотреть товар](${productImageUrlAbsolute})
    `;

    // Отправка сообщения боту
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: adminChatId, // Отправляем админу
            photo: productImageUrlAbsolute, // URL фотографии
            caption: message, // Текст сообщения
            parse_mode: 'Markdown', // Форматирование
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при отправке сообщения');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Сообщение отправлено:', data);
            alert('Сообщение успешно отправлено администратору!');
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            alert('Ошибка при отправке сообщения.');
        });
}

// Привязка кнопок к функции
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-card button.send");

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".product-card");
            const productName = card.querySelector("h4").textContent;
            const productPrice = card.querySelector(".price").textContent;
            const productImage = card.querySelector("img").getAttribute('src');

            sendMessageToBot(productName, productPrice, productImage);
        });
    });
});
