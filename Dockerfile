# Étape 1 : Image de base
FROM node:18

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires pour les dépendances
COPY package*.json ./ 

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier uniquement le fichier spécifique au Service 1
COPY app.js ./  

# Étape 6 : Exposer le port utilisé par le Service 1
EXPOSE 4000

# Étape 7 : Commande pour démarrer l'application
CMD ["node", "app.js"]
