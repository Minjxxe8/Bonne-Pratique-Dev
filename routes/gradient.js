function gradientHandler(req, res, height, width, color1, color2, axis) {
    try {
        if (!height || !width || !color1 || !color2) {
            throw new Error("Missing parameters: " + JSON.stringify(req.query));
        }
        if (axis.toLowerCase() !== 'x' && axis.toLowerCase() !== 'y') {
            throw new Error("Invalid axis parameter, must be 'x' or 'y'");
        }
        const hexRegex = /^[0-9A-Fa-f]{6}$/;
        if (!hexRegex.test(color1) || !hexRegex.test(color2)) {
            throw new Error("Invalid color format, must be a 6-digit hex code");
        }
        if (height <= 0 || width <= 0) {
            throw new Error("Height and width must be positive integers");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = gradientHandler;