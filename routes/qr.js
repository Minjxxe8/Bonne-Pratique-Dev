const QRCode = require('qrcode');
const log = require('loglevel');

const MAX_TEXT_LENGTH = 200;

/**
 * Generates a QR code from text.
 * Creates a 300x300 pixel QR code with black and white colors.
 * @param {string} text - The text to encode in the QR code
 * @returns {Promise<Buffer>} A PNG image buffer of the QR code
 * @throws {Error} If QR code generation fails
 */
async function generateQRCode(text) {
    try {
        return await QRCode.toBuffer(text, {
            width: 300,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });
    } catch (error) {
        log.error('Failed to generate QR code:', error.message);
        throw new Error(`Failed to generate QR code: ${error.message}`);
    }
}

/**
 * Handles HTTP requests for QR code generation.
 * Validates the text parameter and generates a QR code image.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {string} text - The text to encode in the QR code (max 200 characters)
 */
async function qrHandler(req, res, text) {
    try {
        if (!text) {
            log.warn('Missing parameter: text is required');
            return res.status(400).send("Missing parameter: text is required");
        }

        if (text.length > MAX_TEXT_LENGTH) {
            log.warn('Text is too long:', text.length);
            return res.status(400).send(`Text is too long. Maximum ${MAX_TEXT_LENGTH} characters.`);
        }

        const qrBuffer = await generateQRCode(text);

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(qrBuffer);

    } catch (error) {
        log.error('Error generating QR code:', error);
        res.status(500).send(`Failed to generate QR code`);
    }
}

module.exports = qrHandler;
module.exports.generateQRCode = generateQRCode;
