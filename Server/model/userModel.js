module.exports = (sequelize, Sequelize,DataTypes, bcrypt, crypto) => {
    const User = sequelize.define(
      "user",
      {
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
  
    return User;
  };
  