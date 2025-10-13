const sharp = require("sharp");

const MAX_NAME_LENGTH = 100;
const MIN_NAME_LENGTH = 4;
const AVATAR_SIZE = 200;

function getInitials(name) {
    const match = name.slice(1).match(/[A-Z]/);
    if (match) {
        const index = match.index + 1;
        const parts = [name.slice(0, index), name.slice(index)];
        const avatar = parts.map(part => part[0]);
        return avatar.join('');
    }
    return name.slice(0, 2);
}

function generateRandomColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    return { r, g, b };
}

async function createAvatar(name) {
    const initials = getInitials(name).toUpperCase();
    const color = generateRandomColor(name);
    const fontSize = AVATAR_SIZE / 2.5;

    const svg = `
    <svg width="${AVATAR_SIZE}" height="${AVATAR_SIZE}">
        <circle cx="${AVATAR_SIZE / 2}" cy="${AVATAR_SIZE / 2}" r="${AVATAR_SIZE / 2}" 
                fill="rgb(${color.r}, ${color.g}, ${color.b})" />
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" 
              font-size="${fontSize}" font-family="Arial, sans-serif" 
              font-weight="bold" fill="white">
            ${initials}
        </text>
    </svg>`;

    return await sharp(Buffer.from(svg))
        .png()
        .toBuffer();
}

async function avatarHandler(req, res, name) {
    try {
        if (!name) {
            return res.status(400).send("Missing parameter: name");
        }

        if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
            return res.status(400).send(`Name length must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters`);
        }

        const imageBuffer = await createAvatar(name);

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(imageBuffer);

    } catch (error) {
        console.error('Error generating avatar:', error);
        res.status(500).send('Failed to generate avatar');
    }
}

module.exports = avatarHandler;