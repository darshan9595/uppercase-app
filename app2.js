// Importer le module Express
const express = require('express');
const app = express();
const PORT = 4001; // Port différent pour le deuxième service

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route POST pour renverser une chaîne de caractères
app.post('/api/reverse', (req, res) => {
    const { text } = req.body;

    // Vérifiez si le champ "text" est fourni
    if (!text) {
        return res.status(400).json({ error: "Veuillez fournir 'text' dans le corps de la requête." });
    }

    // Renverser la chaîne de caractères
    const reversedText = text.split('').reverse().join('');

    // Envoyer la réponse
    res.json({
        original: text,
        reversed: reversedText
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Reverse service démarré sur http://127.0.0.1:${PORT}`);
});
