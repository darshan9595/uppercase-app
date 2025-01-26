
# Uppercase and Reverse App Project

## Description
Ce projet consiste en deux services Node.js qui effectuent des transformations de chaînes de caractères :

- Service 1 (`app.js`) : Transforme des noms et prénoms en majuscules.
- Service 2 (`app2.js`) : Inverse les chaînes de caractères envoyées.
- Les deux services communiquent via des appels HTTP.
- L’application est containerisée avec Docker et déployée à l'aide de Kubernetes.

## Structure du projet
Voici la structure des fichiers :

```
/uppercase-app/
├── app.js                   # Code du Service 1
├── app2.js                  # Code du Service 2
├── Dockerfile               # Dockerfile pour le Service 1
├── Dockerfile-service2      # Dockerfile pour le Service 2
├── deployment.yaml          # Déploiement Kubernetes pour le Service 1
├── deployment2.yaml         # Déploiement Kubernetes pour le Service 2
├── ingress.yaml             # Configuration Ingress Kubernetes
├── package.json             # Dépendances et scripts du projet
├── package-lock.json        # Verrouillage des versions des dépendances
├── service.yaml             # Service Kubernetes pour le Service 1
├── service2.yaml            # Service Kubernetes pour le Service 2
└── node_modules/            # Dépendances Node.js
```

## Prérequis
- Node.js (v14 ou plus récent)
- Docker (version récente)
- Kubernetes (minikube ou cluster actif)
- PostgreSQL (base de données configurée si nécessaire)

## Installation et exécution locale

### 1. Cloner le dépôt
```bash
git clone https://github.com/darshan9595/uppercase-app.git
cd uppercase-app
```

### 2. Installer les dépendances
Installez les dépendances listées dans `package.json` et `package-lock.json` pour les deux services :
```bash
npm install
```

### 3. Lancer les services
#### Service 1 (port 4000) :
```bash
npm run start-service1
```

#### Service 2 (port 4001) :
```bash
npm run start-service2
```

### 4. Tester les services
- Service 1 (uppercase) :
  - Endpoint : `POST http://127.0.0.1:4000/api/uppercase`
  - Exemple de body JSON :
    ```json
    {
      "nom": "Dupont",
      "prenom": "Jean"
    }
    ```

- Service 2 (reverse) :
  - Endpoint : `POST http://127.0.0.1:4001/api/reverse`
  - Exemple de body JSON :
    ```json
    {
      "chaine": "Bonjour"
    }
    ```

## Utilisation avec Docker

### 1. Construire les images Docker
#### Service 1 :
```bash
docker build -t uppercase-app -f Dockerfile .
```

#### Service 2 :
```bash
docker build -t reverse-app -f Dockerfile-service2 .
```

### 2. Lancer les conteneurs
#### Service 1 :
```bash
docker run -p 4000:4000 uppercase-app
```

#### Service 2 :
```bash
docker run -p 4001:4001 reverse-app
```

## Déploiement avec Kubernetes

### 1. Créer les déploiements
```bash
kubectl apply -f deployment.yaml
kubectl apply -f deployment2.yaml
```

### 2. Créer les services
```bash
kubectl apply -f service.yaml
kubectl apply -f service2.yaml
```

### 3. Configurer Ingress
```bash
kubectl apply -f ingress.yaml
```

### 4. Accéder aux services
- Service 1 : `http://uppercase.local/api/uppercase`
- Service 2 : `http://reverse.local/api/reverse`

## Dépendances
Voici les principales dépendances utilisées :
- axios : Pour les appels HTTP entre les services.
- express : Framework web pour Node.js.
- pg : Bibliothèque pour interagir avec PostgreSQL (uniquement dans `app2.js`).

## Remarques
- Assurez-vous que votre cluster Kubernetes utilise un Ingress Controller (par ex. NGINX).
- Configurez votre fichier `/etc/hosts` pour mapper `uppercase.local` et `reverse.local` à `127.0.0.1` si vous utilisez Minikube.

## Auteur
Darshan Mistry
Thomas Tanguy
Hani Rekik