const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let posts = [];

// Настройка middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Получение всех постов
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Добавление нового поста
app.post('/posts', (req, res) => {
    const post = req.body;
    post.timestamp = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    posts.push(post);
    res.status(201).json(post);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
