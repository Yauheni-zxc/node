const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Путь к файлу с данными счетчика
const counterFile = path.join(__dirname, 'counter.json');

// Загрузка счетчика из файла
let counter = {};
try {
  const data = fs.readFileSync(counterFile, 'utf8');
  counter = JSON.parse(data);
} catch (err) {
  // Если файл не найден, создаем новый объект счетчика
  counter = {};
}

// Обработка запроса на главную страницу
app.get('/', (req, res) => {
  // Увеличиваем счетчик просмотров для главной страницы
  counter['/'] = (counter['/'] || 0) + 1;

  // Сохраняем обновленный счетчик в файл
  fs.writeFileSync(counterFile, JSON.stringify(counter));

  // Рендерим HTML-страницу
  res.send(`
    <h1>Главная страница</h1>
    <p>Количество просмотров: ${counter['/']}</p>
    <a href="/about">Перейти на страницу "О нас"</a>
  `);
});

// Обработка запроса на страницу "О нас"
app.get('/about', (req, res) => {
  // Увеличиваем счетчик просмотров для страницы "О нас"
  counter['/about'] = (counter['/about'] || 0) + 1;

  // Сохраняем обновленный счетчик в файл
  fs.writeFileSync(counterFile, JSON.stringify(counter));

  // Рендерим HTML-страницу
  res.send(`
    <h1>О нас</h1>
    <p>Количество просмотров: ${counter['/about']}</p>
    <a href="/">Вернуться на главную страницу</a>
  `);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});