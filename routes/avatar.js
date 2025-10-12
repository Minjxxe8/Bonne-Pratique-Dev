function avatarHandler(req, res, name) {
    try {
        if (!name) {
            throw new Error("Missing parameter: name");
        }
        if (name.length < 4 || name.length > 100) {
            throw new Error("Name length must be between 4 and 100 characters");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
    const match = name.slice(1).match(/[A-Z]/);
    if (match) {
        const index = match.index + 1;
        const parts = [name.slice(0, index), name.slice(index)];
        const avatar = parts.map(part => part[0]);
        return avatar.join('');
    }
    return name[0];
}

module.exports = avatarHandler;