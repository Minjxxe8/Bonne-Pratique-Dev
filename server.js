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
    const height = parseInt(req.query.height) || 100;
    const width = parseInt(req.query.width) || 100;
    const color1 = req.query.color1 || '000000';
    const color2 = req.query.color2 || 'FFFFFF';
    const axis = req.query.axis || 'x';
    //The logic for generating a gradient image

    gradientHandler(req, res, height, width, color1, color2, axis);
    res.status(200).send("Gradient image can be generated");
})

app.get('/avatar/:name', (req, res) => {
    const name = req.params.name;
    const finale = avatarHandler(req, res, name);
    res.status(200).send(finale);
})

app.get('/qr/:text', (req, res) => {
    const text = req.params.text;
    qrHandler(req, res, text);
})

app.get('/meme', (req, res) => {
    const image = req.query.image || 'https://i.imgflip.com/1bij.jpg';
    const top_text = req.query.top_text;
    const bottom_text = req.query.bottom_text;
    const finaleMeme = memeHandler(req, res, image, top_text, bottom_text);
    res.status(200).send(finaleMeme);
})

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});