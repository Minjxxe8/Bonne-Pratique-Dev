require('dotenv').config();

const express = require('express');
const app = express();
const gradientHandler = require('./routes/gradient');
const avatarHandler = require('./routes/avatar');
const qrHandler = require('./routes/qr');
const memeHandler = require('./routes/meme');

app.get('/placeholder/:width/:height', (req, res) => {
    //The logic for generating a placeholder image
    res.send()
})

app.get('/gradient', (req, res) => {
    const height = parseInt(req.query.height);
    const width = parseInt(req.query.width);
    const color1 = req.query.color1;
    const color2 = req.query.color2;
    const axis = req.query.axis;

    gradientHandler(req, res, height, width, color1, color2, axis);
})

app.get('/avatar/:name', (req, res) => {
    const name = req.params.name;
    avatarHandler(req, res, name);
})

app.get('/qr/:text', (req, res) => {
    const text = req.params.text;
    qrHandler(req, res, text);
})

app.get('/meme', (req, res) => {
    const image = req.query.image;
    const top_text = req.query.top_text;
    const bottom_text = req.query.bottom_text;
    memeHandler(req, res, image, top_text, bottom_text);
})

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});