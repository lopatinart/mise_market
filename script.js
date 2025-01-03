function sendMessageToBot(productName, productPrice, productImageUrl) {
    const adminChatId = '934127824'; // Чат ID администратора
    const botToken = '7574870490:AAEMz1sBMUeerGiBLUefT0OKwwU8YaRces8';
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Получение данных пользователя через Telegram Web App
    //const telegramData = window.Telegram.WebApp.initDataUnsafe.user;
    //const userTelegramId = telegramData ? telegramData.username : "Неавторизованный пользователь";

    const userData = window.Telegram.WebApp.initDataUnsafe;
    const username = userData?.user?.username || "неизвестныйпользователь";
    const firstName = userData?.user?.first_name || "Гость";

    // Полный путь к изображению
    const productImageUrlAbsolute = `https://lopatinart.github.io/mise_market/${productImageUrl}`;

    // Формирование сообщения
    const message = `
        *Пользователь*: ${username} (${firstName})
        *Название товара*: ${productName}
        *Цена*: ${productPrice}
        [Посмотреть товар](${productImageUrlAbsolute})
    `;

    // Отправка данных
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: adminChatId,
            photo: productImageUrlAbsolute,
            text: message,
            parse_mode: 'Markdown',
        }),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Ошибка при отправке сообщения');
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
            const productName = card.querySelector("h4")?.textContent;
            const productPrice = card.querySelector(".price")?.textContent;
            const productImage = card.querySelector("img")?.getAttribute('src');

            sendMessageToBot(productName, productPrice, productImage);
        });
    });
});
