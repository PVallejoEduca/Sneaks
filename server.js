const express = require("express");
const SneaksAPI = require("sneaks-api");
const cors = require("cors");

const app = express();
const sneaks = new SneaksAPI();

app.use(cors());

// Endpoint para buscar zapatillas
app.get("/search/:query", (req, res) => {
    sneaks.getProducts(req.params.query, 10, (err, products) => {
        if (err) return res.status(500).json({ error: "Error al obtener datos" });
        res.json(products);
    });
});

// Endpoint para obtener precios de un modelo
app.get("/prices/:styleID", (req, res) => {
    sneaks.getProductPrices(req.params.styleID, (err, prices) => {
        if (err) return res.status(500).json({ error: "Error al obtener precios" });
        res.json(prices);
    });
});

// Iniciar servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
