const { sequelize } = require('../services/db');
const { Article } = require('../models/article');
const { User } = require('../models/user');
const { hashids } = require('../utils/utils');
const { hash } = require('bcrypt');

function ArticleCtrl() {
    const SELF = {}
    return {
        getArticles: async (req, res) => {
            const { limit, offset } = req.query;
            const data = await Article.findAll({
                attributes: [
                    'id',
                    'title',
                    'content',
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            'id',
                            'username',
                            'fullname',
                            'email',
                        ]
                    }
                ],
                limit: limit,
                offset: offset
            })
            data.forEach(article => {
                article.id = hashids.encode(article.id);
                article.author_id = hashids.encode(article.author_id);
            })
            return res.json({ data })
        }
    }
}

module.exports = new ArticleCtrl()