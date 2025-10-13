const QRCode = require('qrcode');

const MAX_TEXT_LENGTH = 200;

async function generateQRCode(text) {
    try {
        // Générer le QR code en PNG buffer
        return await QRCode.toBuffer(text, {
            width: 300,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });
    } catch (error) {
        throw new Error(`Failed to generate QR code: ${error.message}`);
    }
}

async function qrHandler(req, res, text) {
    try {
        if (!text) {
            return res.status(400).send("Missing parameter: text is required");
        }

        if (text.length > MAX_TEXT_LENGTH) {
            return res.status(400).send(`Text is too long. Maximum ${MAX_TEXT_LENGTH} characters.`);
        }

        const qrBuffer = await generateQRCode(text);

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(qrBuffer);

    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send(`Failed to generate QR code`);
    }
}

module.exports = qrHandler;