const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');
const { User } = require('./user');


const Article = sequelize.define('article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Article.belongsTo(User, { foreignKey: 'author_id' });
    


module.exports = {
    Article: Article
};