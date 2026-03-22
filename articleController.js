const Article = require('../models/Article');
const { validationResult } = require('express-validator');

exports.createArticle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const articleData = req.body;

  Article.create(articleData, (err, article) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de l\'article',
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: article
    });
  });
};

exports.getAllArticles = (req, res) => {
  const filters = {
    categorie: req.query.categorie,
    auteur: req.query.auteur,
    date: req.query.date
  };

  Article.findAll(filters, (err, articles) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des articles',
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  });
};

exports.getArticleById = (req, res) => {
  const { id } = req.params;

  Article.findById(id, (err, article) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'article',
        error: err.message
      });
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: article
    });
  });
};

exports.updateArticle = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { id } = req.params;
  const articleData = req.body;

  Article.update(id, articleData, (err, article) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de l\'article',
        error: err.message
      });
    }

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: article
    });
  });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression de l\'article',
        error: err.message
      });
    }

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Article supprimé avec succès',
      data: result
    });
  });
};

exports.searchArticles = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Le paramètre de recherche "query" est requis'
    });
  }

  Article.search(query, (err, articles) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la recherche d\'articles',
        error: err.message
      });
    }

    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  });
};
