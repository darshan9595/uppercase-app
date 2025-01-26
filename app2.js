const express = require('express');
const axios = require('axios');
const { Client } = require('pg');
const app = express();
const PORT = 4001;

app.use(express.json());

// Configuration PostgreSQL
const dbClient = new Client({
    user: 'postgres',
    //host: 'localhost',
    //host : 'db-postgresql', //utilisation pour docker/ Docker compose service 2 
    host : 'postgres-db',
    database: 'test',
    password: 'apapa',
    port: 5432,
});
dbClient.connect();

// Fonction pour inverser une chaîne de caractères
const reverseString = (str) => str.split('').reverse().join('');

// Endpoint pour recevoir et traiter les données
app.post('/api/reverse', async (req, res) => {
    const { nom, prenom } = req.body;

    if (!nom || !prenom) {
        return res.status(400).json({ error: "Veuillez fournir 'nom' et 'prenom'." });
    }

    try {
        // Étape 1 : Obtenir les données en majuscules depuis le Service 1
//const UPPERCASE_URL = process.env.UPPERCASE_URL || 'http://127.0.0.1:4000'; /*pour localhost
const UPPERCASE_URL = process.env.UPPERCASE_URL || 'http://uppercase-app:4000'; /*pour docker compose et donc service2 */


const uppercaseResponse = await axios.post(`${UPPERCASE_URL}/api/uppercase`, { nom, prenom });
const uppercaseData = uppercaseResponse.data;

        // Étape 2 : Générer les données inversées
        const reversedData = {
            nom: reverseString(nom),
            prenom: reverseString(prenom),
        };

        // Étape 3 : Insérer les données dans la base de données
        const query = 'INSERT INTO mytable (nom, prenom, nom_uppercase, prenom_uppercase, nom_reverse, prenom_reverse) VALUES ($1, $2, $3, $4, $5, $6)';
        await dbClient.query(query, [
            nom,
            prenom,
            uppercaseData.nom,
            uppercaseData.prenom,
            reversedData.nom,
            reversedData.prenom,
        ]);

        // Réponse au client
        res.json({
            message: 'Données traitées et enregistrées avec succès.',
            original: { nom, prenom },
            uppercase: uppercaseData,
            reversed: reversedData,
        });
    } catch (error) {
        console.error('Erreur lors du traitement des données :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

app.listen(PORT, () => {
    console.log(`Service 2 démarré sur http://127.0.0.1:${PORT}`);
});
