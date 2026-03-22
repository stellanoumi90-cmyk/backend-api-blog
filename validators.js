const { body } = require('express-validator');

exports.articleValidationRules = () => {
  return [
    body('titre')
      .trim()
      .notEmpty()
      .withMessage('Le titre est obligatoire')
      .isLength({ min: 3, max: 200 })
      .withMessage('Le titre doit contenir entre 3 et 200 caractères'),

    body('contenu')
      .trim()
      .notEmpty()
      .withMessage('Le contenu est obligatoire')
      .isLength({ min: 10 })
      .withMessage('Le contenu doit contenir au moins 10 caractères'),

    body('auteur')
      .trim()
      .notEmpty()
      .withMessage('L\'auteur est obligatoire')
      .isLength({ min: 2, max: 100 })
      .withMessage('Le nom de l\'auteur doit contenir entre 2 et 100 caractères'),

    body('date')
      .notEmpty()
      .withMessage('La date est obligatoire')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Le format de la date doit être YYYY-MM-DD'),

    body('categorie')
      .trim()
      .notEmpty()
      .withMessage('La catégorie est obligatoire')
      .isLength({ min: 2, max: 50 })
      .withMessage('La catégorie doit contenir entre 2 et 50 caractères'),

    body('tags')
      .optional()
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(tag => typeof tag === 'string' && tag.trim().length > 0);
        }
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }
        return false;
      })
      .withMessage('Les tags doivent être un tableau de chaînes ou une chaîne de caractères')
  ];
};

exports.articleUpdateValidationRules = () => {
  return [
    body('titre')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Le titre doit contenir entre 3 et 200 caractères'),

    body('contenu')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Le contenu doit contenir au moins 10 caractères'),

    body('auteur')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Le nom de l\'auteur doit contenir entre 2 et 100 caractères'),

    body('date')
      .optional()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Le format de la date doit être YYYY-MM-DD'),

    body('categorie')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('La catégorie doit contenir entre 2 et 50 caractères'),

    body('tags')
      .optional()
      .custom((value) => {
        if (Array.isArray(value)) {
          return value.every(tag => typeof tag === 'string' && tag.trim().length > 0);
        }
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }
        return false;
      })
      .withMessage('Les tags doivent être un tableau de chaînes ou une chaîne de caractères')
  ];
};
