# Bonne-Pratique-Dev

---

## 📖 Table of contents


1. [**📚 About the project**](#-about-the-project)
2. [**🚀 How to run the project**](#-how-to-run-the-project)
3. [**💻 Technologies**](#-technologies)
4. [**🎬 Presentation**](#-presentation)
5. [**👥 Credits**](#-credits)

---

## 📚 About the project

This project is a simple and modular Node.js API built with Express.js, designed to dynamically generate and serve various types of images through different endpoints. It demonstrates how to handle HTTP requests, manage parameters, and perform image processing efficiently.

The API provides the following features:

- Placeholder Generator — Creates customizable placeholder images based on width and height.

- Gradient Generator — Generates gradient backgrounds using two colors and an orientation (axis).

- Avatar Generator — Produces personalized avatars from a given name.

- QR Code Generator — Converts text into scannable QR codes.

- Meme Generator — Adds top and bottom text to an existing image to create memes.

Each feature is handled by a dedicated route, making the code easy to maintain and extend.
Environment variables (via Dotenv) are used to configure the server port and other potential settings securely.

---

## 🚀 How to run the project

To run the project, you will need to have npm installed on your ide.

1. Clone the repository:
```bash
git clone https://github.com/Minjxxe8/Bonne-Pratique-Dev.git
node server.js
```

2. Open your browser and go to `http://localhost:3000/`, then add the desired route to access a specific feature.

---

## 💻 Librairies

The project was developed using the following technologies:
- [Express Js](https://expressjs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Sharp](https://www.npmjs.com/package/sharp)
- [Qr Code](https://www.npmjs.com/package/qrcode)

---

## 👥 Credits

This project was developed by:
<br>
<a href="https://github.com/Oiha-dev"><img src="https://avatars.githubusercontent.com/u/115953539" alt="Gauthier Cenes" width="69" height="69"/></a>
<img style="height:auto;" alt="" src="https://avatars.githubusercontent.com/u/137718998?v=4" width="69" height="69" class="avatar avatar-user width-full border color-bg-default">

The font used in the project is [Chalkboard](https://www.dafont.com/neat-chalk.font) by [Darrell Flood](https://www.hawtpixel.com).<br>
You can find the background image [here](https://unsplash.com/fr/photos/un-tableau-noir-avec-un-tableau-noir-et-des-crayons-de-couleur-065tsEqQj6Y).