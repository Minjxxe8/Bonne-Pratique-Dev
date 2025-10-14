# Bonne-Pratique-Dev

##  Table of contents


1. [**About the project**](#-about-the-project)
2. [**How to run the project**](#-how-to-run-the-project)
3. [**API Routes**](#-api-routes)
4. [**Technologies**](#-technologies)
5. [**Presentation**](#-presentation)
6. [**Credits**](#-credits)

## About the project

This project use Node.js and Express.js, to dynamically generate and serve various types of images through different endpoints. It handle HTTP requests, manage parameters, and perform image processing efficiently.

The API provides the following features:

- Placeholder Generator (Creates customizable placeholder images based on width and height).

- Gradient Generator (Generates gradient backgrounds using two colors and an orientation (axis)).

- Avatar Generator (Produces personalized avatars from a given name).

- QR Code Generator (Converts text into scannable QR codes).

- Meme Generator (Adds top and bottom text to an existing image to create memes).

## How to run the project

To run the project, you will need to have npm installed.

1. Clone the repository:
```bash
git clone https://github.com/Minjxxe8/Bonne-Pratique-Dev.git
npm install
npm run start
```

2. Open your browser and go to `http://localhost:3000/`, then add the route to access a specific feature.

## API Routes

### 1. Placeholder Generator

Generates a placeholder image with specified dimensions and displays the size as text.

**Endpoint:** `GET /placeholder/:width/:height`

**Parameters:**
- `width` (path parameter): Width of the image (1-5000 pixels)
- `height` (path parameter): Height of the image (1-5000 pixels)

**Example:**
```
http://localhost:3000/placeholder/800/600
```

**Response:** PNG image with gray background showing "800 x 600" text

---

### 2. Gradient Generator

Creates a gradient image transitioning between two colors.

**Endpoint:** `GET /gradient`

**Query Parameters:**
- `width`: Width of the image (1-5000 pixels)
- `height`: Height of the image (1-5000 pixels)
- `color1`: Starting color (6-digit hex code without #)
- `color2`: Ending color (6-digit hex code without #)
- `axis`: Gradient direction - "x" for horizontal, "y" for vertical

**Example:**
```
http://localhost:3000/gradient?width=800&height=600&color1=FF0000&color2=0000FF&axis=x
```

**Response:** PNG image with gradient from red to blue horizontally

---

### 3. Avatar Generator

Generates a personalized avatar with initials on a colored background.

**Endpoint:** `GET /avatar/:name`

**Parameters:**
- `name` (path parameter): Name to generate avatar from (4-100 characters)
  - For camelCase names (e.g., "johnDoe"), extracts first letter of each part ("JD")
  - For other names, uses first two characters

**Example:**
```
http://localhost:3000/avatar/johnDoe
```

**Response:** 200x200 PNG avatar with "JD" initials on a colored circle

---

### 4. QR Code Generator

Converts text into a scannable QR code image.

**Endpoint:** `GET /qr/:text`

**Parameters:**
- `text` (path parameter): Text to encode (max 200 characters)

**Example:**
```
http://localhost:3000/qr/https://github.com
```

**Response:** 300x300 PNG QR code image

---

### 5. Meme Generator

Adds top and bottom text to an existing image to create a meme.

**Endpoint:** `GET /meme`

**Query Parameters:**
- `image`: URL of the image to use
- `top_text` (optional): Text for the top of the meme (max 20 characters)
- `bottom_text` (optional): Text for the bottom of the meme (max 20 characters)

**Example:**
```
http://localhost:3000/meme?image=https://example.com/image.jpg&top_text=HELLO&bottom_text=WORLD
```

**Response:** PNG image with Impact font text overlays in white with black stroke

---

## Librairies

The project was developed using the following technologies:
- [Express Js](https://expressjs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Sharp](https://www.npmjs.com/package/sharp)
- [Qr Code](https://www.npmjs.com/package/qrcode)

## Credits

This project was developed by:
<br>
<a href="https://github.com/Oiha-dev"><img src="https://avatars.githubusercontent.com/u/115953539" alt="Gauthier Cenes" width="69" height="69"/></a>
<img style="height:auto;" alt="" src="https://avatars.githubusercontent.com/u/137718998?v=4" width="69" height="69" class="avatar avatar-user width-full border color-bg-default">
