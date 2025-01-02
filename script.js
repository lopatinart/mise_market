function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('open');
}

function closeMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.remove('open');
}

function sendMessageToBot(productName, productPrice, productImageUrl) {
    const userTelegramId = '934127824'; // Укажите ваш ID для тестов
    const botToken = '7574870490:AAEMz1sBMUeerGiBLUefT0OKwwU8YaRces8'; // Замените на ваш токен бота

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const message = `
        *Название товара*: ${productName}
        *Цена*: ${productPrice}
        [Посмотреть товар](${productImageUrl})
    `;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: userTelegramId,
            text: message,
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
            alert('Сообщение отправлено!');
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            alert('Не удалось отправить сообщение.');
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

// Функция для переноса пользователя на страницу товара
// function viewProduct(url) {

//     window.location.href = "https://t.me/tengo01";
// }

// let tg = window.Telegram.WebApp;
// let send_message = document.getElementsByClassName('send');

// send_message.addEventListener('click', () => {
//     let product_name = document.getElementByName('1').value
//     let product_cost = document.getElementByName('1.1').value

//     let product_data = {
//         name: product_name,
//         cost: product_cost
//     }

//     tg.sendData(JSON.stringify(data));
// });
