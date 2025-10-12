function qrHandler(req, res, text) {
    try {
        if(!text) {
            throw new Error("Missing text parameter");
        }
        if (text.length <= 0) {
            throw new Error("Missing text parameter");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
    if (text.startsWith('http://') || text.startsWith('https://')) {
        return text;
    }
    return `https://${text}`;
}

module.exports = qrHandler;