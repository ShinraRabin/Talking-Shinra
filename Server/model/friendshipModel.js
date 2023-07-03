module.exports = (sequelize, Sequelize,DataTypes, bcrypt, crypto) => {
    const Friendship = sequelize.define(
      "friendship",
      {
        user1: {
          type: Sequelize.STRING,
          refrences: {
            model:"users",
            key:"email"
        }
        },
        user2: {
          type: Sequelize.STRING,
          refrences: {
            model:"users",
            key:"email"
        }
        },
      },
      {
        timestamps: false,
      }
    );
  
    return Friendship;
  };