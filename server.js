const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/exchange-rate', async (req, res) => {
    const API_KEY = "3899006bf7ec4a3808118707";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao obter cotação" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
