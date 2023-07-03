const dbConfig = require("../../Server/config/dbConfig");

const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../../Server/model/userModel")(sequelize, Sequelize,DataTypes);
db.Message = require("../../Server/model/messageModel")(sequelize, Sequelize,DataTypes);
db.FriendRequest = require("../../Server/model/friendRequestModel")(sequelize, Sequelize,DataTypes);
db.Friendship = require('../../Server/model/friendshipModel')(sequelize, Sequelize,DataTypes);


module.exports = db;
