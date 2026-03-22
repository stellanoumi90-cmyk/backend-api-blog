# API Backend Blog - TAF1 INF222 EC1

API REST complète pour la gestion d'un blog développée dans le cadre du TAF1 - INF222 (Développement Backend : Programmation Web).

## Description

Cette API permet de gérer un blog avec des fonctionnalités CRUD complètes pour les articles. Chaque article contient un titre, un contenu, un auteur, une date, une catégorie et des tags.

## Technologies Utilisées

- **Node.js** : Environnement d'exécution JavaScript
- **Express** : Framework web pour Node.js
- **SQLite** : Base de données relationnelle légère
- **Swagger** : Documentation interactive de l'API
- **express-validator** : Validation des données
- **CORS** : Gestion des requêtes cross-origin

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (Node Package Manager)

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd blog-api-backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
npm start
```

Ou en mode développement avec rechargement automatique :

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## Structure du Projet

```
blog-api-backend/
├── config/
│   ├── database.js          # Configuration de la base de données SQLite
│   └── swagger.js            # Configuration de Swagger
├── controllers/
│   └── articleController.js  # Logique métier pour les articles
├── models/
│   └── Article.js            # Modèle de données Article
├── routes/
│   └── articles.js           # Définition des routes API
├── middlewares/
│   └── validators.js         # Validation des données
├── app.js                    # Configuration de l'application Express
├── server.js                 # Point d'entrée du serveur
├── package.json              # Dépendances et scripts
├── .gitignore                # Fichiers à ignorer par Git
└── README.md                 # Documentation du projet
```

## Documentation API

Une fois le serveur lancé, accédez à la documentation interactive Swagger :

**URL** : `http://localhost:3000/api-docs`

Vous pouvez également télécharger la spécification Swagger au format JSON :

**URL** : `http://localhost:3000/swagger.json`

## Endpoints Disponibles

### 1. Créer un article

**Endpoint** : `POST /api/articles`

**Description** : Crée un nouvel article de blog

**Body (JSON)** :
```json
{
  "titre": "Introduction au Node.js",
  "contenu": "Node.js est un environnement d'exécution JavaScript côté serveur...",
  "auteur": "Charles",
  "date": "2026-03-18",
  "categorie": "Technologie",
  "tags": ["nodejs", "backend", "javascript"]
}
```

**Réponse (201 Created)** :
```json
{
  "success": true,
  "message": "Article créé avec succès",
  "data": {
    "id": 1,
    "titre": "Introduction au Node.js",
    "contenu": "Node.js est un environnement d'exécution JavaScript côté serveur...",
    "auteur": "Charles",
    "date": "2026-03-18",
    "categorie": "Technologie",
    "tags": ["nodejs", "backend", "javascript"]
  }
}
```

### 2. Récupérer tous les articles

**Endpoint** : `GET /api/articles`

**Description** : Récupère la liste de tous les articles avec possibilité de filtrer

**Paramètres de requête (optionnels)** :
- `categorie` : Filtrer par catégorie
- `auteur` : Filtrer par auteur
- `date` : Filtrer par date (format YYYY-MM-DD)

**Exemples** :
```
GET /api/articles
GET /api/articles?categorie=Technologie
GET /api/articles?auteur=Charles
GET /api/articles?categorie=Technologie&date=2026-03-18
```

**Réponse (200 OK)** :
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "titre": "Introduction au Node.js",
      "contenu": "...",
      "auteur": "Charles",
      "date": "2026-03-18",
      "categorie": "Technologie",
      "tags": ["nodejs", "backend"],
      "created_at": "2026-03-18T10:30:00Z",
      "updated_at": "2026-03-18T10:30:00Z"
    }
  ]
}
```

### 3. Récupérer un article par ID

**Endpoint** : `GET /api/articles/:id`

**Description** : Récupère les détails d'un article spécifique

**Exemple** :
```
GET /api/articles/1
```

**Réponse (200 OK)** :
```json
{
  "success": true,
  "data": {
    "id": 1,
    "titre": "Introduction au Node.js",
    "contenu": "...",
    "auteur": "Charles",
    "date": "2026-03-18",
    "categorie": "Technologie",
    "tags": ["nodejs", "backend"],
    "created_at": "2026-03-18T10:30:00Z",
    "updated_at": "2026-03-18T10:30:00Z"
  }
}
```

**Réponse (404 Not Found)** :
```json
{
  "success": false,
  "message": "Article non trouvé"
}
```

### 4. Mettre à jour un article

**Endpoint** : `PUT /api/articles/:id`

**Description** : Modifie les informations d'un article existant

**Body (JSON)** :
```json
{
  "titre": "Introduction avancée au Node.js",
  "contenu": "Node.js est un environnement performant...",
  "auteur": "Charles",
  "date": "2026-03-19",
  "categorie": "Développement",
  "tags": ["nodejs", "backend", "avancé"]
}
```

**Réponse (200 OK)** :
```json
{
  "success": true,
  "message": "Article mis à jour avec succès",
  "data": {
    "id": 1,
    "titre": "Introduction avancée au Node.js",
    "contenu": "...",
    "auteur": "Charles",
    "date": "2026-03-19",
    "categorie": "Développement",
    "tags": ["nodejs", "backend", "avancé"],
    "created_at": "2026-03-18T10:30:00Z",
    "updated_at": "2026-03-19T14:20:00Z"
  }
}
```

### 5. Supprimer un article

**Endpoint** : `DELETE /api/articles/:id`

**Description** : Supprime un article de la base de données

**Exemple** :
```
DELETE /api/articles/1
```

**Réponse (200 OK)** :
```json
{
  "success": true,
  "message": "Article supprimé avec succès",
  "data": {
    "deleted": true,
    "id": 1
  }
}
```

### 6. Rechercher des articles

**Endpoint** : `GET /api/articles/search?query=texte`

**Description** : Recherche des articles dont le titre ou le contenu contient le texte spécifié

**Exemple** :
```
GET /api/articles/search?query=Node.js
```

**Réponse (200 OK)** :
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "titre": "Introduction au Node.js",
      "contenu": "...",
      "auteur": "Charles",
      "date": "2026-03-18",
      "categorie": "Technologie",
      "tags": ["nodejs", "backend"]
    }
  ]
}
```

