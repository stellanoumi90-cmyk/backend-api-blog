const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API - Documentation',
      version: '1.0.0',
      description: 'API Backend pour la gestion d\'un blog - TAF1 INF222 EC1 (Développement Backend)',
      contact: {
        name: 'INF222 NOUMI DIPATEU ANGE STELLA',
        email: 'stellanoumi90@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    tags: [
      {
        name: 'Articles',
        description: 'Endpoints pour la gestion des articles de blog'
      }
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur', 'date', 'categorie'],
          properties: {
            id: {
              type: 'integer',
              description: 'Identifiant unique de l\'article',
              example: 1
            },
            titre: {
              type: 'string',
              description: 'Titre de l\'article',
              minLength: 3,
              maxLength: 200,
              example: 'Introduction au Node.js'
            },
            contenu: {
              type: 'string',
              description: 'Contenu complet de l\'article',
              minLength: 10,
              example: 'Node.js est un environnement d\'exécution JavaScript côté serveur...'
            },
            auteur: {
              type: 'string',
              description: 'Nom de l\'auteur',
              minLength: 2,
              maxLength: 100,
              example: 'Charles'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Date de publication (format YYYY-MM-DD)',
              example: '2026-03-18'
            },
            categorie: {
              type: 'string',
              description: 'Catégorie de l\'article',
              minLength: 2,
              maxLength: 50,
              example: 'Technologie'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tags associés à l\'article',
              example: ['nodejs', 'backend', 'javascript']
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création',
              example: '2026-03-18T10:30:00Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière mise à jour',
              example: '2026-03-18T15:45:00Z'
            }
          }
        },
        ArticleInput: {
          type: 'object',
          required: ['titre', 'contenu', 'auteur', 'date', 'categorie'],
          properties: {
            titre: {
              type: 'string',
              minLength: 3,
              maxLength: 200,
              example: 'Introduction au Node.js'
            },
            contenu: {
              type: 'string',
              minLength: 10,
              example: 'Node.js est un environnement d\'exécution JavaScript côté serveur...'
            },
            auteur: {
              type: 'string',
              minLength: 2,
              maxLength: 100,
              example: 'Charles'
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2026-03-18'
            },
            categorie: {
              type: 'string',
              minLength: 2,
              maxLength: 50,
              example: 'Technologie'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['nodejs', 'backend', 'javascript']
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Opération réussie'
            },
            data: {
              type: 'object'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
