import sharp from "sharp";

async function createImage(width, height) {
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

    const outputBuffer = await image
        .composite([{ input: Buffer.from(svg) }])
        .png()
        .toBuffer();

    return `data:image/webp;base64,${outputBuffer.toString('base64')}`;
}