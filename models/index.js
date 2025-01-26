require('dotenv').config();
const sequelize = require('./connection');
const User = require('./user');
const Message = require('./message');

User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Message,
  sequelize
};
