const sharp = require("sharp");
const axios = require("axios");
const log = require('loglevel');

const MAX_TEXT_LENGTH = 20;

/**
 * Downloads an image from a URL.
 * @param {string} url - The URL of the image to download
 * @returns {Promise<Buffer>} A buffer containing the downloaded image data
 * @throws {Error} If the download fails or times out
 */
async function downloadImage(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            timeout: 10000,
            maxContentLength: 10 * 1024 * 1024 // 10MB max
        });
        return Buffer.from(response.data);
    } catch (error) {
        log.error('Failed to download image:', error.message);
        throw new Error(`Failed to download image: ${error.message}`);
    }
}

/**
 * Creates a meme by adding text overlays to an image.
 * Text is displayed in meme-style format with white text and black stroke.
 * @param {Buffer} imageBuffer - The source image as a buffer
 * @param {string} [topText] - Optional text to display at the top of the image
 * @param {string} [bottomText] - Optional text to display at the bottom of the image
 * @returns {Promise<Buffer>} A PNG image buffer with text overlays
 */
async function createMeme(imageBuffer, topText, bottomText) {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    const fontSize = Math.min(width, height) / 10;
    const strokeWidth = fontSize / 15;
    const padding = fontSize / 2;

    let svgOverlays = [];

    if (topText) {
        const topSvg = `
        <svg width="${width}" height="${height}">
            <style>
                .meme-text {
                    fill: white;
                    font-size: ${fontSize}px;
                    font-family: Impact, Arial Black, sans-serif;
                    font-weight: bold;
                    text-transform: uppercase;
                    stroke: black;
                    stroke-width: ${strokeWidth}px;
                    paint-order: stroke;
                }
            </style>
            <text x="50%" y="${padding + fontSize}" 
                  text-anchor="middle" 
                  class="meme-text">
                ${topText}
            </text>
        </svg>`;
        svgOverlays.push({ input: Buffer.from(topSvg), top: 0, left: 0 });
    }

    if (bottomText) {
        const bottomSvg = `
        <svg width="${width}" height="${height}">
            <style>
                .meme-text {
                    fill: white;
                    font-size: ${fontSize}px;
                    font-family: Impact, Arial Black, sans-serif;
                    font-weight: bold;
                    text-transform: uppercase;
                    stroke: black;
                    stroke-width: ${strokeWidth}px;
                    paint-order: stroke;
                }
            </style>
            <text x="50%" y="${height - padding}" 
                  text-anchor="middle" 
                  class="meme-text">
                ${bottomText}
            </text>
        </svg>`;
        svgOverlays.push({ input: Buffer.from(bottomSvg), top: 0, left: 0 });
    }

    return await image
        .composite(svgOverlays)
        .png()
        .toBuffer();
}

/**
 * Handles HTTP requests for meme generation.
 * Validates the image URL and text parameters, downloads the image, and generates a meme.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {string} imageUrl - The URL of the image to create a meme from
 * @param {string} [topText] - Optional text for the top of the meme (max 20 characters)
 * @param {string} [bottomText] - Optional text for the bottom of the meme (max 20 characters)
 */
async function memeHandler(req, res, imageUrl, topText, bottomText) {
    try {
        if (!imageUrl) {
            log.warn('Missing parameter: image URL is required');
            return res.status(400).send("Missing parameter: image URL is required");
        }

        try {
            new URL(imageUrl);
        } catch (e) {
            log.warn('Invalid image URL format:', imageUrl);
            return res.status(400).send("Invalid image URL format");
        }

        if (topText && topText.length > MAX_TEXT_LENGTH) {
            log.warn('Top text is too long:', topText.length);
            return res.status(400).send(`Top text is too long. Maximum ${MAX_TEXT_LENGTH} characters.`);
        }

        if (bottomText && bottomText.length > MAX_TEXT_LENGTH) {
            log.warn('Bottom text is too long:', bottomText.length);
            return res.status(400).send(`Bottom text is too long. Maximum ${MAX_TEXT_LENGTH} characters.`);
        }

        const imageBuffer = await downloadImage(imageUrl);
        const memeBuffer = await createMeme(imageBuffer, topText, bottomText);

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(memeBuffer);

    } catch (error) {
        log.error('Error generating meme:', error);
        res.status(500).send(`Failed to generate meme`);
    }
}

module.exports = memeHandler;