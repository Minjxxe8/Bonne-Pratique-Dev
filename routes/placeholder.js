const sharp = require("sharp");
const log = require('loglevel');

const MAX_DIMENSION = 5000;

async function createImage(width, height) {
    log.debug('Creating placeholder image with dimensions:', { width, height });
    const image = await sharp({
        create: {
            width,
            height,
            channels: 3,
            background: {r: 128, g: 128, b: 128}
        }
    })

    const text = `${width} x ${height}`;
    const fontSize = Math.min(width, height) / 5;
    const strokeSize = fontSize / 10;

    const svg = `
  <svg width="${width}" height="${height}">
    <style>
      .title {
        fill: white;
        font-size: ${fontSize}px;
        font-family: "sans-serif";
        font-weight: bold;
        stroke: dimgray;
        stroke-width: ${strokeSize}px;
        paint-order: stroke;
      }
    </style>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title">
      ${text}
    </text>
  </svg>`;

    return await image
        .composite([{ input: Buffer.from(svg) }])
        .png()
        .toBuffer();
}

async function placeholderHandler(req, res, width, height) {
    try {
        const parsedWidth = parseInt(width);
        if (isNaN(parsedWidth) || parsedWidth <= 0 || parsedWidth > MAX_DIMENSION) {
            log.warn('Invalid width parameter:', width);
            return res.status(400).send(`Invalid width parameter. Must be a positive number between 1 and ${MAX_DIMENSION}.`);
        }

        const parsedHeight = parseInt(height);
        if (isNaN(parsedHeight) || parsedHeight <= 0 || parsedHeight > MAX_DIMENSION) {
            log.warn('Invalid height parameter:', height);
            return res.status(400).send(`Invalid height parameter. Must be a positive number between 1 and ${MAX_DIMENSION}.`);
        }

        const imageData = await createImage(parsedWidth, parsedHeight);

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(imageData);

    } catch (error) {
        log.error('Error generating placeholder image:', error);
        res.status(500).send('Failed to generate placeholder image');
    }
}

module.exports = placeholderHandler;
