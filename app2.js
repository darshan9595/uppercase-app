const express = require('express');
const app = express();
const axios = require('axios');
const { Client } = require('pg'); // Import the pg library
const PORT = 5000;

app.use(express.json());

const dbClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'apapa',
    port: 5432,
});

dbClient.connect();

app.post('/api/process', async (req, res) => {
    const { nom, prenom } = req.body;

    if (!nom || !prenom) {
        return res.status(400).json({ error: "Veuillez fournir 'nom' et 'prenom'." });
    }

    const processedData = `Nom: ${nom}, Prénom: ${prenom}`;
    
    try {
        // Save data to PostgreSQL database
        const query = 'INSERT INTO mytable (nom, prenom) VALUES ($1, $2)';
        await dbClient.query(query, [nom, prenom]);
        res.json({ message: 'Données traitées et enregistrées avec succès', data: processedData });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données:', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données' });
    }
});

// Fonction pour envoyer des données à app.js et enregistrer la réponse
const sendDataToApp1 = async () => {
    const data = {
        nom: 'Doe',
        prenom: 'John'
    };

    try {
        const response = await axios.post('http://127.0.0.1:4000/api/uppercase', data);
        console.log('Réponse de app.js:', response.data);

        // Save app.js response to PostgreSQL database
        const query = 'INSERT INTO mytable (nom, prenom) VALUES ($1, $2)';
        await dbClient.query(query, [response.data.nom, response.data.prenom]);
        console.log('Réponse de app.js enregistrée dans la base de données');
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données à app.js:', error);
    }
};

// Démarrer le serveur et envoyer les données une fois que le serveur est prêt
app.listen(PORT, () => {
    console.log(`Serveur app2.js démarré sur http://127.0.0.1:${PORT}`);
    sendDataToApp1(); // Envoyer les données à app.js après le démarrage du serveur
});
