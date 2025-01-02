function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('open');
}

function closeMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.remove('open');
}

function sendMessageToBot(productName, productPrice, productImageUrl) {
    const userTelegramId = '754288295';
    const botToken = '7574870490:AAEMz1sBMUeerGiBLUefT0OKwwU8YaRces8';

    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
    const productImageUrlToSite = 'https://lopatinart.github.io/mise_market/' + productImageUrl;
    const message = `
        *Название товара*: ${productName}
        *Цена*: ${productPrice}
        [Посмотреть товар](${productImageUrlToSite})
    `;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: userTelegramId,
            photo: productImageUrl, // Отправляем фото
            caption: message, // Подпись для фото
            parse_mode: 'Markdown',
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
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}

// Привязка кнопок к функции
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-card button");

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".product-card");
            const productName = card.querySelector("h4").textContent;
            const productPrice = card.querySelector(".price").textContent;
            const productImage = card.querySelector("img").src;

            sendMessageToBot(productName, productPrice, productImage);
        });
    });
});
