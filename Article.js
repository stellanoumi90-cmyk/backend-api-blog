const db = require('../config/database');

class Article {
  static create(articleData, callback) {
    const { titre, contenu, auteur, date, categorie, tags } = articleData;
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

    const query = `
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [titre, contenu, auteur, date, categorie, tagsString], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...articleData });
      }
    });
  }

  static findAll(filters, callback) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (filters.categorie) {
      query += ' AND categorie = ?';
      params.push(filters.categorie);
    }

    if (filters.auteur) {
      query += ' AND auteur = ?';
      params.push(filters.auteur);
    }

    if (filters.date) {
      query += ' AND date = ?';
      params.push(filters.date);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const articles = rows.map(row => ({
          ...row,
          tags: row.tags ? row.tags.split(',') : []
        }));
        callback(null, articles);
      }
    });
  }

  static findById(id, callback) {
    const query = 'SELECT * FROM articles WHERE id = ?';

    db.get(query, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (!row) {
        callback(null, null);
      } else {
        const article = {
          ...row,
          tags: row.tags ? row.tags.split(',') : []
        };
        callback(null, article);
      }
    });
  }

  static update(id, articleData, callback) {
    const { titre, contenu, auteur, date, categorie, tags } = articleData;
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

    const query = `
      UPDATE articles
      SET titre = ?, contenu = ?, auteur = ?, date = ?, categorie = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(query, [titre, contenu, auteur, date, categorie, tagsString, id], function(err) {
      if (err) {
        callback(err, null);
      } else if (this.changes === 0) {
        callback(null, null);
      } else {
        Article.findById(id, callback);
      }
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM articles WHERE id = ?';

    db.run(query, [id], function(err) {
      if (err) {
        callback(err, null);
      } else if (this.changes === 0) {
        callback(null, null);
      } else {
        callback(null, { deleted: true, id: id });
      }
    });
  }

  static search(searchQuery, callback) {
    const query = `
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
      ORDER BY created_at DESC
    `;
    const searchPattern = `%${searchQuery}%`;

    db.all(query, [searchPattern, searchPattern], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        const articles = rows.map(row => ({
          ...row,
          tags: row.tags ? row.tags.split(',') : []
        }));
        callback(null, articles);
      }
    });
  }
}

module.exports = Article;
