function memeHandler(req, res, image, top_text, bottom_text) {
    try {
        if (!image) {
            throw new Error("Missing parameters: image is required");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
    return `Meme with image = ${image}, top text = ${top_text}, and bottom text = ${bottom_text}`;
}

module.exports = memeHandler;