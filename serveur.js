const express = require('express');
const app = express();
const port = 7000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour restreindre l'accès pendant les heures de travail
app.use((req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 pour dimanche, 1 pour lundi, ..., 6 pour samedi
    const hour = now.getHours(); // Heure actuelle

    // Vérifie si le jour est du lundi au vendredi (1 à 5) et l'heure entre 9h et 17h
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Passe à la route suivante
    } else {
        // Affiche un message ou une page EJS pour les accès restreints
        res.send( 
             'L\'application n\'est disponible que pendant les heures de travail : du lundi au vendredi, de 9h à 17h.'
        );
    }
});

// Routes
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/service', (req, res) => {
    res.render('service');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