## Codes de Statut HTTP

| Code | Description |
|------|-------------|
| 200  | Requête réussie (OK) |
| 201  | Ressource créée avec succès (Created) |
| 400  | Requête mal formée (Bad Request) |
| 404  | Ressource non trouvée (Not Found) |
| 500  | Erreur interne du serveur (Internal Server Error) |

## Validation des Données

L'API utilise `express-validator` pour valider toutes les données entrantes :

### Règles de validation pour la création d'article :

- **titre** : obligatoire, entre 3 et 200 caractères
- **contenu** : obligatoire, minimum 10 caractères
- **auteur** : obligatoire, entre 2 et 100 caractères
- **date** : obligatoire, format YYYY-MM-DD
- **categorie** : obligatoire, entre 2 et 50 caractères
- **tags** : optionnel, tableau de chaînes ou chaîne de caractères

## Exemples d'Utilisation

### Avec cURL

#### Créer un article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Mon premier article",
    "contenu": "Ceci est le contenu de mon premier article de blog.",
    "auteur": "Jean Dupont",
    "date": "2026-03-18",
    "categorie": "Général",
    "tags": ["premier", "test"]
  }'
```

#### Récupérer tous les articles
```bash
curl http://localhost:3000/api/articles
```

#### Récupérer un article spécifique
```bash
curl http://localhost:3000/api/articles/1
```

#### Rechercher des articles
```bash
curl "http://localhost:3000/api/articles/search?query=Node.js"
```

### Avec JavaScript (Fetch API)

```javascript
// Créer un article
fetch('http://localhost:3000/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titre: "Mon article",
    contenu: "Contenu de l'article...",
    auteur: "Jean",
    date: "2026-03-18",
    categorie: "Tech",
    tags: ["nodejs", "api"]
  })
})
  .then(response => response.json())
  .then(data => console.log(data));

// Récupérer tous les articles
fetch('http://localhost:3000/api/articles')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Bonnes Pratiques Implémentées

- Séparation claire entre routes, contrôleurs et modèles (architecture MVC)
- Validation des entrées utilisateurs
- Utilisation des codes HTTP appropriés
- Gestion des erreurs centralisée
- Documentation complète avec Swagger
- Support CORS pour les requêtes cross-origin
- Messages d'erreur explicites
- Base de données SQLite pour la persistance

## Sécurité

- Validation stricte de toutes les entrées utilisateurs
- Protection contre les injections SQL via les requêtes paramétrées
- Gestion appropriée des erreurs sans exposer d'informations sensibles

## Tests

Pour tester l'API, vous pouvez utiliser :

1. **Swagger UI** : `http://localhost:3000/api-docs` (recommandé)
2. **Postman** : Importez le fichier `swagger.json`
3. **cURL** : Voir les exemples ci-dessus
4. **Navigateur** : Pour les requêtes GET uniquement

## Dépôt GitHub

Le code source complet est disponible sur GitHub :

**URL** : `https://github.com/stellanoumi90-cmyk/backend-api-blog

## Auteur

Développé dans le cadre du TAF1 - INF222 EC1 (Développement Backend : Programmation Web)
Proposé par Charles Njiosseu, PhD Student

## Licence

MIT License

## Support

Pour toute question ou problème, veuillez consulter la documentation Swagger ou créer une issue sur le dépôt GitHub.

---

**Note** : Cette API est développée à des fins éducatives dans le cadre d'un travail académique universitaire.
