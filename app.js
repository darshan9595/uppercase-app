const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// Endpoint pour mettre les données en majuscules
app.post('/api/uppercase', (req, res) => {
    const { nom, prenom } = req.body;

    if (!nom || !prenom) {
        return res.status(400).json({ error: "Veuillez fournir 'nom' et 'prenom'." });
    }

    const uppercaseData = {
        nom: nom.toUpperCase(),
        prenom: prenom.toUpperCase(),
    };

    res.json(uppercaseData);
});

app.listen(PORT, () => {
    console.log(`Service 1 démarré sur http://127.0.0.1:${PORT}`);
});
