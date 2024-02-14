const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/:number/news/for/:category', async (req, res) => {
    const { number, category } = req.params;
    const rssUrl = `https://www.vedomosti.ru/rss/rubric/${category}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await axios.get(apiUrl);
        const newsItems = response.data.items.slice(0, number);
        res.render('news', { newsItems, category: category.charAt(0).toUpperCase() + category.slice(1), number });
    } catch (error) {
        console.error(error);
        res.send("Произошла ошибка при получении новостей.");
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
