const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4044;
const apiKey = 'c77b620170a24242bdd140558243103';

app.use(cors());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=yes&lang=fr`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données météo' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
