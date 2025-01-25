const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 4000;

app.use(express.json());

app.post('/api/uppercase', (req, res) => {
    const { nom, prenom } = req.body;

    if (!nom || !prenom) {
        return res.status(400).json({ error: "Veuillez fournir 'nom' et 'prenom'." });
    }

    const nomUpper = nom.toUpperCase();
    const prenomUpper = prenom.toUpperCase();

    res.json({
        nom: nomUpper,
        prenom: prenomUpper
    });
});

// Fonction pour envoyer des données à app2.js
const sendDataToApp2 = async () => {
    const data = {
        nom: 'Dupont',
        prenom: 'Jean'
    };

    try {
        const response = await axios.post('http://127.0.0.1:5000/api/process', data);
        console.log('Réponse de app2:', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données à app2:', error);
    }
};

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur app.js démarré sur http://127.0.0.1:${PORT}`);
});
