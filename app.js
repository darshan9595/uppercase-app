// Importer le module Express
const express = require('express');
const app = express();
const PORT = 4000; // Vérifiez que le port est 4000 si vous utilisez cette URL

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route POST pour traiter le nom et le prénom
app.post('/api/uppercase', (req, res) => {
    const { nom, prenom } = req.body;

    // Vérifiez si les champs "nom" et "prenom" sont fournis
    if (!nom || !prenom) {
        return res.status(400).json({ error: "Veuillez fournir 'nom' et 'prenom'." });
    }

    // Convertir en majuscules
    const nomUpper = nom.toUpperCase();
    const prenomUpper = prenom.toUpperCase();

    // Envoyer la réponse
    res.json({
        nom: nomUpper,
        prenom: prenomUpper
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://127.0.0.1:${PORT}`);
});
