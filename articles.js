const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { articleValidationRules, articleUpdateValidationRules } = require('../middlewares/validators');

router.post('/articles', articleValidationRules(), articleController.createArticle);

router.get('/articles', articleController.getAllArticles);

router.get('/articles/search', articleController.searchArticles);

router.get('/articles/:id', articleController.getArticleById);

router.put('/articles/:id', articleUpdateValidationRules(), articleController.updateArticle);

router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
