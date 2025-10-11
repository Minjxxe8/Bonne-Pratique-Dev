/*
Routes :
Placeholder : L'user choisit une height et une width
Gradient : L'user choisit une height, width, color1 et color2 axe x (default) ou y
Avatar : L'user donne son nom et son prénom
QR : L'user donne un texte
Meme : L'user donne une image, un texte en haut et un texte en bas
*/

const express = require('express');
const app = express();

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

    res.send()
})

app.get('/avatar/:name', (req, res) => {
    res.send()
})

app.get('/qr/:text', (req, res) => {
    res.send()
})

app.get('/meme', (req, res) => {
    const image = parseInt(req.query.image);
    const top_text = parseInt(req.query.top_text);
    const bottom_text = req.query.bottom_text;
    res.send()
})