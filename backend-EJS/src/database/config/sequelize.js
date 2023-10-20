const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('consoles_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
