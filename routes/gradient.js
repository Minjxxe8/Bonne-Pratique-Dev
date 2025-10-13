const sharp = require("sharp");
const log = require('loglevel');

const MAX_DIMENSION = 5000;

function hexToRgb(hex) {
    log.debug('Converting hex to RGB:', hex);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

async function createGradient(width, height, color1, color2, axis) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const isHorizontal = axis.toLowerCase() === 'x';

    const svg = `
    <svg width="${width}" height="${height}">
        <defs>
            <linearGradient id="gradient" x1="${isHorizontal ? '0%' : '50%'}" y1="${isHorizontal ? '50%' : '0%'}" 
                            x2="${isHorizontal ? '100%' : '50%'}" y2="${isHorizontal ? '50%' : '100%'}">
                <stop offset="0%" style="stop-color:rgb(${rgb1.r},${rgb1.g},${rgb1.b});stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(${rgb2.r},${rgb2.g},${rgb2.b});stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#gradient)" />
    </svg>`;

    return await sharp(Buffer.from(svg))
        .png()
        .toBuffer();
}

async function gradientHandler(req, res, height, width, color1, color2, axis) {
    try {
        const parsedWidth = parseInt(width);
        const parsedHeight = parseInt(height);

        if (!height || !width || !color1 || !color2 || !axis) {
            log.warn('Missing parameters. Required: height, width, color1, color2, axis');
            return res.status(400).send("Missing parameters. Required: height, width, color1, color2, axis");
        }

        if (isNaN(parsedWidth) || parsedWidth <= 0 || parsedWidth > MAX_DIMENSION) {
            log.warn('Invalid width parameter:', width);
            return res.status(400).send(`Invalid width parameter. Must be a positive number between 1 and ${MAX_DIMENSION}.`);
        }

        if (isNaN(parsedHeight) || parsedHeight <= 0 || parsedHeight > MAX_DIMENSION) {
            log.warn('Invalid height parameter:', height);
            return res.status(400).send(`Invalid height parameter. Must be a positive number between 1 and ${MAX_DIMENSION}.`);
        }

        if (axis.toLowerCase() !== 'x' && axis.toLowerCase() !== 'y') {
            log.warn('Invalid axis parameter:', axis);
            return res.status(400).send("Invalid axis parameter, must be 'x' or 'y'");
        }

        const hexRegex = /^[0-9A-Fa-f]{6}$/;
        if (!hexRegex.test(color1) || !hexRegex.test(color2)) {
            log.warn('Invalid color format:', { color1, color2 });
            return res.status(400).send("Invalid color format, must be a 6-digit hex code (without #)");
        }

        const imageBuffer = await createGradient(parsedWidth, parsedHeight, color1, color2, axis);

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(imageBuffer);

    } catch (error) {
        log.error('Error generating gradient image:', error);
        res.status(500).send('Failed to generate gradient image');
    }
}

module.exports = gradientHandler;